import Link from 'next/link';
import WillinnLogo from '../willinnLogo';
import NavLinks from '@/app/ui/dashboard/navLinks';
import { PowerIcon } from '@heroicons/react/24/outline';
import styles from "@/app/ui/dashboard/sideBar.module.css"
import { signOut } from 'next-auth/react'; // Importa signOut

export default function SideBar() {
  return (
    <div className={styles.sideNavContainer}>
      <Link className={styles.logoLink} href="/">
        <div className={styles.logoContainer}>
          <WillinnLogo size={100}/>
        </div>
      </Link>
      <div className={styles.navContent}>
        <NavLinks />
        <div className={styles.placeholder}></div>

          <div>
            <button 
              className={styles.signOutButton}
              onClick={() => signOut({ callbackUrl: '/login' })} 
              >
              <PowerIcon className={styles.powerIcon} />
              <div className={styles.signOutText}>Salir de la cuenta</div>
            </button>
          </div>
      </div>
    </div>
  );
}