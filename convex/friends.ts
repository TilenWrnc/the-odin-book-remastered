import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addFriend = mutation({
    args: {
        currentUserId: v.string(),
        addedUserId: v.string(),
    },
    handler: async (ctx, { currentUserId, addedUserId }) => {
        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", currentUserId))
            .unique();
        
        if (!currentUser) {
            throw new Error("User not found");
        };

        const userFriends = currentUser.friends ?? [];

        if (!userFriends?.includes(addedUserId)) {
            userFriends?.push(addedUserId);
            await ctx.db.patch(currentUser._id, {
                friends: userFriends,
            })
        };

        return userFriends;
    }
}) 
 
