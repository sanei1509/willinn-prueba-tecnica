import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../app/globals.css'
import SideBar from './ui/dashboard/sideBar'
import NavLinks from './ui/dashboard/navLinks'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Crud, Inicio de la app',
  description: 'Prueba tecnica para ser evaluado en Willinn',
  keywords: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
      
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideBar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>

      </body>
    </html>
  )
}