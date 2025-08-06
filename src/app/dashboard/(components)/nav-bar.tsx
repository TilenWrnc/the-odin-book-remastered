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
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

const NavBar = () => {
    const createPost = useMutation(api.posts.createPost);

    const [postText, setPostText] = useState("");

    const { user, isLoaded, isSignedIn } = useUser();

    async function handleCreatePost() {
        if (!isLoaded || !isSignedIn || !user) {
            console.log("User not found")
            return;
        }

        try {
            if (user === undefined) {
                return;
            }

            await createPost({
                userId: user.id,
                content: postText,
                createdAt: Date.now(),
                likes: 0,
                comments: 0,
            });
            toast.success("Succesfully created a post")
        } catch (error) {
            console.log(error)
        };
    }

    return ( 
        <div>
            <nav className="bg-[#f9f9f9] p-4 flex border-b shadow-lg justify-around">
                <Logo/>

                <div>
                    <Dialog>
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
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleCreatePost();
                            }}>
                                <Textarea className="h-[250px] max-w-[30vw]" placeholder="Type your post here..." autoFocus onChange={(e) => setPostText(e.target.value)} maxLength={500}/>
                                <Button type="submit" className="w-full mt-2">Submit</Button>
                            </form>
                        </DialogContent>
                     </Dialog>
                </div>
                

                <div className="w-70">
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
                                    border: "3px solid gray",
                                    padding: "2px",
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