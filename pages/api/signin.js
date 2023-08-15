// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signInAPI } from "@/service/authAPI"


export default async function handler(req, res) {
    const { email, password } = req
    const user = await signInAPI({ email: 'farman@kmindz.in', password: "12345678" })
    return user
    // console.log(user)
    res.status(200).json({ name: 'John Doe' })
}
