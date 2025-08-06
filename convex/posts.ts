import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();

    const userMap = new Map(
        await Promise.all(
          posts.map(async (post) => {
            const user = await ctx.db
              .query("users")
              .withIndex("by_clerk_id", (q) => q.eq("clerkId", post.userId))
              .unique();
            return [post.userId, user];
          })
        )
      );

    return posts.map((post) => ({
      ...post,
      user: userMap.get(post.userId)
    }))
  },
});

export const createPost = mutation({
    args: {
        userId: v.string(),
        content: v.string(),
        createdAt: v.number(),
        likes: v.number(),
        comments: v.number(),
    },
    handler: async(ctx, args) => {
        const post = await ctx.db.insert("posts", {
            userId: args.userId,
            content: args.content,
            createdAt: args.createdAt,
            likes: args.likes,
            comments: args.comments,
        })
        return post;
    }
});
