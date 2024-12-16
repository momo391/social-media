import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-2xl">Something went wrong !</p>
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "outline", size: "default" })
          )}
        >
          return to home page
        </Link>
      </div>
    </>
  );
};

export default Page;
