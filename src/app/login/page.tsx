'use client'
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"; // Importa signIn de NextAuth 
import WillinnLogo from '../ui/willinnLogo';
import ClipLoader from "react-spinners/ClipLoader"; 

export default function LoginPage() {
  const router = useRouter(); // Inicializa useRouter para manejar la navegación
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(false);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
 
    // Usa signIn de NextAuth en lugar de fetch
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });



    if (result?.ok) {
      router.push('/dashboard/usuarios');
      // Redirige al usuario a /usuarios en caso de éxito
    } else {
      // Manejar errores
      setError(`Error intenta con : \n \n usuarioAdmin@gmail.com / \n \n 123456`);
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <WillinnLogo size={200}/>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#ff5387" size={50} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Inicio de sesión</h2>
          
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mensaje de error */}

          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Introduce tu email"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Introduce tu contraseña"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Ingresar
          </button>
        </form>
      )}
    </div>
  );
}