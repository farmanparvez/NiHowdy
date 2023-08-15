import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInAPI } from "@/service/authAPI";

const nextAuthOptions = (req, res) => {
    return {
        providers: [
            CredentialsProvider({
                async authorize(credentails) {
                    // console.log(credentails)
                    try {
                        // console.log(req, res)
                        let user = await signInAPI({ email: credentails.email, password: credentails.password })
                        user.email = credentails.email
                        user.password = credentails.password
                        const cookies = user.cookies
                        console.log('set-cookie', cookies)
                        // res.setHeader('Set-Cookie', `token=${user.token}`)
                        return { email: user.email, name: user.password }
                    } catch (error) {
                        console.log(error)
                    }

                }
            })
        ],
        // callbacks: {
        //     session: async ({ session }) => {
        //         // console.log('session', session)
        //         const user = await signInAPI({ email: session.user.email, password: session.user.name })


        //         return {
        //             expires: session.expires,
        //             user
        //         }
        //     },
        //     async jwt({ token, user }) {
        //         // console.log("both:", user)
        //         return token;
        //     }
        // }
    }
}

export default (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res))
}
