import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogInForm } from "./form";

export default function Page() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <LogInForm />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs font-sans text-muted-foreground">
            made by mohammed lamine bennouioua
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
