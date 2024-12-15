"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/auth/actions";
// import { Icon } from "@iconify/react";

// import { useState } from "react";

export const LogOutButton = () => {
  //   const [loading, setLoading] = useState(false);
  //   async function onClick() {
  //     setLoading(true);

  //     await logout();
  //     setLoading(false);
  //   }
  return (
    <>
      <Button variant={"destructive"} onClick={logout}>
        {/* {loading ? (
          <Icon icon={"tabler:loader"} className="animate-spin" />
        ) : null} */}
        Log out
      </Button>
    </>
  );
};
