"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { logOut } from "./actions";

interface LogOutButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export default function LogOutButton({
  children,
  ...props
}: LogOutButtonProps) {
  return (
    <Button onClick={() => logOut()} {...props}>
      {children || "Log out"}
    </Button>
  );
}
