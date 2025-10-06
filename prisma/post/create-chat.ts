"use server";

import { prisma } from "@/lib/prisma";

export default async function createChat(friendshipId: number) {
    try {
        return await prisma.messageChat.create({
            data: {
                friendshipId: friendshipId,
            }
        })
    } catch (error) {
        throw new Error("Cannot create chat")
    }
};