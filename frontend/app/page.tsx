import ExpenzLogo from "../components/ui/expenz-logo";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import { loginAsJohn, loginAsSarah } from "@/lib/auth";

import { CornerDownLeft } from "lucide-react";

export default function Page() {
  
  return (
    <div className="flex min-h-screen flex-col gap-10 p-6">
      <div className="h-16 p-4">
        <ExpenzLogo />
      </div>
      <div className="flex flex-col justify-center items-center text-center py-8 bg-stone-50 border border-gray-200 rounded-xl">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="flex flex-col items-center justify-center gap-5 "
        >
          <div className="px-3 md:px-6 flex flex-col gap-4 justify-center items-center  max-w-2xl mx-auto">
            <h1 className="font-bold text-4xl md:text-6xl">
              Track Your Expenses. Achieve Your Goals.
            </h1>
            <p className="text-gray-700 text-base/8 md:text-xl/8">
              Take control of your money with a clear dashboard and quick tools
              to add or edit income and expenses. Export your data anytime as
              CSV and stay on track to reach your goals.
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
              <form action={loginAsJohn}>
                <Button type="submit" size={"lg"}>
                  Login as John
                </Button>
              </form>
              <form action={loginAsSarah}>
                <Button variant={"outline"} size={"lg"} type="submit">
                  Login as Sarah
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
