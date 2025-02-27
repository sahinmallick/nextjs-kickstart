"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signupSchema, SignUpValues } from "@/lib/validation";
import { signInSchema, SignInValues } from "@/lib/validation";
import { lucia, validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function SignIn(cred: SignInValues): Promise<{ error: string }> {
  try {
    const { email, password } = signInSchema.parse(cred);
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!user || !user?.passwordHash) {
      return {
        error: "Incorrect username or password",
      };
    }
    const validPass = await bcrypt.compare(password, user.passwordHash);
    if (!validPass) {
      return {
        error: "Incorrect password",
      };
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieSet = await cookies();
    cookieSet.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } catch (error) {
    console.error("Signin error", error);
    if (isRedirectError(error)) throw error;
    return {
      error: "Something went wrong",
    };
  }
}

export async function SignUp(cred: SignUpValues): Promise<{ error: string }> {
  try {
    const { displayName, email, password } = signupSchema.parse(cred);

    const exists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (exists) {
      return {
        error: "Email already exists",
      };
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        displayName,
        email,
        passwordHash: hashPass,
      },
    });
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieSet = await cookies();
    cookieSet.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Signup error", error);
    return { error: "Something went wrong" };
  }
}

export async function logOut() {
  const { session } = await validateRequest();
  if (!session) throw new Error("Unauthorized");
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  const cookieSet = await cookies();
  cookieSet.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
