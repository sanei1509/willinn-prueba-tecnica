'use client'
import {
  Group as UserGroupIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Inicio', href: '/dashboard/inicio', icon: HomeIcon },
  { name: 'Usuarios (API)', href: '/dashboard/usuarios', icon: UserGroupIcon },
  { name: 'Usuarios (DB)', href: '/dashboard/usuariosDB', icon: UserGroupIcon },
];


export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-inherit p-3 text-sm font-medium hover:bg-red-50 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
            'text-red-600' : pathname === link.href,
            }
            )}  
          
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
