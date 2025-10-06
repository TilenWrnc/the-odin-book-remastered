"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import toggleReaction from "../../../../../prisma/update/toggle-reaction";
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LikeAndDislikeProps {
    likeCount: number;
    userClerkId: string;
    postId: number;
    userReaction: "LIKE" | "DISLIKE" | null;
}

const LikeAndDislike = ({ likeCount, userClerkId, postId, userReaction }: LikeAndDislikeProps) => {
    const router = useRouter();


    return ( 
        <div className="flex gap-x-3 justify-around items-center">
            <form action={async() => {
                await toggleReaction(userClerkId, postId, "LIKE");
                router.refresh();
            }}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="submit" className="h-10 w-10 flex items-center justify-center">
                                <ThumbsUp size={25} fill={userReaction == "LIKE" ? "blue" : "white"}/>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Like</p>
                        </TooltipContent>
                    </Tooltip>
            </form>
            <p className="font-bold text-neutral-600 text-xl">{likeCount}</p>
            <form action={async() => {
                await toggleReaction(userClerkId, postId, "DISLIKE");
                router.refresh();
            }}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="submit" className="h-10 w-10 flex items-center justify-center">
                                <ThumbsDown size={25} fill={userReaction == "DISLIKE" ? "red" : "white"}/>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Dislike</p>
                        </TooltipContent>
                    </Tooltip>
            </form>
        </div>
     );
}
 
export default LikeAndDislike;