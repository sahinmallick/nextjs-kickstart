import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (user) redirect("/profile");
  else
    return (
      <main className="flex h-screen items-center justify-center">
        {children}
      </main>
    );
}
