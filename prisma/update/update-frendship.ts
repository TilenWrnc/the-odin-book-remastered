"use server";

import { prisma } from "@/lib/prisma";
import createChat from "../post/create-chat";
import { create } from "domain";

export default async function updateFrendship(senderId: number, recieverId: number) {
   try {
        const frendship = await prisma.friendship.findUnique({
            where: {
                senderId_receiverId: {
                    senderId: senderId,
                    receiverId: recieverId,
                }
            }
        })

        if (!frendship) {
            return null;
        }

        const chat = await createChat(frendship?.id);
        
        return await prisma.friendship.update({
            where: {
                senderId_receiverId: {
                    senderId: senderId,
                    receiverId: recieverId,
                }
            },
            data: {
                status: "friends",
                chat: {
                    connect: {
                        id: chat.id,
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        return null;
    };
}