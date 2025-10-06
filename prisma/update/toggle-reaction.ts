"use server"

import { prisma } from "@/lib/prisma";

export default async function toggleReaction(
  userClerkId: string,
  postId: number,
  type: "LIKE" | "DISLIKE"
) {
  const user = await prisma.user.findFirst({
    where: { clerkId: userClerkId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;

  const existing = await prisma.postReaction.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (!existing) {
    await prisma.postReaction.create({
      data: { userId, postId, type },
    });

    await prisma.post.update({
      where: { id: postId },
      data: {
        likesCount: {
          increment: type === "LIKE" ? 1 : -1,
        },
      },
    });

    return;
  }

  if (existing.type === type) {
    await prisma.postReaction.delete({
      where: { userId_postId: { userId, postId } },
    });

    await prisma.post.update({
      where: { id: postId },
      data: {
        likesCount: {
          increment: type === "LIKE" ? -1 : 1,
        },
      },
    });

    return;
  }

  await prisma.postReaction.update({
    where: { userId_postId: { userId, postId } },
    data: { type },
  });

  await prisma.post.update({
    where: { id: postId },
    data: {
      likesCount: {
        increment: type === "LIKE" ? 2 : -2,
      },
    },
  });
}
