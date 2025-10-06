"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LoaderCircle, Pencil } from 'lucide-react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import updatePost from "../../../../prisma/update/update-post";
import { useState } from "react";


interface EditModalProps {
    postId: number;
    postContent: string;
}

const EditModal = ({ postId, postContent } : EditModalProps) => {
    const router = useRouter();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return ( 
        <div>
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <Tooltip>
                    <TooltipTrigger>
                        <DialogTrigger asChild>
                            <Pencil className='text-orange-500 cursor-pointer' size={20}/>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Edit</p>
                    </TooltipContent>
                </Tooltip>
                
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Edit post
                        </DialogTitle>
                    </DialogHeader>
                    <form action={async (formData) => {
                        try {
                            setIsLoading(true);
                            await updatePost(postId, formData);
                            toast.success("Post updated");
                            setIsLoading(false);
                            setIsEditModalOpen(false);
                            router.refresh();
                        } catch (err) {
                            console.error(err);
                            toast.error("Failed to update post");
                        }
                     }}
                    >
                        <Textarea className="h-[250px] max-w-[30vw]" autoFocus maxLength={500} name="post-content-edited" required defaultValue={postContent}/>
                        <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                            {isLoading ? <LoaderCircle className="animate-spin"/> : "Submit"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
     );
}
 
export default EditModal;