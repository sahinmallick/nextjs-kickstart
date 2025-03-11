"use client";

import ChangeThemeButton from "@/components/change-theme-button";
import { useSession } from "./session-provider";
import { LogOut, User2 } from "lucide-react";
import { SignOut } from "../(auth)/actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export default function Header({ className }: { className?: string }) {
  const session = useSession();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-card px-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="size-10 cursor-pointer rounded-full border">
              {session?.user?.image ? (
                <Image
                  src={session.user.image!}
                  alt={session.user.displayName + " Profile"}
                  width={100}
                  height={100}
                  className="w-full rounded-full border object-cover"
                />
              ) : (
                <User2 className="size-full p-1.5 text-muted-foreground" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem className="flex items-center gap-2">
              <Image
                src={session?.user?.image || "/default-avatar.png"}
                alt="Profile"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border object-cover"
              />
              <div>
                <p className="text-sm font-medium">
                  {session?.user?.displayName || "User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center text-destructive focus:text-destructive"
              onClick={() => SignOut()}
            >
              <LogOut className="mr-1.5" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ChangeThemeButton />
    </header>
  );
}
