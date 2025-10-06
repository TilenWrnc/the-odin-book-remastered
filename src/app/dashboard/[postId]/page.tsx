import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSinglePost } from "../../../../prisma/get/get-posts";
import DeleteAndEditButton from "../(components)/delete-and-edit-buttons";
import { format } from 'date-fns'
import {  User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import createComment from "../../../../prisma/post/create-comment";
import { redirect } from "next/navigation";
import CommentForm from "./(components)/post-comment-form";
import getComments from "../../../../prisma/get/get-comments";
import DeleteConfirmModal from "../(components)/delete-confirm";
import LikeAndDislike from "./(components)/like-and-dislike";
import getUserReaction from "../../../../prisma/get/get-user-reaction";
import getUser from "../../../../prisma/get/get-user";

interface SinglePostProps {
    params: {
        postId: string;
    }
}

const SinglePost = async({ params } : SinglePostProps) => {
    const { postId } = params;
    const post = await getSinglePost(Number(postId));
    const user = await currentUser();

    if (!post || !user) {
        return;
    }

    async function handlePostComment(formData: FormData) {
        "use server"

        try {
            const commentText = formData.get("comment-content");

            if(typeof commentText !== "string") {
                return
            };

            await createComment(commentText, user!.id, Number(postId));  
            return redirect(`/post/${postId}`);
        } catch (error) {
            console.log(error)
        }
    }

    const comments = await getComments(Number(postId));

    const realUser = await getUser(user.id);
    
    if (!realUser) {
        return;

    }
    const userReaction = await getUserReaction(realUser.id, Number(postId));

    return ( 
        <div className="w-[80vw] lg:w-[45vw] m-auto mb-20">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-x-3 relative">
                        {!post.author.imageUrl && (
                            <User className="rounded-md max-w-[30px] w-[10vw] h-auto"/>
                        )}
                        {post.author.imageUrl && (
                            <img src={post.author.imageUrl} className="rounded-md max-w-[30px] w-[10vw] h-auto"/>
                        )}
                        <div>
                            <p className="text-sm md:text-lg ">{post?.author.username ? post.author.username : post.author.email}</p>
                            <p className="text-neutral-500 text-xs ">{format(post.date, "yyyy-MM-dd 'at' HH:mm")}</p>
                        </div>
                        {post.author.clerkId == user.id && (
                            <DeleteAndEditButton postId={post.id} postContent={post.content}/>
                        )}
                    </CardTitle>
                </CardHeader>
                <Separator className="bg-neutral-400"/>
                <CardContent className="px-10 text-xs md:text-sm max-w-[100%] break-words">
                    {post.content}
                </CardContent>
                <Separator />
                <CardFooter className="flex flex-col">
                    <div className="flex justify-between w-full w-full">
                        <LikeAndDislike postId={Number(postId)} userClerkId={user.id} likeCount={post.likesCount} userReaction={userReaction?.type ?? null}/>
                    </div>
                    <div>
                        <h1 className=" text-neutral-600 flex justify-center items-center text-sm">
                            Comments ( <span>{post.commentCount}</span> )
                        </h1>
                    </div>

                    <CommentForm handlePostComment={handlePostComment}/>

                    <Separator />

                    {comments && (
                        comments.map((comment) => (
                            <div key={comment.id} className="w-full my-3">
                                <Card className="p-2 bg-gray-50">
                                    <CardTitle className="flex justify-between items-center">
                                        <div className="flex gap-3 items-center">
                                            <div>
                                                {!comment.author.imageUrl && (
                                                    <User className="rounded-md max-w-[30px] w-[10vw] h-auto"/>
                                                )}
                                                {comment.author.imageUrl && (
                                                    <img src={comment.author.imageUrl} className="rounded-md max-w-[30px] w-[10vw] h-auto"/>
                                                )}
                                            </div>
                                            <p className="text-xs md:text-sm">{comment?.author.username ? comment.author.username : comment.author.email}</p>    
                                            <p className="text-neutral-500 text-xs ">{format(comment.date, "yyyy-MM-dd 'at' HH:mm")}</p>
                                        </div>
                                        {user.id === comment.author.clerkId && (
                                            <DeleteConfirmModal postId={Number(postId)} commentId={comment.id} typeOfDelete="comment"/>
                                        )}
                                    </CardTitle>
                                    <Separator/>
                                    <CardContent>
                                        <p className="text-neutral-600 text-xs md:text-sm pb-3">{comment.text}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    )}
                    
                </CardFooter>
            </Card>
        </div>
     );
}
 
export default SinglePost;