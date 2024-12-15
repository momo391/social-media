"use server";

import { AuthTest } from "@/components/test/auth";
import { LogOutButton } from "@/app/auth/_partials/logout-button";
import { getCurrentSession } from "@/lib/cache/current-session";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AuthView } from "@/components/views/auth";
import { GuestView } from "@/components/views/guest";

export default async function Page() {
  return (
    <>
      <div className="min-h-screen grid place-items-center">
        <AuthTest />
        <AuthView>
          <LogOutButton />
        </AuthView>
        <GuestView>
          <Link
            href={"/auth/signup"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            signup
          </Link>
        </GuestView>
      </div>
    </>
  );
}
