"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import createFrendshipPending from "../../../../prisma/post/create-frendship";
import deleteFrendship from "../../../../prisma/delete/delete-frendship";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageSquareText, UserRoundX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

interface FrendshipFormProps {
    senderId: number;
    recieverId: number;
    relationshipStatus: "pending" | "friends" | null;
    chatId?: number;
}

const FrendshipForm = ({ senderId, recieverId, relationshipStatus, chatId } : FrendshipFormProps) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleChangeFrendship = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            if (relationshipStatus === null) {
                await createFrendshipPending(senderId, recieverId);
            } else {
                await deleteFrendship(senderId, recieverId);
            }
            router.refresh();
        } finally {
        setIsLoading(false);
        }
    };

    return ( 
        <div>
            {(relationshipStatus === null || relationshipStatus === "pending") && (
                <Button type="submit" variant={relationshipStatus === null ? "outline" : "default"} className="cursor-pointer" disabled={isLoading} onClick={handleChangeFrendship}>
                    {relationshipStatus === null ? "Add Friends" : "Cancel"}
                </Button>
            )}
            {relationshipStatus === "friends" && (
                <div className="flex gap-x-3">
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href={`/messages/${chatId}`}><MessageSquareText className="cursor-pointer" size={25} /></Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Message
                        </TooltipContent>
                    </Tooltip>

                    <Dialog>
                        <Tooltip>
                            <TooltipTrigger>
                                <DialogTrigger asChild>
                                    <UserRoundX className="text-red-500 cursor-pointer" size={25} />
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Unfriend</p>
                            </TooltipContent>
                        </Tooltip>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-center">
                                    Are you sure you want to remove this person from your friends list??
                                </DialogTitle>
                            </DialogHeader>
                            <Button variant="destructive" disabled={isLoading} onClick={handleChangeFrendship}>Confirm</Button>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div> 
    );
}
 
export default FrendshipForm;