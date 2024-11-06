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
        <form>
          <button 
            className={styles.signOutButton}
            onClick={() => signOut()} 
            >
            <PowerIcon className={styles.powerIcon} />
            <div className={styles.signOutText}>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}