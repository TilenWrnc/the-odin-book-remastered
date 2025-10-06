"use server";

import { prisma } from "@/lib/prisma";

export default async function getChat(chatId: number) {
  try {
    return await prisma.messageChat.findUnique({
      where: { id: chatId },
      include: {
        friendship: {
          include: {
            sender: {
              select: { id: true, username: true, email: true, imageUrl: true },
            },
            receiver: {
              select: { id: true, username: true, email: true, imageUrl: true },
            },
          },
        },
        messages: {
          include: {
            sender: true,
            reciever: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Cannot find chat");
  }
}

export async function getAllChats(userId: number) {
    try {
      return await prisma.messageChat.findMany({
        where: {
          OR: [
            { friendship: { senderId: userId } },
            { friendship: { receiverId: userId } }
          ],
          messages: {
            some: {}
          }
        },
        include: {
          friendship: {
            include: {
              sender: true,
              receiver: true
            }
          },
          messages: {
            orderBy: {
              date: "desc",
            },
            take: 1,
          }
        }
      })
    } catch (error) {
      throw new Error("Cannot get all chats")
    }
}
