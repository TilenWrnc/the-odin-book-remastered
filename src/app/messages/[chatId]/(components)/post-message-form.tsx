"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageFormProps {
  handlePostMessage: (formData: FormData) => Promise<void>;
}

export default function MessageForm({ handlePostMessage }: MessageFormProps) {
  const router = useRouter();

  return (
    <form
      className="flex items-center justify-center w-full my-3 gap-x-3"
      action={async (formData: FormData) => {
        await handlePostMessage(formData);
        router.refresh(); 
      }}
    >
      <Input
        className="mt-3 text-xs"
        required
        placeholder="Type your message here..."
        name="message-content"
        autoFocus
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
