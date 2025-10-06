"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CommentFormProps {
  handlePostComment: (formData: FormData) => Promise<void>;
}

export default function CommentForm({ handlePostComment }: CommentFormProps) {
  const router = useRouter();

  return (
    <form
      className="flex items-center justify-center w-full my-3 gap-x-3"
      action={async (formData: FormData) => {
        await handlePostComment(formData);
        router.refresh(); 
      }}
    >
      <Input
        className="mt-3 text-xs"
        required
        placeholder="Type your comment here..."
        name="comment-content"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
