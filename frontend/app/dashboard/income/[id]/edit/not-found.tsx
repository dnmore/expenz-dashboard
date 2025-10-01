import Link from "next/link";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <Frown />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested income.</p>
      <Button asChild>
        <Link href="/dashboard/income">Go Back</Link>
      </Button>
    </div>
  );
}
