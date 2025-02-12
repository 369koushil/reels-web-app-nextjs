import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import { connectDB } from "./db";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google"
// import InstagramProvider from "next-auth/providers/instagram"
// import FacebookProvider from "next-auth/providers/facebook"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        //   InstagramProvider({
        //     clientId: process.env.INSTAGRAM_CLIENT_ID!,
        //     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!
        //   }),
        //   FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENT_ID!,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        //   }),
        CredentialsProvider(
            {
                name: "Credentials",
                credentials: {
                    email: { label: "email", type: "text", placeholder: "email" },
                    password: { label: "password", type: "text", placeholder: "password" }
                },
                async authorize(credentials) {
                    if (!credentials?.email || !credentials?.password) throw new Error("missing email or password")
                    try {
                        await connectDB();
                        const user = await User.findOne({ email: credentials.email })
                        if (!user) throw new Error("no user found")

                        const isValid = await bcrypt.compare(credentials.password, user.password)
                        if (!isValid) throw new Error("please check your password")
                        
                        return {
                            id: user._id.toString(),
                            email: user.email
                        }

                    } catch (err) {
                        throw err
                    }

                },

            },
        ),

    ],
    callbacks: {

        async jwt({ user, token }) {
            if (user) token.id = user.id;
            return token

        },
        async session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id as string

            }
            return session
        },
        async signIn({ user }) {
            try {
                await connectDB();
                const existingUser = await User.findOne({ email: user.email });
        
                if (!existingUser) {
                    const newUser = await User.create({
                        email: user.email,
                        password: await bcrypt.hash("123456", 10),
                    });
        
                    user.id = newUser._id.toString(); 
                } else {
                    user.id = existingUser._id.toString(); 
                }
        
                return true; 
        
            } catch (err) {
                console.error(err);
                return false;
            }
        },
        

    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.AUTH_SECRET
}