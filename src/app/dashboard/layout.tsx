'use client';
import type { Metadata } from 'next'
import { poppins } from '../ui/fonts';
import '../../app/globals.css'
import SideBar from '../ui/dashboard/sideBar'
import NavLinks from '../ui/dashboard/navLinks'
import { SessionProvider } from 'next-auth/react'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
    <html lang="es">
      <body className={poppins.className}>
      
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideBar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-slate-100">
        {children}
      </div>
    </div>

      </body>
    </html>
    </SessionProvider>
  )
}