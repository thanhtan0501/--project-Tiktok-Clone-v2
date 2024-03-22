"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { TbLoader2 } from "react-icons/tb";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";

interface PostUserProps {
    post: {
        id: string;
        user_id: string;
        video_url: string;
        text: string;
        created_at: string;
    };
}

const PostUser = ({ post }: PostUserProps) => {
    useEffect(() => {
        const video = document.getElementById(
            `video-${post?.id}`
        ) as HTMLVideoElement;

        const timeout = setTimeout(() => {
            video.addEventListener("mouseenter", () => {
                video.play();
            });
            video.addEventListener("mouseleave", () => {
                video.pause();
                video.currentTime = 0;
            });
        }, 50);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="relative brightness-95 hover:brightness-100 hover-btn cursor-pointer">
            {!post?.video_url ? (
                <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black">
                    <TbLoader2
                        className=" animate-spin"
                        size={30}
                        color="#fff"
                    />
                </div>
            ) : (
                <Link href={`/post/${post?.user_id}/${post?.id}`}>
                    <video
                        id={`video-${post?.id}`}
                        muted
                        loop
                        className=" aspect-[3/4] object-contain rounded-md bg-black bg-opacity-80"
                        src={useCreateBucketUrl(post?.video_url)}
                    />
                </Link>
            )}
            <div className="px-1 truncate">
                <span className="truncate pt-1 text-[15px] text-[#161823]">
                    {post?.text}
                </span>
            </div>
        </div>
    );
};

export default PostUser;
