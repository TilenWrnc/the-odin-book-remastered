import { prisma } from "@/lib/prisma";

type User = {
    id: string,
    email: string,
    username: string | null,
    imageUrl: string | null,
}    

export default async function createUser(userData: User) {
    await prisma.user.create({
        data: {
            clerkId: userData.id,
            email: userData.email,
            username: userData.username ?? null,
            imageUrl: userData.imageUrl
        }
    })
}