import React from 'react';
import { Usuario } from '../types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface TablaUsuariosProps {
  usuarios: Usuario[];
  onDeleteUser: (correo: string) => void;
}

const TablaUsuarios: React.FC<TablaUsuariosProps> = ({ usuarios, onDeleteUser }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b font-medium text-gray-600">Nombre</th>
              <th className="px-4 py-2 border-b font-medium text-gray-600">Correo</th>
              <th className="px-4 py-2 border-b font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.correo} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-gray-700">
                  {usuario.nombre} {usuario.apellido}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">{usuario.correo}</td>
                <td className="px-4 py-2 border-b text-gray-700">
                    <button onClick={() => onDeleteUser(usuario.correo)} className="px-2 text-red-400 hover:text-red-700 hover bg-slate-50 mx">
                      <DeleteOutlinedIcon fontSize="medium" />
                    </button>
                    <button className="px-2 text-black hover:text-yellow-900 mx-2 bg-slate-50">
                      <EditOutlinedIcon fontSize="medium" />
                    </button>
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