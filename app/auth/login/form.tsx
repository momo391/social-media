"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { logInSchema } from "./schema";
import { useState } from "react";
import { login, LogInResult } from "./actions";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export const LogInForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setError } = form;

  async function onSubmit(values: z.infer<typeof logInSchema>) {
    console.log(values);

    setLoading(true);
    const { where, message }: LogInResult = await login(values);
    setLoading(false);

    if (where === "password" || where === "email")
      setError(where, { type: "deps", message });
    else if (where === "Database" || where === "Server")
      toast({
        title: where,
        description: message,
      });
    else redirect("/");
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex  justify-between">
            <Link
              className={cn(buttonVariants({ variant: "link" }))}
              href={"/auth/signup"}
            >
              don't have an account ?
            </Link>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <Icon icon="tabler:loader-2" className="animate-spin" />
              ) : null}
              log in
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
