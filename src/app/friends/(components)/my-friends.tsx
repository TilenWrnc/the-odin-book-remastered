import { currentUser } from "@clerk/nextjs/server";
import { getAllFriends } from "../../../../prisma/get/get-all-users";
import getUser from "../../../../prisma/get/get-user";
import { Loader, User } from "lucide-react";
import FrendshipForm from "./frendship-form";


const MyFriends = async () => {
    const user = await currentUser();

    if (!user) {
        return;
    }

    const userFriends = await getAllFriends(user.id);

    const realUser = await getUser(user.id);

    if (!realUser) {
        return;
    }

    return ( 
        <div>
            {userFriends!.map((friend) => (
                    <div key={friend.id} className="flex justify-between border-b-2 py-2">
                        <div className="flex items-center gap-x-5">
                            {friend.imageUrl ? <img src={friend.imageUrl} alt="user image" className="rounded-md max-w-[30px] w-[10vw] h-auto"/> : <User className="rounded-md max-w-[30px] w-[10vw] h-auto"/>}
                            <p className="text-neutral-700">{friend.username ? friend.username : friend.email}</p>
                        </div>
                        <div>
                            <FrendshipForm senderId={realUser.id} recieverId={friend.id} relationshipStatus="friends" chatId={friend.chatId!}/>
                        </div>
                    </div>
            ))}
            {!userFriends && (
                    <div className="h-100 flex justify-center items-center">
                        <Loader className="size-5 animate-spin" />
                    </div>
            )}
        </div>
     );
}
 
export default MyFriends;