"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import ButtonActionItem from "./ButtonActionItem";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import { PostWithProfile } from "../types/types";

interface PostItemProps {
    data: PostWithProfile;
}

const PostItem = ({ data }: PostItemProps) => {
    useEffect(() => {
        const video = document.getElementById(
            `video-${data?.id}`
        ) as HTMLVideoElement;

        const postElement = document.getElementById(`post-${data?.id}`);

        if (postElement) {
            let observer = new IntersectionObserver(
                (entries) => {
                    entries[0].isIntersecting ? video?.play() : video?.pause();
                },
                { threshold: [0.6] }
            );

            observer.observe(postElement);
        }
    }, []);

    return (
        <div
            id={`post-${data.id}`}
            className="flex flex-col border-b py-6 w-full"
        >
            <div className="w-full flex justify-between items-center">
                <Link
                    href={`/profile/${data?.user_id}`}
                    className="cursor-pointer"
                >
                    <div className="group/profile flex items-center w-full">
                        <img
                            loading="lazy"
                            className="rounded-full max-h-[60px] object-cover"
                            width={50}
                            src={useCreateBucketUrl(data?.profile?.avatar)}
                        />
                        <div
                            className={`ml-2.5 flex items-start gap-1 flex-wrap flex-col`}
                        >
                            <div className="text-base leading-[21px] flex items-center gap-2 font-semibold ">
                                <span className="truncate line-clamp-1 group-hover/profile:underline">
                                    {data?.profile?.user_name}
                                </span>
                                {data?.profile?.tick && (
                                    <FaCheckCircle color="#20D5EC" />
                                )}
                            </div>
                            <span className="text-[#16182380] text-sm leading-[18px] truncate line-clamp-1">
                                {data?.profile?.nick_name}
                            </span>
                        </div>
                    </div>
                </Link>
                <button className="border bg-transparent font-semibold block text-[15px] px-4 py-1 rounded border-[#fe2c55] text-[#fe2c55] hover:bg-[#ffeef2]">
                    Follow
                </button>
            </div>
            <div className="max-w-[calc(100%-130px)] flex flex-col justify-center mx-auto w-full">
                <div className="">
                    <span className="text-[16px] break-words">{data.text}</span>
                    {!true && (
                        <span className="ml-1 text-[16px] text-[#2b5db9] break-words">
                            #hashtag
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 mb-2 mt-1 ml-1">
                    <BsMusicNoteBeamed size={14} />
                    <span className="text-[13px] break-words">
                        Evergreen - music
                    </span>
                </div>
                <div className="flex gap-4 items-end">
                    <Link
                        href={`/post/${data?.user_id}/${data?.id}`}
                        className="sm:min-h-[480px] min-h-[300px] max-h-[580px] max-w-[260px] bg-black flex items-center rounded-xl cursor-pointer"
                    >
                        <video
                            id={`video-${data.id}`}
                            loop
                            controls
                            muted
                            className="object-cover mx-auto h-full"
                            src={useCreateBucketUrl(data?.video_url)}
                        />
                    </Link>
                    <ButtonActionItem data={data} />
                </div>
            </div>
        </div>
    );
};

export default PostItem;
