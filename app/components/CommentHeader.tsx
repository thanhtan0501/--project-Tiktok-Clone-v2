"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { PostWithProfile } from "../types/types";
import { likeStore } from "../stores/like";
import { commentStore } from "../stores/comment";
import { store } from "../stores";
import { useUser } from "../context/user";
import useIsLike from "../hooks/useIsLike";
import useCreateLike from "../hooks/useCreateLike";
import useDeleteLike from "../hooks/useDeleteLike";
import useDeletePostById from "../hooks/useDeletePostById";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import moment from "moment";
import Loading from "../loading";

interface CommentHeaderProps {
    post: PostWithProfile | null;
    params: { postId: string; userId: string };
}

const CommentHeader = ({ post, params }: CommentHeaderProps) => {
    const router = useRouter();

    let { likesByPost, setLikesByPost } = likeStore();
    let { commentsByPost, setCommentsByPost } = commentStore();
    let { setIsLoginModal } = store();

    const contextUser = useUser();

    const [pathName, setPathName] = useState<string | "">("");

    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(false);

    const [btnText, setBtnText] = useState("Copy");

    const copyCode = () => {
        navigator.clipboard
            .writeText(pathName)
            .then(() => {
                setBtnText("Copied");
                setTimeout(function () {
                    setBtnText("Copy");
                }, 3000);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        setCommentsByPost(params?.postId);
        setLikesByPost(params?.postId);
        if (typeof window !== "undefined") {
            setPathName(window.location.href);
        }
    }, [post]);

    useEffect(() => {
        if (contextUser?.user?.user_id) {
            let res = useIsLike(
                contextUser?.user?.user_id,
                params?.postId,
                likesByPost
            );
            setUserLiked(res);
        }
    }, [likesByPost]);

    const like = async () => {
        try {
            setHasClickedLike(true);
            await useCreateLike(
                contextUser?.user?.user_id || "",
                params?.postId
            );
            setLikesByPost(params.postId);
            setHasClickedLike(false);
        } catch (error) {
            console.log(error);
            alert(error);
            setHasClickedLike(false);
        }
    };
    const unlike = async (id: string) => {
        try {
            setHasClickedLike(true);
            await useDeleteLike(id);
            setLikesByPost(params?.postId);
            setHasClickedLike(false);
        } catch (error) {
            console.log(error);
            alert(error);
            setHasClickedLike(false);
        }
    };

    const handleLikePost = () => {
        if (!contextUser?.user) {
            return setIsLoginModal(true);
        }
        let res = useIsLike(
            contextUser?.user?.user_id,
            params?.postId,
            likesByPost
        );
        if (!res) {
            setUserLiked(true);
            like();
        } else {
            setUserLiked(false);
            likesByPost.forEach((like) => {
                if (
                    contextUser?.user?.user_id &&
                    contextUser?.user?.user_id === like.user_id &&
                    like.post_id === params.postId
                ) {
                    unlike(like.id);
                }
            });
        }
    };
    const handleDeletePost = async () => {
        let res = confirm("Are you sure you want to delete this post?");
        if (!res) return;

        setIsDeleting(true);

        try {
            await useDeletePostById(params?.postId, post?.video_url || "");
            router.push(`/profile/${params.userId}`);
            setIsDeleting(false);
        } catch (error) {
            console.log(error);
            setIsDeleting(false);
            alert(error);
        }
    };

    return (
        <div className="">
            <div className="bg-[#16182308] rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 flex-1 group">
                        <Link href={`/profile/${post?.user_id}`}>
                            {post?.profile?.avatar ? (
                                <img
                                    loading="lazy"
                                    className="rounded-full"
                                    width={40}
                                    src={useCreateBucketUrl(
                                        post?.profile?.avatar
                                    )}
                                />
                            ) : (
                                <div className="h-[40px] w-[40px] rounded-full bg-gray-200"></div>
                            )}
                        </Link>
                        <Link
                            href={`/profile/${post?.user_id}`}
                            className="flex flex-col"
                        >
                            <h3 className="group-hover:underline text-[17px] font-semibold">
                                {post?.profile?.user_name}
                            </h3>
                            <div className="text-[13px] font-light">
                                <span>{post?.profile?.nick_name}</span>
                                <span> · </span>
                                <span>
                                    {moment(post?.created_at).calendar()}
                                </span>
                            </div>
                        </Link>
                    </div>
                    {contextUser?.user?.user_id === post?.user_id ? (
                        <button
                            disabled={isDeleting}
                            className={`flex items-center justify-center max-w-[110px] w-full gap-1 px-4 py-1.5 rounded-md min-w-[96px] text-white ${
                                isDeleting
                                    ? "bg-[#cb2e50]"
                                    : "hover:bg-[#cb2e50] bg-[#fe2c55]"
                            }`}
                            onClick={() => handleDeletePost()}
                        >
                            {isDeleting ? (
                                <Loading size={24} color="#fff" />
                            ) : (
                                <>
                                    <AiOutlineDelete size={20} color="#fff" />
                                    <span className="font-semibold text-[16px]">
                                        Delete
                                    </span>
                                </>
                            )}
                        </button>
                    ) : null}
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-base">{post?.text}</p>
                    <div className="flex items-center gap-2 text-xs">
                        <BsMusicNoteBeamed size={14} />
                        {post?.profile?.nick_name && (
                            <span className="text-[13px] break-words">
                                Evergreen - {post.profile.nick_name}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="pt-4 px-4 flex gap-4 flex-col">
                <div className="flex flex-row gap-5">
                    <div className="flex items-center gap-1.5">
                        <button
                            disabled={hasClickedLike}
                            onClick={() => handleLikePost()}
                            className="p-1.5 rounded-full cursor-pointer bg-[#1618230f]"
                        >
                            {hasClickedLike ? (
                                <Loading size={20} color="#333" />
                            ) : (
                                <GoHeartFill
                                    color={userLiked ? "#fe2c55" : "#000"}
                                    size={20}
                                />
                            )}
                        </button>
                        <span className="text-[12px] cursor-default text-[#161823bf] font-bold">
                            <strong>{likesByPost?.length}</strong>
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-full cursor-default bg-[#1618230f]">
                            <FaCommentDots size={20} />
                        </button>
                        <span className="text-[12px] cursor-default text-[#161823bf] font-bold">
                            <strong>{commentsByPost?.length}</strong>
                        </span>
                    </div>
                </div>
                <div className="flex items-center truncate border border-[#1618231f] text-sm text-[#161823bf] rounded-lg">
                    <input
                        className="flex-1 truncate px-3 py-1.5 pr-0 bg-[#1618230f] cursor-text"
                        disabled
                        value={pathName}
                    />
                    <button
                        className="border-l px-3 py-1.5 bg-[#1618230f] hover:bg-[#16182308] text-[#161823] font-semibold"
                        onClick={copyCode}
                    >
                        {btnText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentHeader;
