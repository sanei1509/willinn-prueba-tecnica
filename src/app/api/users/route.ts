// /src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Asegúrate de tener tu variable de entorno configurada
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
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