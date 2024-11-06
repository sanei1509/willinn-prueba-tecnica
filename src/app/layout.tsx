import type { Metadata } from 'next'
import SideBar from './ui/dashboard/sideBar'
import NavLinks from './ui/dashboard/navLinks'
import '../app/globals.css'
import { poppins } from './ui/fonts'

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
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}