import { prisma } from "@/lib/prisma";

export const getAllPosts = async() => {
    const allPosts = await prisma.post.findMany();
    return allPosts;
}