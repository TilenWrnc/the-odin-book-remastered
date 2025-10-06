import { prisma } from "@/lib/prisma";

export default async function createComment(commentText: string, clerkId: string, postId: number) {
    try {
        const user = await prisma.user.findFirst({
                where: {
                    clerkId: clerkId,
                }
        });
        
        if (!user) {
            throw new Error("User not found");
        }

        await prisma.comment.create({
            data: {
                text: commentText,
                date: new Date(),
                post: {
                    connect: {
                        id: postId
                    }
                },
                author : {
                    connect: {
                        id: user.id
                    }
                }
            },
        })

        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                commentCount: {
                    increment: 1,
                }
            }
        })
    } catch (error) {
        throw new Error("Something went wrong when tyring to post a comment")
    }
}