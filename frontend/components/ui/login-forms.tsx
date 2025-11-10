"use client";

import { useFormStatus } from "react-dom";
import { loginAsJohn, loginAsSarah } from "@/lib/auth";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

function SubmitAsJohn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size={"lg"} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : (
        <> Login as John</>
      )}
    </Button>
  );
}

export function LoginAsJohnForm() {
  return (
    <form action={loginAsJohn}>
      <SubmitAsJohn />
    </form>
  );
}

function SubmitAsSarah() {
  const { pending } = useFormStatus();
  return(
    <Button type="submit" variant={"outline"} size={"lg"} disabled={pending}>
    {pending ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Logging in...
      </>
    ) : (
      <> Login as Sarah</>
    )}
  </Button>
  )
  
}

export function LoginAsSarahForm() {
  return (
    <form action={loginAsSarah}>
      <SubmitAsSarah />
    </form>
  );
}
