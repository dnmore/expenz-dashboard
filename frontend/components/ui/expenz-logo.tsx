import { TriangleRight } from "lucide-react";

export default function ExpenzLogo() {
  return (
    <div className="flex flex-row gap-1 items-center leading-none text-zinc-950 dark:text-zinc-50">
      <TriangleRight size={24}/>

      <p className="tracking-tighter text-xl  items-center text-zinc-950 dark:text-zinc-50">
        Expenz
      </p>
    </div>
  );
}
