import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { CommentWithProfile } from "../types/types";
import useGetCommentPostById from "../hooks/useGetCommentPostById";

interface CommentStore {
    commentsByPost: CommentWithProfile[];
    setCommentsByPost: (postId: string) => void;
}

export const commentStore = create<CommentStore>()(
    devtools(
        persist(
            (set) => ({
                commentsByPost: [],

                setCommentsByPost: async (postId: string) => {
                    const result = await useGetCommentPostById(postId);
                    set({ commentsByPost: result });
                },
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
