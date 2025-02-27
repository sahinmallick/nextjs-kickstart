"use client";

import { signupSchema, type SignUpValues } from "@/lib/validation";
import { LoadingButton } from "@/components/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SignUp } from "../actions";
import { toast } from "sonner";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

export default function AdminSignupForm() {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
    },
  });

  async function onSubmit(data: SignUpValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await SignUp(data);
      if (error) {
        setError(error);
        toast.error("Sign up failed", { description: error });
      } else {
        toast.success("Signed up successfully");
        // Redirect or update UI as needed
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
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
                <Input type="password" placeholder="••••••••" {...field} />
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
        <LoadingButton isLoading={isPending} type="submit" className="w-full">
          Sign up
        </LoadingButton>
      </form>
    </Form>
  );
}
