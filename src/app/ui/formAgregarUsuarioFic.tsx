'use client';
import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { teal } from '@mui/material/colors';
import { Usuario } from '../types';

interface FormularioAgregarUsuarioProps {
  onAddUser: (newUser: Usuario) => void;
}

const FormularioAgregarUsuarioFic: React.FC<FormularioAgregarUsuarioProps> = ({ onAddUser }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    activo: true,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de que todos los campos estén completos
    if (!formData.nombre || !formData.apellido || !formData.correo || !formData.contraseña) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Llama a la función de `onAddUser` del componente padre
    onAddUser(formData);
    setError(null); // Limpia el mensaje de error después de enviar

    // Limpia el formulario después de agregar el usuario
    setFormData({
      nombre: '',
      apellido: '',
      correo: '',
      contraseña: '',
      activo: true,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Agregar usuario ficticio</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mensaje de error */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            placeholder="Introduce el nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            placeholder="Introduce el apellido"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">E-mail</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            placeholder="Introduce tu E-mail"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            placeholder="Introduce tu contraseña"
          />
        </div>
        <div className="flex items-center mb-4">
          <FormControlLabel
            control={
              <Switch
                checked={formData.activo}
                onChange={handleChange}
                name="activo"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: teal[500],
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: teal[500],
                  },
                }}
              />
            }
            label="Activar"
            className="mt-4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded mt-4 hover:bg-purple-600"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default FormularioAgregarUsuarioFic;
