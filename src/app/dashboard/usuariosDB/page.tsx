	'use client'
	import { useState, useEffect } from "react";
	import TablaUsuarios from "@/app/ui/tablaUsuarios";
	import FormularioAgregarUsuario from "@/app/ui/formAgregarUsuario";
	import { Usuario } from "../../types";
	import ClipLoader from "react-spinners/ClipLoader"; 
	import Modal from '@mui/material/Modal';
	import Box from '@mui/material/Box';
	import TextField from '@mui/material/TextField';
	import Button from '@mui/material/Button';

	const modalStyle = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

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
		const [resetFormTrigger, setResetFormTrigger] = useState<number>(0);
		const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
		const [openModal, setOpenModal] = useState<boolean>(false);

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

		//Editar usuario
		const handleOpenModal = (user: Usuario) => {
			setSelectedUser(user);
			setOpenModal(true);
		};
	
		const handleCloseModal = () => {
			setOpenModal(false);
			setSelectedUser(null);
		};

		const handleEditUser = async () => {
			if (!selectedUser?.nombre || !selectedUser?.apellido) {
				setError("Nombre y Apellido no pueden estar vacíos.");
				return;
			}
	
			setIsEditing(true);
			setError("");

			if (selectedUser) {
				try {
					// Verifica que la URL incluye correctamente el correo como parámetro
					const response = await fetch(`/api/users/${selectedUser.correo}`, {
						method: 'PATCH',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ nombre: selectedUser.nombre, apellido: selectedUser.apellido }),
					});
		
					if (response.ok) {
						const updatedUser = await response.json();
						// Actualiza la lista de usuarios localmente
						setUsuarios(
							usuarios.map((user) =>
								user.correo === updatedUser.correo ? updatedUser : user
							)
						);
						handleCloseModal();
					} else {
						throw new Error('Error al editar el usuario');
					}
				} catch (err) {
					setError('Hubo un problema al editar el usuario');
				} finally {
					setIsEditing(false);
				}
			}
		};

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
				//resetear el formulario al agregar
				setResetFormTrigger((prev) => prev + 1);
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
              <TablaUsuarios usuarios={usuarios} onDeleteUser={deleteUser}  onEditUser={handleOpenModal} />
          </div>
          <div className="w-1/3">
            <FormularioAgregarUsuario onAddUser={addUser} isAdding={isAdding} resetFormTrigger={resetFormTrigger} />
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
		
				
					{/* Modal de edición */}
				<Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <h2>Editar Usuario</h2>
          <TextField
            label="Nombre"
            value={selectedUser?.nombre || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, nombre: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellido"
            value={selectedUser?.apellido || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, apellido: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button variant="outlined" color="primary" onClick={handleEditUser}>
					{isEditing ? <ClipLoader size={25} color="#ff5387" />: 'Guardar'} 
          </Button>
          <Button variant="outlined" color="secondary"  onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Box>
      </Modal>


			{/*  */}
			{error && (
				<div className="text-red-500 text-cet mb-4">Error: {error}</div>
			)}

			</div>
		)
	}
