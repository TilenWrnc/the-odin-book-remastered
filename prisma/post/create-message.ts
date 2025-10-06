import { prisma } from "@/lib/prisma";

export default async function createMessage(messageText: string, senderId: number, receiverId: number, chatId: number) {
     try {
        await prisma.message.create({
            data: {
                text: messageText,
                senderId: senderId,
                recieverId: receiverId,
                messageChatId: chatId,
            }
        })
     } catch (error) {
        throw new Error("Cannot send message")
     }
};