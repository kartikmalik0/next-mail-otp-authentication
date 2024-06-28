"use server"
import { signIn } from "@/lib/auth"

export async function login({email,password}:{email:string,password:string}) {
    try {
        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect:false,
            callback:"/",
          })
      
          return res
    } catch (error) {
        throw new Error("Wrong Email password")
    }
}