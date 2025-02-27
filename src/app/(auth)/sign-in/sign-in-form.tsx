"use client";

import { signInSchema, type SignInValues } from "@/lib/validation";
import { LoadingButton } from "@/components/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SignIn } from "../actions";
import { toast } from "sonner";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

export default function AdminSigninForm() {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await SignIn(data);
      if (error) {
        setError(error);
        toast.error("Sign in failed", {
          description: error,
        });
      } else {
        toast.success("Signed in successfully");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="rounded-sm"
                  type="email"
                  placeholder="admin@example.com"
                  {...field}
                />
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
                <Input
                  className="rounded-sm"
                  type="password"
                  placeholder="••••••••"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <p className="text-center text-sm font-medium text-red-500">
            {error}
          </p>
        )}
        <LoadingButton
          isLoading={isPending}
          type="submit"
          className="w-full rounded-sm"
        >
          Sign in
        </LoadingButton>
      </form>
    </Form>
  );
}
