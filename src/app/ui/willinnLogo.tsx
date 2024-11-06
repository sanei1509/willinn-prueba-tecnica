import {poppins } from '@/app/ui/fonts';
import WillinLogo from "../../../public/Willinn Logo.svg";
import Image  from 'next/image';

export default function WillinnLogo({size=200} : {size: number}) {
  return (
    <div
      className={`${poppins.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src={WillinLogo} alt='Logo de Willin' width={170} style={{width: `${size}`}}/>
    </div>
  );
}
