import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

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