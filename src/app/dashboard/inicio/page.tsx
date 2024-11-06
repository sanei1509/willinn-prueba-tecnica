import { authOptions } from "@/app/utils/authConfig";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function page() {
	const session = await getServerSession(authOptions);

	if(!session) {
		redirect('/login');
	}
	return (
		<div>
			<h2>Pagina de inicio de este desafío</h2>
			<p>ve a listar los usuario y probar demás funciones</p>
		</div>
	)
}
