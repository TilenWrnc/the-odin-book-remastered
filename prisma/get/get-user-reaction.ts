"use server";

import { prisma } from "@/lib/prisma";

export default async function getUserReaction(userId:number, postId: number) {
    try {
        return await prisma.postReaction.findUnique({
            where: {
                userId_postId: {userId, postId}
            }
        });
    } catch (error) {
        throw new Error("Failed to fetch user reaction");
    }
}