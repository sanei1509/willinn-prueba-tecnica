import TablaUsuarios from "../ui/tablaUsuarios"
import FormularioAgregarUsuario from "../ui/formAgregarUsuario"
import fakeUsers from "../fakeData";
import { Usuario } from "../types";


export default function usuarios() {
	const usuarios: Usuario[] = fakeUsers;

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
