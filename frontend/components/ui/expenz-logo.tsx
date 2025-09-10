
import {CircleGauge} from 'lucide-react'

export default function ExpenzLogo() {
  return (
    <div className="flex flex-row gap-1 items-center leading-none text-blue-600">
      <CircleGauge className="-rotate-90" size={36} strokeWidth={2}/>
      
      <p className="tracking-tighter text-xl font-bold">
        Expenz
      </p>
    </div>
  );
}
