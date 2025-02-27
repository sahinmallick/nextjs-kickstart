import LogOutButton from "../(auth)/log-out-button";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) return redirect("/sign-in");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-96 space-y-4 text-wrap break-words bg-blue-100">
        <Image
          src={user.image!}
          width={0}
          height={0}
          quality={100}
          sizes="100vw"
          className="aspect-auto w-fit rounded-xl"
          alt=""
        />
        <p>
          <span className="font-bold">Name:</span> {user?.displayName}
        </p>
        <p>
          <span className="font-bold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-bold">GoogleId:</span> {user.googleId}
        </p>
        <p>
          <span className="font-bold">Image:</span> {user.image}
        </p>
      </div>
      <LogOutButton />
    </div>
  );
}
