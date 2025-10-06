"use server"

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

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
            author: {
                connect: {
                    id: user.id,
                },
            }
        }
    })
};

   
export async function createPostAction(formData: FormData) {
    const user = await currentUser();
    
    if (!user) {
        throw new Error("User not found");
    }

    try {
        const postText = formData.get("post-content")

        if (typeof postText !== "string") {
            return;
        }

        await createPost(postText, user.id);
    } catch (error) {
        console.log(error)
    };
};
