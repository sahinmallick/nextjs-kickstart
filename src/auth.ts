import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, Session, TimeSpan, User } from "lucia";
import { GitHub, Google } from "arctic";
import { cookies } from "next/headers";
import prisma from "./lib/prisma";
import { cache } from "react";

// this is changed by sahin

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: true,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return { ...databaseUserAttributes };
  },
  sessionExpiresIn: new TimeSpan(1, "w"),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  displayName: string;
  email: string;
  image: string | null;
  googleId: string | null;
  githubId: string | null;
}

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/google`,
);
export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  null,
);

type validateRequestType =
  | { user: User; session: Session }
  | { user: null; session: null };

export const validateRequest = cache(async (): Promise<validateRequestType> => {
  const cookieSet = await cookies();
  const sessionId = cookieSet.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId).catch(() => {
    return { user: null, session: null };
  });

  if (!result.session || !result.user) {
    return { user: null, session: null };
  }
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookieSet.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookieSet.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (err) {
    console.warn("Error setting cookie: ", err);
  }

  return result;
});
