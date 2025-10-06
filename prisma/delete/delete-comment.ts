"use server";

import { prisma } from "@/lib/prisma"

export default async function deleteComment(commentId: number, postId: number) {
    try {
        await prisma.comment.delete({
            where: {
                id: commentId,
            }
        });
        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                commentCount: {
                    decrement: 1,
                }
            }
        });
    } catch (error) {
        console.error("Delete comment error:", error);
        throw new Error("Failed to delete a comment")
    }
}