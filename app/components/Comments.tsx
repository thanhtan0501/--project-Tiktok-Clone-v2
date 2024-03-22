import React, { useState } from "react";
import SingleComment from "./SingleComment";
import { commentStore } from "../stores/comment";
import { store } from "../stores";
import { useUser } from "../context/user";
import useCreateComment from "../hooks/useCreateComment";
import Loading from "../loading";

interface CommentsProps {
    params: { postId: string; userId: string };
}

const Comments = ({ params }: CommentsProps) => {
    let { commentsByPost, setCommentsByPost } = commentStore();
    let { setIsLoginModal } = store();

    const contextUser = useUser();

    const [comment, setComment] = useState<string>("");
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleAddComment = async () => {
        if (!contextUser?.user) {
            return setIsLoginModal(true);
        }
        try {
            setIsUploading(true);
            await useCreateComment(
                contextUser?.user?.user_id,
                params?.postId,
                comment
            );
            setCommentsByPost(params?.postId);
            setComment("");
            setIsUploading(false);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };
    return (
        <>
            <div
                id="Comments"
                className=" relative bg-[#f8f8f8] z-0 w-full h-[calc(100%-273px)] border-t overflow-auto px-10 pb-28"
            >
                <div className="">
                    {commentsByPost?.length > 0 ? (
                        <div>
                            {commentsByPost.map((comment, index) => (
                                <SingleComment
                                    key={index}
                                    comment={comment}
                                    params={params}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className=" text-center mt-6 text-sm text-[#16182380] px-1.5">
                            <i>Be the first to comment!</i>
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute flex items-center gap-1.5 justify-between bottom-0 left-0 bg-white h-[85px] w-full px-8 py-5 border-t">
                <div
                    className={`bg-[#1618230f] flex  items-center rounded-lg w-full max-w-[420px] `}
                >
                    <input
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={isUploading}
                        value={comment || ""}
                        className="bg-[#F1F1F2] text-[14px] focus:outline-none border border-transparent focus:border-[#16182333] w-full lg:max-w-[420px] py-2 px-3 rounded-lg"
                        type="text"
                        placeholder="Add comment..."
                    />
                </div>
                <button
                    disabled={!comment}
                    onClick={() => handleAddComment()}
                    className={`px-3 py-2 max-w-[52px] w-full ${
                        comment
                            ? "text-[#fe2c55] cursor-pointer"
                            : "text-[#16182357] cursor-not-allowed"
                    }`}
                >
                    {isUploading ? (
                        <Loading size={24} color="#e91e62" />
                    ) : (
                        <span className="text-sm font-semibold">Add</span>
                    )}
                </button>
            </div>
        </>
    );
};

export default Comments;
