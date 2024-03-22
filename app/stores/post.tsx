import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Post, PostWithProfile } from "../types/types";
import useGetPostByUser from "../hooks/useGetPostByUser";
import useGetAllPost from "../hooks/useGetAllPost";
import useGetPostById from "../hooks/useGetPostById";

interface PostStore {
    allPosts: PostWithProfile[];
    postsByUser: Post[];
    postById: PostWithProfile | null;
    setAllPosts: () => void;
    setPostsByUser: (user_id: string) => void;
    setPostById: (post_id: string) => void;
}

export const postStore = create<PostStore>()(
    devtools(
        persist(
            (set) => ({
                allPosts: [],
                postsByUser: [],
                postById: null,

                setAllPosts: async () => {
                    const result = await useGetAllPost();
                    set({ allPosts: result });
                },
                setPostsByUser: async (user_id: string) => {
                    const result = await useGetPostByUser(user_id);
                    set({ postsByUser: result });
                },
                setPostById: async (post_id: string) => {
                    const result = await useGetPostById(post_id);
                    set({ postById: result });
                },
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
