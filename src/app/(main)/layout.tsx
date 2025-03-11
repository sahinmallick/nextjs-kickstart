import { SessionProvider } from "./session-provider";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import Header from "./header";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/sign-in");
  return (
    <SessionProvider value={session}>
      <main>
        <Header />
        {children}
      </main>
    </SessionProvider>
  );
}
