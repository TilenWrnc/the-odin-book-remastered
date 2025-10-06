import { prisma } from "@/lib/prisma";

export default async function getComments(postId: number) {
    try {
      const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
        include: {
          author: true, 
        },
        orderBy: {
          date: "desc"
        }
      })
      return comments; 
    } catch (error) {
        throw new Error("Cannot get comments");
    };
};