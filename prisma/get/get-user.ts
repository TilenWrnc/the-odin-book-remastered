import { prisma } from "@/lib/prisma"

export default async function getUser(userId: string) {
    try {
        return await prisma.user.findFirst({
            where: {
                clerkId: userId
            }
        })
    } catch (error) {
        throw new Error("Cannot find user")
    }
}