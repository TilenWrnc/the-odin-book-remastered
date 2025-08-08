import { prisma } from "@/lib/prisma";

export const createPost = async(content: string, clerkId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            clerkId: clerkId,
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    await prisma.post.create({
        data: {
            content: content,
            date: new Date(),
        }
    })
}