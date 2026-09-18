import ExpenzLogo from "../components/ui/expenz-logo";
import * as motion from "motion/react-client";
import { LoginAsJohnForm, LoginAsSarahForm } from "@/components/ui/login-forms";
import { CornerDownLeft } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Page() {
  return (
    <div className="flex flex-col p-6">
      <div className="h-16 p-4 flex justify-between items-center">
        <ExpenzLogo />
        <ModeToggle />
      </div>
      <div className="flex flex-col justify-center items-center text-center py-8 ">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="flex flex-col items-center justify-center gap-5 "
        >
          <div className="px-3 md:px-6 flex flex-col gap-4 justify-center items-center  max-w-2xl mx-auto ">
            <h1 className="font-bold text-4xl md:text-6xl text-zinc-950 dark:text-zinc-50">
              Track Your Expenses. Achieve Your Goals.
            </h1>
            <p className="text-gray-700 dark:text-gray-200 text-base/8 md:text-xl/8">
              Take control of your money with a clear dashboard to track expenses and export your data anytime.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center px-6">
              <p className="text-xs ml-4">
                Jump in with a demo account — no setup, no data needed!
              </p>
              <div className="relative top-6 -left-6 md:left-1">
                <CornerDownLeft color="#374151" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center  gap-4">
              <LoginAsJohnForm />
              <LoginAsSarahForm />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
