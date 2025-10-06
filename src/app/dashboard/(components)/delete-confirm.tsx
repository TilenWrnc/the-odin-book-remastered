"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import deletePost from "../../../../prisma/delete/delete-post";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from 'lucide-react';
import deleteComment from "../../../../prisma/delete/delete-comment";

interface DeleteConfirmModalProps {
  postId: number;
  commentId?: number;
  typeOfDelete: "post" | "comment";
}

const DeleteConfirmModal = ({ postId, commentId, typeOfDelete }: DeleteConfirmModalProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Dialog>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger asChild>
              <Trash className="text-red-500 cursor-pointer" size={20} />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Are you sure you want to delete your {typeOfDelete}?
            </DialogTitle>
          </DialogHeader>
          <Separator />

          <form
            action={async () => {
              try {
                if (typeOfDelete === "post") {
                  setIsLoading(true);
                  await deletePost(postId);
                  toast.success("Post deleted!");
                  setIsLoading(false);
                  router.push('/dashboard');
                } else if (typeOfDelete === "comment") {
                  if (!commentId) {
                    return;
                  }
                  setIsLoading(true);
                  await deleteComment(commentId, postId);
                  toast.success("Comment deleted!");
                  setIsLoading(false);
                  router.push(`/dashboard/${postId}`);
                }
              } catch {
                toast.error(`Failed to delete post ${typeOfDelete}`);
              }
            }}
          >
            <Button type="submit" variant="destructive" className="w-full" disabled={isLoading}>
               {isLoading ? <LoaderCircle className="animate-spin"/> : "Delete"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmModal;
