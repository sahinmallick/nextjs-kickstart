import { validateRequest } from "@/auth";

export default async function Home() {
  const auth = await validateRequest();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-2xl">
        <pre>{JSON.stringify(auth, null, 2)}</pre>
      </div>
    </div>
  );
}
