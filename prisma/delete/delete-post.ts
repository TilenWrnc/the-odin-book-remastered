"use server";

import { prisma } from "@/lib/prisma";

export default async function deletePost(postId: number) {
    try {
        await prisma.post.delete({
            where: {
                id: postId,
            }
        })
    } catch (error) {
        console.log(error);
    }

}