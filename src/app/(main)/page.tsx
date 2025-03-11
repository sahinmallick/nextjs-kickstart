import SignOutButton from "../(auth)/log-out-button";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) return redirect("/sign-in");
  return (
    <div className="flex min-h-screenNav flex-col items-center justify-center">
      <Card className="max-w-96 space-y-4 text-wrap break-words bg-card">
        <CardHeader>
          <Image
            src={user.image!}
            width={0}
            height={0}
            quality={100}
            sizes="100vw"
            className="aspect-auto w-fit rounded-xl"
            alt={user.displayName}
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="group">
            <span className="font-bold">Name:</span>{" "}
            <span className="group-hover:underline">{user.displayName}</span>
          </p>
          <p className="group">
            <span className="font-bold">Email:</span>{" "}
            <span className="group-hover:underline">{user.email}</span>
          </p>
          <p className="group">
            <span className="font-bold">GoogleId:</span>{" "}
            <span className="group-hover:underline">{user.googleId}</span>
          </p>
          <p className="group">
            <span className="font-bold">GithubId:</span>{" "}
            <span className="group-hover:underline">{user.githubId}</span>
          </p>
          <p className="group">
            <span className="font-bold">Image:</span>{" "}
            <span className="group-hover:underline">{user.image}</span>
          </p>
        </CardContent>
        <CardFooter>
          <SignOutButton variant={"destructive"} className="w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}
