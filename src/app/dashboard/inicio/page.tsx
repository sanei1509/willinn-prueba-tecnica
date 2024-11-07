'use client'
import { authOptions } from "@/app/utils/authConfig";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default async function page() {

	return (
		<div>
     <h1 className="text-4xl font-bold text-gray-800 mt-6">¡Bienvenido a la aplicación!</h1>
      <p className="text-gray-600 mt-4">Desafio realizado por Santiago Neira</p>

      <div className="flex space-x-4 mt-6">
        {/* Enlace a LinkedIn */}
        <a
          href="https://www.linkedin.com/in/santiago-neira-4479501b7/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-3xl"
        >
          <FaLinkedin />
        </a>
        {/* Enlace a GitHub */}
        <a
          href="https://github.com/sanei1509"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-600 text-3xl"
        >
          <FaGithub />
        </a>
      </div>
		</div>
	)
}
