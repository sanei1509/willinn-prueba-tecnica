import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import WillinLogo from "../../../public/Willinn Logo.svg";
import Image  from 'next/image';

export default function WillinnLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src={WillinLogo} alt='Logo de Willin'/>
    </div>
  );
}
