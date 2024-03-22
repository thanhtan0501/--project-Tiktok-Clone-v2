"use client";

import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import { postStore } from "../stores/post";
import Loading from "../loading";

export default function Home() {
    let { allPosts, setAllPosts } = postStore();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setAllPosts();
        setLoading(false);
    }, []);
    if (loading)
        return (
            <div>
                <Loading color="#333" size={30} className="mt-6 " />
            </div>
        );

    return (
        <div className="w-full h-[calc(100vh-60px)] overflow-y-auto">
            <div className="relative mx-auto max-w-[690px] w-[calc(100%-40px)] min-w-[370px] flex items-center justify-center flex-col mb-10 px-2 sm:px-0">
                {allPosts && allPosts.length > 0 ? (
                    allPosts.map((post) => (
                        <PostItem key={post.id} data={post} />
                    ))
                ) : (
                    <div className="mt-6 font-semibold text-base">
                        No videos...
                    </div>
                )}
            </div>
        </div>
    );
}
