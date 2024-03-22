"use client";

import CommentHeader from "@/app/components/CommentHeader";
import Comments from "@/app/components/Comments";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { commentStore } from "@/app/stores/comment";
import { likeStore } from "@/app/stores/like";
import { postStore } from "@/app/stores/post";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoChevronDown, IoChevronUp, IoCloseOutline } from "react-icons/io5";

interface PostProps {
    params: { postId: string; userId: string };
}

const Post = ({ params }: PostProps) => {
    const router = useRouter();
    let { postById, setPostById, postsByUser, setPostsByUser } = postStore();

    let { setLikesByPost } = likeStore();
    let { setCommentsByPost } = commentStore();

    useEffect(() => {
        setPostById(params?.postId);
        setPostsByUser(params?.userId);
    }, []);

    const handleClickPostUp = () => {
        postsByUser.forEach((post) => {
            if (post.id > params.postId) {
                router.push(`/post/${params.userId}/${post.id}`);
            }
        });
    };
    const handleClickPostDown = () => {
        postsByUser.forEach((post) => {
            if (post.id < params.postId) {
                router.push(`/post/${params.userId}/${post.id}`);
            }
        });
    };
    return (
        <div
            id="PostPage"
            className="absolute top-0 left-0 z-50 lg:flex justify-between w-full h-screen bg-black overflow-auto hide-scrollbar lg:overflow-hidden"
        >
            <div className="lg:w-[calc(100%-540px)] h-full relative">
                <button
                    onClick={() => router.back()}
                    className="absolute top-0 left-0 m-5 z-20 text-white rounded-full bg-[#54545480] p-1.5 hover:bg-[#25252599]"
                >
                    <IoCloseOutline size={27} />
                </button>
                <div className="">
                    <button
                        onClick={() => handleClickPostUp()}
                        className="absolute top-4 right-4 z-20 flex items-center justify-center rounded-full bg-[#54545480] p-1.5 hover:bg-[#25252599]"
                    >
                        <IoChevronUp size={27} color="#fff" />
                    </button>
                    <button
                        onClick={() => handleClickPostDown()}
                        className="absolute top-20 right-4 z-20 flex items-center justify-center rounded-full bg-[#54545480] p-1.5 hover:bg-[#25252599]"
                    >
                        <IoChevronDown size={27} color="#fff" />
                    </button>
                </div>
                <div className="">
                    {postById?.video_url ? (
                        <video
                            className="fixed z-[0] object-cover lg:w-[calc(100%-540px)] my-auto h-screen blur"
                            src={useCreateBucketUrl(postById?.video_url)}
                        />
                    ) : null}
                    <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
                        {postById?.video_url ? (
                            <video
                                autoPlay
                                controls
                                loop
                                muted
                                className="h-screen mx-auto"
                                src={useCreateBucketUrl(postById?.video_url)}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
            <div
                id="InfoSection"
                className="lg:max-w-[540px] relative w-full h-full bg-white"
            >
                <div className="py-7 px-6">
                    <CommentHeader post={postById} params={params} />
                </div>
                <Comments params={params} />
            </div>
        </div>
    );
};

export default Post;
