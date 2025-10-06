"use server";

import { prisma } from "@/lib/prisma"

export default async function deleteFrendship(senderId: number, receiverId: number) {
    try {
        await prisma.friendship.deleteMany({
            where: {
                OR: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
                }
            });
    } catch (error) {
        console.log(error)
    };
}