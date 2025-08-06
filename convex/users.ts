
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createuser = mutation({
    args: {
        clerkId: v.string(),
        username: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();
        
        if (existing) return existing._id;
        
        const userId = await ctx.db.insert("users", {
            clerkId: args.clerkId,
            username: args.username ? args.username : "Anonymous",
            imageUrl: args.imageUrl,
        })
        return userId;
    }
});

export const getAllUsers = query({
    args: {},
    handler: async (ctx) =>{
        return await ctx.db.query("users").collect();
    },
});

export const getCurrentUser = query({
    args: {
        clerkId: v.string(),
    },
    handler: async(ctx, args) => {
        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        return currentUser;
    }
})


