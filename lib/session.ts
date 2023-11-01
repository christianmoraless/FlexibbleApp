import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions, User, getServerSession } from "next-auth";
import jsonwebtoken from "jsonwebtoken";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: "",
            clientSecret: ""
        })
    ],
    jwt: {
        // encode: () => { },
        // decode: () => { }
    },
    callbacks: {

        async session({ session }) {
            return session;
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
}



export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;
    return session;
}