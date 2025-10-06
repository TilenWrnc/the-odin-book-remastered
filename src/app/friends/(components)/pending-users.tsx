import { currentUser } from "@clerk/nextjs/server";
import { getAllPendingUsersRecieved, getAllPendingUsersSend } from "../../../../prisma/get/get-all-users";
import { Loader, User } from "lucide-react";
import getUser from "../../../../prisma/get/get-user";
import FrendshipForm from "./frendship-form";
import AcceptDecline from "./accept-decline";


const PendingUsers = async () => {
    const user = await currentUser();

    if (!user) {
        return;
    }

    const pendingUsers = await getAllPendingUsersSend(user.id);

    const awaitingUsers = await getAllPendingUsersRecieved(user.id);

    const realUser = await getUser(user.id);

    if (!realUser) {
        return;
    }

    return ( 
        <div>
            <div className="mb-10">
                <h2 className="text-center text-neutral-700">Added me</h2>
                {awaitingUsers!.map((awaitingUser) => (
                    <div key={awaitingUser.sender.id} className="flex justify-between border-b-2 py-2">
                            <div className="flex items-center gap-x-5">
                                {awaitingUser.sender.imageUrl ? <img src={awaitingUser.sender.imageUrl} alt="user image" className="rounded-md max-w-[30px] w-[10vw] h-auto"/> : <User className="rounded-md max-w-[30px] w-[10vw] h-auto"/>}
                                <p className="text-neutral-700">{awaitingUser.sender.username ? awaitingUser.sender.username : awaitingUser.sender.email}</p>
                            </div>
                            <div>
                                <AcceptDecline senderId={awaitingUser.sender.id} recieverId={realUser.id}/>
                            </div>
                        </div>
                ))}
                {!pendingUsers && (
                    <div className="h-100 flex justify-center items-center">
                            <Loader className="size-5 animate-spin" />
                        </div>
                )}
            </div>
            <div>
                {pendingUsers!.map((pendingUser) => (
                    <div key={pendingUser.receiver.id} className="flex justify-between border-b-2 py-2">
                            <div className="flex items-center gap-x-5">
                                {pendingUser.receiver.imageUrl ? <img src={pendingUser.receiver.imageUrl} alt="user image" className="rounded-md max-w-[30px] w-[10vw] h-auto"/> : <User className="rounded-md max-w-[30px] w-[10vw] h-auto"/>}
                                <p className="text-neutral-700">{pendingUser.receiver.username ? pendingUser.receiver.username : pendingUser.receiver.email}</p>
                            </div>
                            <div>
                                <FrendshipForm senderId={realUser.id} recieverId={pendingUser.receiver.id} relationshipStatus="pending" />
                            </div>
                        </div>
                ))}
                {!pendingUsers && (
                    <div className="h-100 flex justify-center items-center">
                            <Loader className="size-5 animate-spin" />
                        </div>
                )}
            </div>
        </div>
     );
}
 
export default PendingUsers;