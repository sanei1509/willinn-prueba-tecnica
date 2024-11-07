	'use client'
	import { useState, useEffect } from "react";
	import TablaUsuarios from "@/app/ui/tablaUsuarios";
	import FormularioAgregarUsuario from "@/app/ui/formAgregarUsuario";
	import { Usuario } from "../../types";
	import ClipLoader from "react-spinners/ClipLoader"; 

	async function fetchUsersFromDB(): Promise<Usuario[]> {
		const res = await fetch("/api/users");
		return await res.json();
	}

	export default function UsuariosPageDB() {
		const [usuarios, setUsuarios] = useState<Usuario[]>([]);
		const [isLoading, setIsLoading] = useState<boolean>(true);


		useEffect(() => {
			const fetchData = async () => {
				setIsLoading(true);
				const data = await fetchUsersFromDB();
				setUsuarios(data);
				setIsLoading(false);
			};
			fetchData();
		}, []);

		const addUser = async (newUser: Usuario) => {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newUser),
			});

			if (response.ok) {
				const user = await response.json();
				setUsuarios([...usuarios, user]);
			}
		};

		
		return (
			<div>
				<h1 className="text-3xl">Usuarios</h1>
				<h2>Usuarios trabajado con base de datos creada en Vercel</h2>

				{isLoading ? (
        <div className="flex justify-center items-center h-64">
				<ClipLoader color="#ff5387" loading={isLoading} size={50} /> {/* Spinner */}
				</div>
      ) : (
        <div className="flex space-x-4 p-8">
          <div className="w-2/3">
            <TablaUsuarios usuarios={usuarios} />
          </div>
          <div className="w-1/3">
            <FormularioAgregarUsuario onAddUser={addUser} />
          </div>
        </div>
      )}


			</div>
		)
	}
