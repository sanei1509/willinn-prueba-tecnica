import React from 'react';
import { Usuario } from '../types';

interface TablaUsuariosProps {
  usuarios: Usuario[];
}

const TablaUsuarios: React.FC<TablaUsuariosProps> = ({ usuarios }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b font-medium text-gray-600">Nombre</th>
              <th className="px-4 py-2 border-b font-medium text-gray-600">Correo</th>
              <th className="px-4 py-2 border-b font-medium text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-gray-700">
                  {user.nombre} {user.apellido}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">{user.correo}</td>
                <td className="px-4 py-2 border-b text-gray-700">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">✏️</button>
                  <button className="text-red-500 hover:text-red-700">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button className="text-pink-500 mx-2">Anterior</button>
        <button className="text-white bg-pink-500 px-3 py-1 rounded-full mx-1">1</button>
        <button className="text-pink-500 mx-2">Siguiente</button>
      </div>
    </div>
  );
};

export default TablaUsuarios;