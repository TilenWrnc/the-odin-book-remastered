"use server";

import { prisma } from "@/lib/prisma";

export default async function updatePost(postId: number, formData: FormData) {
    try {
        const postText = formData.get("post-content-edited")

        if (typeof postText !== "string") {
            return;
        }

        await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                content: postText,
            }
        })

    } catch (error) {
        console.log(error);
    }
}