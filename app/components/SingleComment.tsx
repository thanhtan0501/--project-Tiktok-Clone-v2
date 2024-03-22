import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { TbLoader2 } from "react-icons/tb";
import { useUser } from "../context/user";
import { commentStore } from "../stores/comment";
import useDeleteComment from "../hooks/useDeleteComment";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import moment from "moment";

interface SingleCommentProps {
    comment: {
        id: string;
        user_id: string;
        post_id: string;
        text: string;
        created_at: string;
        profile: {
            user_id: string;
            avatar: string;
            user_name: string;
            nick_name: string;
        };
    };
    params: { postId: string; userId: string };
}

const SingleComment = ({ comment, params }: SingleCommentProps) => {
    const contextUser = useUser();
    let { setCommentsByPost } = commentStore();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteComment = async () => {
        let res = confirm("Are you sure you want to delete this comment?");
        if (!res) return;

        try {
            setIsDeleting(true);
            await useDeleteComment(comment?.id);
            setCommentsByPost(params?.postId);
            setIsDeleting(false);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return (
        <div className="flex items-center justify-between mt-4">
            <div className=" flex items-start w-full gap-3">
                <Link href={`/profile/${comment?.profile?.user_id}`}>
                    <img
                        loading="lazy"
                        className="rounded-full"
                        width={40}
                        src={useCreateBucketUrl(comment?.profile?.avatar)}
                    />
                </Link>
                <div className="flex-1 flex flex-col gap-0.5">
                    <div>
                        <Link
                            href={`/profile/${comment?.profile?.user_id}`}
                            className="hover:underline text-sm font-semibold"
                        >
                            {comment?.profile?.nick_name}
                        </Link>
                        <span> · </span>
                        <span className="text-xs text-[#161823bf] font-light">
                            {moment(comment?.created_at).calendar()}
                        </span>
                    </div>
                    <div className="text-base">{comment?.text}</div>
                </div>
                {contextUser?.user?.user_id == comment.profile.user_id ? (
                    <button
                        disabled={isDeleting}
                        onClick={() => handleDeleteComment()}
                        className="rounded-full p-1 hover:bg-[#fe2c550f] border"
                    >
                        {isDeleting ? (
                            <TbLoader2
                                className=" animate-spin"
                                size={15}
                                color="#333"
                            />
                        ) : (
                            <AiOutlineDelete size={15} color="#000" />
                        )}
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default SingleComment;
