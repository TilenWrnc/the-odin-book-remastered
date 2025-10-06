"use client";

import EditModal from "./edit-modal";
import DeleteConfirmModal from "./delete-confirm";

interface DeleteAndEditButtonProps {
    postId: number;
    postContent: string
}

const DeleteAndEditButton = ({ postId, postContent } : DeleteAndEditButtonProps ) => {
    return ( 
        <div className='flex absolute right-0 gap-x-3'>
            <EditModal postId={postId} postContent={postContent}/>
                
            <DeleteConfirmModal postId={postId} typeOfDelete="post"/>
        </div>
     );
}
 
export default DeleteAndEditButton;