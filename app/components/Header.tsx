"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import HeaderSearch from "./HeaderSearch";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useUser } from "../context/user";
import { store } from "../stores";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import { customUseOnClickOutside } from "../hooks/customUseOnClickOutside";

const Header = () => {
    const contextUser = useUser();
    const router = useRouter();
    const pathName = usePathname();
    const profileRef = useRef<HTMLDivElement>(null);

    const [showMenu, setShowMenu] = useState<boolean>(false);
    let { setIsLoginModal, setIsEditProfileModal } = store();

    useEffect(() => {
        setIsEditProfileModal(false);
    }, []);

    const handleGoTo = () => {
        if (!contextUser?.user) return setIsLoginModal(true);
        router.push("/upload");
    };
    const handleLogout = async () => {
        if (contextUser?.user) {
            setShowMenu(false);
            await contextUser.logout();
            router.refresh();
        }
    };

    customUseOnClickOutside(profileRef, () => setShowMenu(false));

    return (
        <div
            id="Header"
            className="sticky inset-0 bg-white z-30 flex items-center w-full border-b h-[60px]"
        >
            <div
                className={`flex items-center justify-between gap-6 w-full px-4 mx-auto`}
            >
                <Link href="/" className="min-w-[120px]">
                    <img
                        loading="lazy"
                        src="/images/logo.svg"
                        className="w-full"
                        width={120}
                        alt="Tiktok"
                    />
                </Link>
                <HeaderSearch />
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleGoTo}
                        className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-gray-100"
                    >
                        <AiOutlinePlus color="black" size="22" />
                        <span className="font-medium text-[15px] hidden sm:block">
                            Upload
                        </span>
                    </button>
                    {!contextUser?.user?.user_id ? (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsLoginModal(true)}
                                className="flex items-center text-white border rounded-md px-3 py-2 bg-[#fe2c55] hover:bg-[#cb2e50]"
                            >
                                <span className="whitespace-nowrap mx-4 font-medium text-[15px]">
                                    Log in
                                </span>
                            </button>
                            <button className="p-[9px] flex items-center hover:bg-gray-200 rounded-md ">
                                <BsThreeDotsVertical
                                    color="#161724"
                                    size="20"
                                />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center " ref={profileRef}>
                            <div className="relative">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className={`mt-1 border-2 rounded-full ${
                                        showMenu
                                            ? "border-black"
                                            : " border-transparent"
                                    }`}
                                >
                                    <img
                                        loading="lazy"
                                        className="w-[32px] h-[32px] rounded-full object-cover cursor-pointer shadow"
                                        src={useCreateBucketUrl(
                                            contextUser?.user?.avatar
                                        )}
                                    />
                                </button>
                                {showMenu && (
                                    <div className="absolute bg-white rounded-lg border w-[250px] py-2 shadow-2xl top-[45px] right-0">
                                        <Link
                                            href={`/profile/${contextUser?.user?.user_id}`}
                                        >
                                            <button
                                                onClick={() => {
                                                    setShowMenu(false);
                                                }}
                                                className="flex items-center w-full justify-start py-[10px] px-4 hover:bg-[#16182308] cursor-pointer"
                                            >
                                                <BiUser size="20" />
                                                <span className="pl-2 font-semibold text-sm">
                                                    Profile
                                                </span>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex border-t border-t-gray-200 items-center w-full justify-start py-[10px] px-4 hover:bg-[#16182308] cursor-pointer"
                                        >
                                            <FiLogOut size="20" />
                                            <span className="pl-2 font-semibold text-sm">
                                                Log out
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
