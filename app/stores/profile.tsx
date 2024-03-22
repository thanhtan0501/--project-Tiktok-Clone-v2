import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import useGetProfileById from "../hooks/useGetProfileById";
import { Profile } from "../types/types";

interface ProfileStore {
    currentProfile: Profile | null;
    setCurrentProfile: (user_id: string) => void;
}

export const profileStore = create<ProfileStore>()(
    devtools(
        persist(
            (set) => ({
                currentProfile: null,
                setCurrentProfile: async (user_id: string) => {
                    const result = await useGetProfileById(user_id);
                    set({ currentProfile: result });
                },
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
