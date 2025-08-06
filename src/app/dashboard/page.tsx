"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from 'date-fns';
import { Separator } from "@/components/ui/separator";
import { Loader, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";

const Dashboard = () => {
    const posts = useQuery(api.posts.getPosts);

    return ( 
        <div className="flex flex-col p-[3vw] mx-auto mt-10 mb-20 bg-[#f9f9f9] w-[80vw] lg:w-[45vw] rounded-xl shadow-lg">
            <h1 className="font-bold text-2xl md:text-3xl text-center ">Posts</h1>

            <div>
                {!posts && (
                    <div className="h-100 flex justify-center items-center">
                        <Loader className="size-5 animate-spin" />
                    </div>
                )}

                {posts?.map((post) => (
                    <div key={post._id} className="my-5 cursor-pointer">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-x-3 ">
                                    <img src={post.userId} className="rounded-md max-w-[30px] w-[10vw] h-auto"/>
                                    <div>
                                        <p className="text-sm md:text-lg ">{post.userId}</p>
                                        <p className="text-neutral-500 text-xs ">{format(post.createdAt, "PPpp")}</p>
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
                                        <ThumbsUp className="h-auto max-w-[1.5vw] min-w-[20px] hover:fill-blue-300"/>
                                        <p className="font-bold">{post.likes}</p>
                                        <ThumbsDown className="h-auto max-w-[1.5vw] min-w-[20px] hover:fill-red-300"/>
                                </div>
                                <div className="flex gap-x-3">
                                    <p className="font-bold">{post.comments}</p>
                                    <MessageSquare className="h-auto max-w-[1.5vw] min-w-[20px] hover:fill-yellow-300"/>    
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                   
                ))}
            </div>
        </div>
     );
}
 
export default Dashboard; 