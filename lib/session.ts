import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import jsonwebtoken from "jsonwebtoken";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_AUTH_GOOGLE_CLIENT_SECRET!
        })
    ],
    jwt: {
        secret: process.env.NEXT_AUTH_SECRET!,
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign(
                {
                    ...token,
                    iss: "grafbase",
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                },
                secret
            );
            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret);
            return decodedToken as JWT;
        },
    },
    callbacks: {
        async session({ session }) {
            try {
                const email = session?.user?.email as string;
                const data = await getUser(email) as { user?: UserProfile };
                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data.user
                    }
                }
                return newSession
            } catch (error) {
                console.log(error)
                return session
            }

        },
        async signIn({ user }: { user: User | AdapterUser }) {
            try {
                const userExists = await getUser(user?.email as string) as { user: UserProfile };
                if (!userExists.user) {
                    await createUser(
                        user?.name as string,
                        user?.email as string,
                        user?.image as string
                    )
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    },
    theme: {
        colorScheme: "light",
        logo: "/logo.png",
    },
    secret: process.env.NEXT_AUTH_SECRET || ""
}



export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;
    return session;
}