import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Loader, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { getAllPosts } from "../../../prisma/get/get-posts";
import { format } from 'date-fns'
import { User } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server'
import Link from "next/link";

const Dashboard = async() => {
    const allPosts = await getAllPosts();

    const user = await currentUser()

    return ( 
        <div className="flex flex-col p-[3vw] mx-auto mt-10 mb-20 bg-[#f9f9f9] w-[80vw] lg:w-[45vw] rounded-xl shadow-lg">
            <h1 className="font-bold text-2xl md:text-3xl text-center ">Posts</h1>

            <div>
                {!allPosts && (
                    <div className="h-100 flex justify-center items-center">
                        <Loader className="size-5 animate-spin" />
                    </div>
                )}

                {allPosts?.map((post) => (
                    <div key={post.id} className="my-5 cursor-pointer">
                            <Link href={`/dashboard/${post.id}`}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-x-3 relative">
                                            {!post.author.imageUrl && (
                                                <User className="rounded-md max-w-[30px] w-[10vw] h-auto"/>
                                            )}
                                                {post.author.imageUrl && (
                                                    <img src={post.author.imageUrl} className="rounded-md max-w-[30px] w-[10vw] h-auto"/>
                                            )}
                                            <div>
                                                <p className="text-sm md:text-lg ">{post.author.username ? post.author.username : post.author.email}</p>
                                                <p className="text-neutral-500 text-xs ">{format(post.date, "yyyy-MM-dd 'at' HH:mm")}</p>
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <Separator className="bg-neutral-400"/>
                                        <CardContent className="px-10 text-xs md:text-sm max-w-[100%] break-words">
                                            {post.content}
                                        </CardContent>
                                    <Separator />
                                    <CardFooter className="flex justify-between">
                                        <div className="flex gap-x-3 justify-center items-center">
                                                <ThumbsUp className="h-auto max-w-[1.5vw] min-w-[20px]"/>
                                                <p className="font-bold text-neutral-600">{post.likesCount}</p>
                                        </div>
                                        <div className="flex gap-x-3">
                                            <p className="font-bold text-neutral-600">{post.commentCount}</p>
                                            <MessageSquare className="h-auto max-w-[1.5vw] min-w-[20px]"/>    
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                    </div>
                   
                ))}
            </div>
        </div>
     );
}
 
export default Dashboard; 