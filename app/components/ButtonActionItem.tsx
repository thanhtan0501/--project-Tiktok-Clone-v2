"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { store } from "../stores";
import { useUser } from "../context/user";
import useGetLikePostById from "../hooks/useGetLikePostById";
import useGetCommentPostById from "../hooks/useGetCommentPostById";
import useIsLike from "../hooks/useIsLike";
import useCreateLike from "../hooks/useCreateLike";
import useDeleteLike from "../hooks/useDeleteLike";
import Loading from "../loading";

interface ButtonActionItemProps {
    data: {
        id: string;
        user_id: string;
        video_url: string;
        text: string;
        created_at: string;
        profile: {
            user_id: string;
            user_name: string;
            nick_name: string;
            tick?: boolean;
            avatar: string;
        };
    };
}

interface Like {
    id: string;
    user_id: string;
    post_id: string;
}

interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
}

const ButtonActionItem = ({ data }: ButtonActionItemProps) => {
    const router = useRouter();
    let { setIsLoginModal } = store();

    const contextUser = useUser();
    const [hasClickLike, setHasClickLike] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(false);
    const [likes, setLikes] = useState<Like[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (contextUser?.user?.user_id) {
            let res = useIsLike(contextUser?.user?.user_id, data?.id, likes);
            setUserLiked(res);
        }
    }, [contextUser?.user]);
    useEffect(() => {
        getAllLikesByPost();
        getAllCommentsByPost();
        if (contextUser?.user?.user_id) {
            let res = useIsLike(contextUser?.user?.user_id, data?.id, likes);
            setUserLiked(res);
        }
    }, [data]);

    const getAllLikesByPost = async () => {
        let result = await useGetLikePostById(data?.id);
        setLikes(result);
    };
    const getAllCommentsByPost = async () => {
        let result = await useGetCommentPostById(data?.id);
        setComments(result);
    };

    const handleLike = () => {
        if (!contextUser?.user?.user_id) {
            setIsLoginModal(true);
            return;
        }

        let res = useIsLike(contextUser?.user?.user_id, data?.id, likes);

        if (!res) {
            setUserLiked(true);
            like();
        } else {
            setUserLiked(false);
            likes.forEach((like: Like) => {
                if (
                    contextUser?.user?.user_id == like?.user_id &&
                    like?.post_id == data?.id
                ) {
                    unlike(like?.id);
                }
            });
        }
    };

    const like = async () => {
        setHasClickLike(true);
        await useCreateLike(contextUser?.user?.user_id || "", data?.id);
        await getAllLikesByPost();
        setHasClickLike(false);
    };

    const unlike = async (id: string) => {
        setHasClickLike(true);
        await useDeleteLike(id);
        await getAllLikesByPost();
        setHasClickLike(false);
    };

    return (
        <div id={`post-${data?.id}`} className="">
            <div className="flex flex-col gap-2 items-center">
                <div className="flex flex-col items-center gap-1">
                    <button
                        disabled={hasClickLike}
                        onClick={() => handleLike()}
                        className={`p-3 rounded-full  bg-[#1618230f] ${
                            hasClickLike ? "cursor-default" : "cursor-pointer"
                        }`}
                    >
                        {hasClickLike ? (
                            <Loading size={24} color="#333" />
                        ) : (
                            <GoHeartFill
                                color={userLiked ? "#fe2c55" : "#000"}
                                size={24}
                            />
                        )}
                    </button>
                    <span className="text-[12px] font-bold">
                        {likes?.length}
                    </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <button
                        onClick={() =>
                            router.push(`/post/${data?.user_id}/${data?.id}`)
                        }
                        className="p-3 rounded-full cursor-pointer bg-[#1618230f]"
                    >
                        <FaCommentDots size={24} />
                    </button>
                    <span className="text-[12px] font-bold">
                        {comments?.length}
                    </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <button
                        onClick={() =>
                            router.push(`/post/${data?.user_id}/${data?.id}`)
                        }
                        className="p-3 rounded-full cursor-pointer bg-[#1618230f]"
                    >
                        <FaShare size={24} />
                    </button>
                    <span className="text-[12px] font-bold">0</span>
                </div>
            </div>
        </div>
    );
};

export default ButtonActionItem;
