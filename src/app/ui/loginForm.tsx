export default function LoginForm() {
  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Iniciar sesión</h2>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}