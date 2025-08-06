"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function InitUser() {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.users.createuser);

  useEffect(() => {
    if (isSignedIn && user) {

      createUser({ 
        clerkId: user.id,
        username: user.username ? user.username : "Anonymous", 
        imageUrl: user.imageUrl,
       });
    }
  }, [isSignedIn, user, createUser]);

  return null;
}