import { prisma } from "@/lib/prisma";

export const getAllPosts = async() => {
    try {
        const allPosts = await prisma.post.findMany({
            include: {
                author: true,
            },
            orderBy: {
                date: "desc"
            }
        });
        return allPosts;
    } catch (error) {
        throw new Error("Cannot find posts")
    }
};

export const getSinglePost = async(postId: number) => {
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: postId
            },
            include: {
                author: true,
            }
        })
        return post;   
    } catch (error) {
        throw new Error("Cannot find post")
    }
};