import TablaUsuarios from "../ui/tablaUsuarios"
import FormularioAgregarUsuario from "../ui/formAgregarUsuario"
import fakeUsers from "../fakeData";
import { Usuario } from "../types";

async function loadUsers(): Promise<Usuario[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data.map((user: any) => ({
    id: user.id,
    nombre: user.name.split(' ')[0] || '',
    apellido: user.name.split(' ')[1] || '',
    correo: user.email,
    activo: true // Asigna un valor por defecto ya que este campo no está en la API
  }));
}

export default async function UsuariosPage() {
	const usuarios = await loadUsers();
	// const usuarios: Usuario[] = fakeUsers;
	console.log(usuarios);
	return (
		<div className="flex space-x-4 p-8">
		<div className="w-2/3">
			<TablaUsuarios usuarios={usuarios} />
		</div>
		<div className="w-1/3">
			<FormularioAgregarUsuario />
		</div>
	</div>

	)
}
