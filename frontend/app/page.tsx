import ExpenzLogo from "../components/ui/expenz-logo";
import { PiggyBank, ArrowRight } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col gap-10 p-6">
      <div className="h-16 p-4">
        <ExpenzLogo />
      </div>
      <div className="flex flex-col justify-center items-center py-8">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="flex flex-col items-center justify-center gap-5 font-extrabold text-4xl md:text-6xl"
        >
          <PiggyBank size={48}/>
          <div className="mb-4">
            <p>Track Your Expenses</p>
            <p className="text-blue-600">Achieve Your Goals</p>
          </div>

          <Button asChild size={"lg"}>
            <Link href="/login" className="flex items-center">
              <span>Login</span>
              <ArrowRight className="w-5 md:w-6" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
