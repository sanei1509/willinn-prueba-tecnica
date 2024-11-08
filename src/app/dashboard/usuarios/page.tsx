'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TablaUsuarios from "../../ui/tablaUsuarios";
import FormularioAgregarUsuario from "../../ui/formAgregarUsuarioFic";
import { Usuario } from "../../types";
import ClipLoader from 'react-spinners/ClipLoader';

async function loadUsers(): Promise<Usuario[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data.map((user: any) => ({
    id: user.id,
    nombre: user.name.split(' ')[0] || '',
    apellido: user.name.split(' ')[1] || '',
    correo: user.email,
    activo: true
  }));
}

export default function UsuariosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redirige al login si no hay sesión
      router.push('/login');
    } else if (status === 'authenticated') {
      setIsLoading(true); 
      // Carga los usuarios si la sesión está autenticada
      loadUsers().then((users) => setUsuarios(users));
      setIsLoading(false); // Termina de cargar
    }
  }, [status, router]);


  const handleAddUser = (newUser: Usuario) => {
    setUsuarios([...usuarios, { ...newUser}]);
  };


  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <h1 className="text-3xl">Usuarios</h1>
      <h2>Usuarios trabajados de manera ficticia con API: <a style={{ color: "blue" }} href="https://jsonplaceholder.typicode.com/users">Ver la API</a></h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#4A90E2" loading={isLoading} size={50} /> {/* Spinner */}
        </div>
      ) : (
        <div className="flex space-x-4 p-8">
          <div className="w-2/3">
            <TablaUsuarios usuarios={usuarios} onDeleteUser={()=>{}} onEditUser={() =>{}}/>
          </div>
          <div className="w-1/3">
            <FormularioAgregarUsuario onAddUser={handleAddUser}/>
          </div>
        </div>
      )}
    </>
  );
}
