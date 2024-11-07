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
		const [isAdding, setIsAdding] = useState<boolean>(false);
		const [isDeleting, setIsDeleting] = useState<boolean>(false);
		const [isEditing, setIsEditing] = useState<boolean>(false);

		const [error, setError] = useState<string>("");

		useEffect(() => {
			const fetchData = async () => {
				setIsLoading(true);
				const data = await fetchUsersFromDB();
				setUsuarios(data);
				setIsLoading(false);
			};
			fetchData();
		}, []);

		//Agregar usuario
		const addUser = async (newUser: Usuario) => {
			setIsAdding(true);
			try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newUser),
			});

			if (response.ok) {
				const user = await response.json();
				setUsuarios([...usuarios, user]);
				setError("");
			} else {
				const errorData = await response.json();
        setError(errorData.error || 'Error desconocido al agregar el usuario');
			}
		} catch (error) {
			setError(`Error al agregar el usuario, intentalo de nuevo`);
		}
		setIsAdding(false);
		};


		// Eliminar usuario
		const deleteUser = async (correo: string) => {
			setIsDeleting(true);
			try {
				const response = await fetch(`/api/users/${correo}`, {
					method: 'DELETE',
				});
				if (response.ok) {
					setUsuarios(usuarios.filter((usuario) => usuario.correo.toUpperCase() !== correo.toUpperCase()));
				} else {
					throw new Error('Error al eliminar el usuario');
				}
			} catch (err) {
				setError('Hubo un problema al eliminar el usuario');
			}
			setIsDeleting(false);
		};

		//Editar usuario
		
		
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
              <TablaUsuarios usuarios={usuarios} onDeleteUser={deleteUser}/>
          </div>
          <div className="w-1/3">
            <FormularioAgregarUsuario onAddUser={addUser} isAdding={isAdding} />
          </div>

        </div>
      )}

		
				{/* Eliminando Spinner */}
				{isDeleting && (
					<div className="text-center">
						<ClipLoader aria-label="Eliminando.." color="#ff5387" size={30} /> 
						<p className="text-red-500">Eliminando...</p>
					</div>		
				)}
		

			{/*  */}
			{error && (
				<div className="text-red-500 text-cet mb-4">Error: {error}</div>
			)}

			</div>
		)
	}
