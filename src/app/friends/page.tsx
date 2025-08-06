"use client"

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { User } from "../../../convex/User";

const Friends = () => {
    const allUsers = useQuery(api.users.getAllUsers);
    const addFriend = useMutation(api.friends.addFriend)
    const { user, isLoaded, isSignedIn } = useUser();
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    async function handleAddFriend(addedUserId: string) {
        if ( isLoaded && isSignedIn && user ) {
            await addFriend({
                currentUserId: user.id,
                addedUserId: addedUserId,
            })
        }
    };

    const current = useQuery(api.users.getCurrentUser, {
        clerkId: user?.id ?? "",
    });

    useEffect(() => {
        if (current) {
            setCurrentUser(current);
        }
    }, [current])

    const filteredUsers = allUsers?.filter(
        (singleUser) =>
            singleUser.clerkId !== user?.id &&
            !(currentUser?.friends?.includes(singleUser.clerkId))
    );
    
    return (
        <div className="flex flex-col p-[3vw] mx-auto mt-10 mb-20 bg-[#f9f9f9] w-[80vw] lg:w-[45vw] rounded-xl shadow-lg gap-y-3">
            <div className="min-h-[100px]">
                <h3 className="text-center text-neutral-600">Your friends</h3>
                <Separator/>
                {allUsers?.filter((singleUser) => currentUser?.friends?.includes(singleUser.clerkId)).map((user) => (
                    <div key={user.clerkId} className="flex justify-between cursor-pointer border-b-2 py-2">
                    <div className="flex items-center gap-x-5">
                        <img src={user.imageUrl} alt="user image" className="rounded-md max-w-[30px] w-[10vw] h-auto"/>
                        <p className="text-neutral-700">{user.username}</p>
                    </div>
                    <div>
                        <Button className="bg-red-500 hover:bg-red-500/80" onClick={() => handleAddFriend(user.clerkId)}>
                            Unfollow
                        </Button>
                    </div>
                    </div>
                ))}
            </div>

            {!allUsers && (
                    <div className="h-100 flex justify-center items-center">
                        <Loader className="size-5 animate-spin" />
                    </div>
                )}
            <div>
                <h3 className="text-center text-neutral-600">All Users</h3>
                <Separator/>
                {filteredUsers?.map((user) => (
                    <div key={user.clerkId} className="flex justify-between cursor-pointer border-b-3 py-2">
                        <div className="flex items-center gap-x-5">
                            <img src={user.imageUrl} alt="user image" className="rounded-md max-w-[30px] w-[10vw] h-auto"/>
                            <p className="text-neutral-700">{user.username}</p>
                        </div>
                        <div>
                            <Button className="bg-green-500 hover:bg-green-500/80" onClick={() => handleAddFriend(user.clerkId)}>
                                Follow
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Friends;