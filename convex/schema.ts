import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    userId: v.string(),
    content: v.string(),
    createdAt: v.number(),
    likes: v.number(),
    comments: v.number(),
  }),
  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
    imageUrl: v.string(),
    friends: v.optional(v.array(v.string())),
  }).index("by_clerk_id", ["clerkId"]),
});