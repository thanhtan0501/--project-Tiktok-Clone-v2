import { create } from "zustand";
import { UserType } from "../types/types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import useGetRandomUsers from "../hooks/useGetRandomUsers";

interface StoreTypes {
    isLogin: boolean;
    user: UserType;
    isLoginModal: boolean;
    isEditProfileModal: boolean;
    randomUsers: UserType[];
    setIsLoginModal: (val: boolean) => void;
    setIsEditProfileModal: (val: boolean) => void;
    setRandomUsers: () => void;
}
export const store = create<StoreTypes>()(
    devtools(
        persist(
            (set) => ({
                isLogin: false,
                user: {
                    id: "",
                    user_id: "",
                    user_name: "",
                    nick_name: "",
                    avatar: "",
                },
                isLoginModal: false,
                isEditProfileModal: false,
                randomUsers: [],
                setIsLoginModal: (val: boolean) => set({ isLoginModal: val }),
                setIsEditProfileModal: (val: boolean) =>
                    set({ isEditProfileModal: val }),
                setRandomUsers: async () => {
                    const result = await useGetRandomUsers();
                    set({ randomUsers: result });
                },
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
