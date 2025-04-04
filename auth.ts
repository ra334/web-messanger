import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import usersService from "./services/users-service"
import { db } from "./db/postgress"
import { z } from "zod"

const CredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {
                const parsedCredentials =
                    CredentialsSchema.safeParse(credentials)

                if (!parsedCredentials.success) {
                    throw new Error("Invalid credentials format")
                }

                const { email, password } = parsedCredentials.data

                return await usersService.login({
                    nickName: null,
                    email,
                    password,
                })
            },
        }),
    ],

    session: { strategy: "jwt" },

    secret: process.env.SECRET!,
})