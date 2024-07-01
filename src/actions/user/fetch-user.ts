"use server"

import prisma from "@/libs/db"

export async function fetchUsers() {
    try {
       const users =  await prisma.user.findMany({
        select:{
            id :true,
            email:true,
            emailVerified:true,
        }
       })
       
       return users
    } catch (error) {
        throw new Error("Unable to fetch Users")
    }
}