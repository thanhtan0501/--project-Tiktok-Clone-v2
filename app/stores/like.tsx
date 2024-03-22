import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Like } from "../types/types";
import useGetLikePostById from "../hooks/useGetLikePostById";

interface LikeStore {
    likesByPost: Like[];
    setLikesByPost: (postId: string) => void;
}

export const likeStore = create<LikeStore>()(
    devtools(
        persist(
            (set) => ({
                likesByPost: [],

                setLikesByPost: async (postId: string) => {
                    const result = await useGetLikePostById(postId);
                    set({ likesByPost: result });
                },
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
