"use server";

import { prisma } from "@/lib/prisma";

export default async function createFrendshipPending(senderId:number, recieverId: number) {
    try {
        await prisma.friendship.create({
            data: {
                senderId: senderId,
                receiverId: recieverId,
                status: "pending",
            }
        })
    } catch (error) {
        console.log(error)
    }
}