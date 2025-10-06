import { currentUser } from "@clerk/nextjs/server";
import getAllUsers from "../../../../prisma/get/get-all-users";
import { Loader, User } from "lucide-react";
import getUser from "../../../../prisma/get/get-user";
import FrendshipForm from "./frendship-form";

const AllUsers = async () => {

    const user = await currentUser();

    if (!user) {
        return;
    }

    const allUsers = await getAllUsers(user.id);

    const realUser = await getUser(user.id);

    if (!realUser) {
        return;
    }

    return ( 
        <div>

            {allUsers!.map((user) => (
                    <div key={user.id} className="flex justify-between border-b-2 py-2">
                        <div className="flex items-center gap-x-5">
                            {user.imageUrl ? <img src={user.imageUrl} alt="user image" className="rounded-md max-w-[30px] w-[10vw] h-auto"/> : <User className="rounded-md max-w-[30px] w-[10vw] h-auto"/>}
                            <p className="text-neutral-700">{user.username ? user.username : user.email}</p>
                        </div>
                        <div>
                            <FrendshipForm senderId={realUser.id} recieverId={user.id} relationshipStatus={null}/>
                        </div>
                    </div>
            ))}
            {!allUsers && (
                    <div className="h-100 flex justify-center items-center">
                        <Loader className="size-5 animate-spin" />
                    </div>
            )}
        </div>
     );
}
 
export default AllUsers;