import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function PATCH(req: Request, { params }: { params: { email: string } }) {
  const { email } = params;
  const body = await req.json();
  const { nombre, apellido } = body;

  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, apellido = $2 WHERE correo = $3 RETURNING *',
      [nombre, apellido, email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error al editar el usuario:', error);
    return NextResponse.json({ error: 'Error al editar el usuario' }, { status: 500 });
  }
}