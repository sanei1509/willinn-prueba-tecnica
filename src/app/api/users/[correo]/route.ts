import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Borrar usaurio

export async function DELETE(req: Request, { params }: { params: { correo: string } }) {
  console.log('Correo recibido:', params.correo); // Agrega este log

  const { correo } = params;
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE correo = $1 RETURNING *', [correo]);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al borrar el usuario:', error);
    return NextResponse.json({ error: 'Error al borrar el usuario' }, { status: 500 });
  }
}

//Editar usuario
export async function PATCH(req: Request, { params }: { params: { correo: string } }) {
  
  const { correo } = params;
  const body = await req.json();
  const { nombre, apellido } = body;

  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, apellido = $2 WHERE correo = $3 RETURNING *',
      [nombre, apellido, correo]
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