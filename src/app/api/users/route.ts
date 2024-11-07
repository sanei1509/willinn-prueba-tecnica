// /src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Asegúrate de tener tu variable de entorno configurada
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    console.log('Usuarios obtenidos:', result.rows); // Agrega este log para verificar los datos
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await request.json();
    const { nombre, apellido, correo, contraseña, activo } = user;

    // Validar que los campos no estén vacíos
    if (!nombre || !apellido || !correo || !contraseña) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    // Verificar que el correo sea único
    const emailCheck = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (emailCheck.rows.length > 0) {
      return NextResponse.json({ error: 'El correo ya está en uso' }, { status: 400 });
    }
    
    // Insertar usuario si pasa las validaciones
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, correo, contraseña, activo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, apellido, correo, contraseña, activo]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    return NextResponse.json({ error: 'Error al agregar usuario' }, { status: 500 });
  }
}