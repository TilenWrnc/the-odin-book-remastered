"use client"

import Logo from "@/app/(components)/logo";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, SquarePen } from "lucide-react";
import { toast } from "sonner";
import { createPostAction } from "../../../../prisma/post/create-post";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const NavBar = () => {
    const { isLoaded } = useUser();

    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    return ( 
        <div>
            <nav className="bg-[#f9f9f9] p-4 flex border-b shadow-lg items-center justify-around relative">
                <Logo/>

                <div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button >
                                <SquarePen />
                                Create a new post
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-center">
                                    Write a post
                                </DialogTitle>
                            </DialogHeader>
                            <form action={async (formData) => {
                                try {
                                    await createPostAction(formData);
                                    toast.success("Post created");
                                    setIsOpen(false);
                                    router.refresh();
                                } catch (err) {
                                    console.error(err);
                                    toast.error("Failed to create post");
                                }
                            }}
                            >
                                <Textarea className="h-[250px] max-w-[30vw]" placeholder="Type your post here..." autoFocus maxLength={500} name="post-content" required/>
                                <Button type="submit" className="w-full mt-2">Submit</Button>
                            </form>
                        </DialogContent>
                     </Dialog>
                </div>
                

                <div>
                    {!isLoaded ? (
                        <div className="flex justify-center items-center">        
                            <Loader className="size-5 animate-spin" />
                        </div>
                    ) : (
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: {
                                    height: 35,
                                    width: 35,
                                    border: "2px solid gray",
                                    padding: "3px",
                                    backgroundColor: "white"
                                },
                            },
                        }}
                        showName
                        fallback
                    />
                    )}
                </div>
            </nav>
        </div>
     );
}
 
export default NavBar;