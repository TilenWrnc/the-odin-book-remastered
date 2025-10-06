"use client";

import { Button } from "@/components/ui/button";
import deleteFrendship from "../../../../prisma/delete/delete-frendship";
import { useRouter } from "next/navigation";
import updateFrendship from "../../../../prisma/update/update-frendship";
import { useState } from "react";

interface AcceptDeclineProps  {
    senderId: number;
    recieverId: number;
}

const AcceptDecline = ({ senderId, recieverId }: AcceptDeclineProps) => {
    const router = useRouter();

    return ( 
        <div className="flex gap-3">
            <Button
                variant="outline" 
                onClick={async() => {
                    await updateFrendship(senderId, recieverId);
                    router.refresh();
                }}
            >
                Accept
            </Button>
            <Button 
                variant="destructive" 
                onClick={async() => {
                    await deleteFrendship(senderId, recieverId);
                    router.refresh();
                }}
            >
                Decline
            </Button>
        </div> 
    );
}
 
export default AcceptDecline;