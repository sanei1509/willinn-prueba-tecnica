import { NextResponse } from "next/server";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function DELETE(req: Request) {
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE correo IS NULL OR correo = \'\' RETURNING *');

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'No se encontraron usuarios con correo vacío o nulo' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Usuarios eliminados exitosamente', data: result.rows });
  } catch (error) {
    console.error('Error al eliminar usuarios con correo vacío o nulo:', error);
    return NextResponse.json({ error: 'Error al eliminar usuarios' }, { status: 500 });
  }
}