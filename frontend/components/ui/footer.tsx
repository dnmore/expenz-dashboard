import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t py-4 px-6 flex items-center flex-wrap gap-2 text-muted-foreground justify-between text-xs">
      
         <p>
        Track expenses and achieve your goals with Expenz.
      </p>
  <Link href="https://github.com/dnmore/expenz-dashboard" target="_blank" className="hover:underline">
          View Source
        </Link>
      
     
    </footer>
  );
}