import { currentUser } from "@clerk/nextjs/server";
import getUser from "../../../prisma/get/get-user";
import { getAllChats } from "../../../prisma/get/get-chat";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from 'date-fns'
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

const Messages = async() => {
    const user = await currentUser();

    if (!user) {
        return;
    };

    const realUser = await getUser(user.id);

    const allChats = await getAllChats(realUser!.id);

    return ( 
        <div className="flex flex-col p-[3vw] mx-auto mt-10 mb-20 bg-[#f9f9f9] w-[80vw] lg:w-[45vw] rounded-xl shadow-lg gap-y-5">   
                {!allChats ? (
                    <p className="text-center text-neutral-600">No messages</p>
                ) : (
                    allChats.map((chat) =>  (
                        <Link href={`/messages/${chat.id}`} key={chat.id}>
                            <Card>
                                <CardHeader className="flex justify-center">
                                    {chat.friendship.receiverId === realUser!.id ? (
                                        <div className="flex items-center gap-3">
                                            {chat.friendship.sender.imageUrl ? (
                                                <Image
                                                    src={chat.friendship.sender.imageUrl}
                                                    width={30}
                                                    height={30}
                                                    alt="User avatar"
                                                />
                                                ) : (
                                                <User />
                                            )}
                                            <p>{chat.friendship.sender.username}</p>
                                        </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                {chat.friendship.receiver.imageUrl ? (
                                                    <Image
                                                        src={chat.friendship.receiver.imageUrl}
                                                        width={30}
                                                        height={30}
                                                        alt="User avatar"
                                                    />
                                                    ) : (
                                                    <User />
                                                )}
                                                <p>{chat.friendship.receiver.username}</p>
                                            </div>
                                    )}
                                </CardHeader>
                                <CardContent className="px-5 text-xs md:text-sm max-w-[100%] break-words">
                                    <p className="text-neutral-600 mb-3">{chat.messages[0].text}</p>
                                    <p className="text-end">{format(new Date(chat.messages[0].date), "MMM d, yyyy, hh:mm a")}</p>
                                </CardContent>
                            </Card>
                        </Link>  
                    ))
                )}
        </div>
     );
}
 
export default Messages;