"use server";

import { prisma } from "@/lib/prisma";

export default async function getAllUsers(userClerkId: string) {
    try {
        const currentUser = await prisma.user.findFirst({
            where: {
                clerkId: userClerkId,
            }
        });

        if (!currentUser) {
            return;
        }

       const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                { senderId: currentUser.id },
                { receiverId: currentUser.id }
                ]
            },
            select: {
                senderId: true,
                receiverId: true
            }
        });

        const excludedIds: number[] = [currentUser.id];
        friendships.forEach((friendship) => {
            excludedIds.push(friendship.receiverId),  
            excludedIds.push(friendship.senderId);
        })

        return await prisma.user.findMany({
            where: {
                id: {
                    notIn: Array.from(excludedIds),
                }
            },
            take: 20,
        });
    } catch (error) {
        throw new Error("Cannot fetch users");
    }
};

export async function getAllPendingUsersSend(userClerkId: string) {
     try {
        const currentUser = await prisma.user.findFirst({
            where: {
                clerkId: userClerkId,
            }
        });

        if (!currentUser) {
            return;
        }

        
        return await prisma.friendship.findMany({
            where: {
                senderId: currentUser.id,
                status: "pending",
            },
            select: {
                receiver: true,
            }
        })    
        
        
    } catch (error) {
        throw new Error("Cannot fetch pending users");
    }
}

export async function getAllPendingUsersRecieved(userClerkId: string) {
     try {
        const currentUser = await prisma.user.findFirst({
            where: {
                clerkId: userClerkId,
            }
        });

        if (!currentUser) {
            return;
        }

        
        return await prisma.friendship.findMany({
            where: {
                receiverId: currentUser.id,
                status: "pending",
            },
            select: {
                sender: true,
            }
        })    
        
        
    } catch (error) {
        throw new Error("Cannot fetch pending users");
    }
}

export async function getAllFriends(userClerkId: string) {
     try {
        const currentUser = await prisma.user.findFirst({
            where: {
                clerkId: userClerkId,
            }
        });

        if (!currentUser) {
            return;
        }

        const friendships = await prisma.friendship.findMany({
            where: {
                status: "friends",
                OR: [
                    { senderId: currentUser.id },
                    { receiverId: currentUser.id }
                ]
            },
            select: {
                receiver: true,
                sender: true,
                chat: true,
            }
        })

        return friendships.map(f => {
            const friend = f.sender.id === currentUser.id ? f.receiver : f.sender;
            return { ...friend, chatId: f.chat?.id ?? null };
        });
    } catch (error) {
        throw new Error("Cannot fetch friends of the user");
    }
}