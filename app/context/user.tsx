"use client";

import { useRouter } from "next/navigation";
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { UserType, UserContextTypes } from "../types/types";
import { ID, account } from "@/libs/AppWriteClient";
import useGetProfileById from "../hooks/useGetProfileById";
import useCreateProfile from "../hooks/useCreateProfile";

const UserContext = createContext<UserContextTypes | null>(null);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState<UserType | null>(null);

    const checkUser = async () => {
        try {
            const currentSession = await account.getSession("current");

            if (!currentSession) return;

            const promise = (await account.get()) as any;
            const profile = await useGetProfileById(promise?.$id);

            setUser({
                id: promise?.$id,
                user_id: profile?.user_id,
                user_name: profile?.user_name,
                nick_name: profile?.nick_name,
                tick: profile?.tick,
                bio: profile?.bio,
                avatar: profile?.avatar,
            });
        } catch (error) {
            console.log(error);
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const register = async (name: string, email: string, password: string) => {
        try {
            const promise = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            const [user_name, domain] = email.split(/@(?=[^@]*$)/);

            await account.createEmailSession(email, password);
            await useCreateProfile(
                promise?.$id,
                name,
                user_name,
                String(
                    process.env.NEXT_PUBLIC_APP_WRITE_BUCKET_PLACEHOLDER_USER_ID
                ),
                ""
            );
            await checkUser();
        } catch (error) {
            throw error;
        }
    };
    const login = async (email: string, password: string) => {
        try {
            await account.createEmailSession(email, password);
            await checkUser();
        } catch (error) {
            throw error;
        }
    };
    const logout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            router.refresh();
        } catch (error) {
            throw error;
        }
    };

    return (
        <UserContext.Provider
            value={{ user, login, register, logout, checkUser }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
