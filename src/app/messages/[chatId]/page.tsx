import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs/server";
import getChat from "../../../../prisma/get/get-chat";
import getUser from "../../../../prisma/get/get-user";
import MessageForm from "./(components)/post-message-form";
import Messages from "./(components)/messages";
import createMessage from "../../../../prisma/post/create-message";
import { redirect } from "next/navigation";

interface ChatProps {
params: {
    chatId: { chatId: string };
    }
}

const Chat = async({ params }: ChatProps) => {
    const { chatId } = await Promise.resolve(params);

    const user = await currentUser();

    if (!user) {
        return;
    }

    const realUser = await getUser(user.id)

    const chat = await getChat(Number(chatId));

    if (!chat) return <p>No chat found</p>;

    if (
        chat.friendship.senderId !== realUser!.id && 
        chat.friendship.receiverId !== realUser!.id
    ) {
        return (
            <Card className="mx-auto bg-[#f9f9f9] w-[80vw] lg:w-[45vw]">
                <CardContent>
                    <p className="text-center">You are not authorized to view this chat</p>
                </CardContent>
            </Card>
        )
    }

    const otherUser = chat.friendship.senderId === realUser?.id ? chat.friendship.receiver : chat.friendship.sender;

    async function handlePostMessage(formData:FormData) {
        "use server";

        try {
            const messageText = formData.get("message-content");

            if(typeof messageText !== "string") {
                return;
            };

            await createMessage(messageText, realUser!.id, otherUser.id, Number(chatId));
            return redirect(`/message/${chatId}`)
        } catch (error) {
            console.log(error)   
        }
    }
    
    return ( 
        <div className="flex flex-col p-[3vw] mx-auto mt-10 mb-20 bg-[#f9f9f9] w-[80vw] lg:w-[45vw] rounded-xl shadow-lg">
            <p className="text-center text-neutral-700 mb-5">Chating with {otherUser.username || otherUser.email}</p>
            <Card>
                <CardContent className="px-5 text-xs md:text-sm max-w-[100%] break-words h-[400px] overflow-y-auto">
                    <Messages messages={chat.messages} realUserId={realUser!.id}/>
                </CardContent>
            </Card>
            <MessageForm handlePostMessage={handlePostMessage}/>      
        </div>
     );
}
 
export default Chat;