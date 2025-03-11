"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { SignOut } from "./actions";

interface SignOutButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export default function SignOutButton({
  children,
  ...props
}: SignOutButtonProps) {
  return (
    <Button onClick={() => SignOut()} {...props}>
      {children || "Log out"}
    </Button>
  );
}
