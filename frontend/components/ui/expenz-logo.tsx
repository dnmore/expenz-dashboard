import { TriangleRight } from "lucide-react";

export default function ExpenzLogo() {
  return (
    <div className="flex flex-row gap-1 items-center leading-none">
      <TriangleRight size={24} color="#09090b" fill="#09090b" />

      <p className="tracking-tighter text-xl  items-center text-zinc-950">
        Expenz
      </p>
    </div>
  );
}
