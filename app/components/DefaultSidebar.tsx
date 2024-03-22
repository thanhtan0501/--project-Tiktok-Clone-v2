"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import MenuItem from "./MenuItem";
import { SideBarRoutes } from "../utils/routes";
import UserItem from "./UserItem";
import { store } from "../stores";
import { useUser } from "../context/user";

const DefaultSidebar = () => {
    const pathName = usePathname();

    let { randomUsers, setRandomUsers } = store();
    const contextUser = useUser();

    const suggestedUser = randomUsers?.filter(
        (user) => user.user_id !== contextUser?.user?.user_id
    );

    const newRoutes = SideBarRoutes.map((i: any) => {
        if (i.href === pathName) i.active = true;
        else i.active = false;
        return i;
    });

    useEffect(() => {
        setRandomUsers();
    }, []);

    return (
        <div
            id="DefaultSidebar"
            className={`w-[75px] h-[calc(100vh-60px)] overflow-hidden hover:overflow-y-auto hover-btn lg:w-[220px]`}
        >
            <div className="pt-5 pl-2 pb-6 h-full lg:border-transparent border-r">
                <div className="w-[55px] lg:w-full mb-2">
                    {newRoutes &&
                        newRoutes.length > 0 &&
                        newRoutes.map((item) => (
                            <MenuItem
                                key={item.label}
                                title={item.label}
                                to={item.href}
                                active={item.active}
                                icon={
                                    item.active
                                        ? item.activeIcon
                                        : item.nonActiveIcon
                                }
                            />
                        ))}
                </div>
                {suggestedUser && suggestedUser.length > 0 && (
                    <>
                        <div className="border-b mr-2" />
                        <div className="py-4 w-[55px] lg:w-full">
                            <h3 className="hidden lg:block text-xs text-[#161823bf] px-2 mb-2 font-semibold">
                                Suggested accounts
                            </h3>
                            <div>
                                {suggestedUser.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-center p-2 lg:pr-0 rounded hover:bg-[#16182308] hover-btn"
                                    >
                                        <UserItem data={user} sizeImg={30} />
                                    </div>
                                ))}

                                <button className="lg:block hidden text-[#fe2c55] mt-2 px-2 hover:underline text-[14px]">
                                    See all
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {/* {contextUser?.user?.user_id && (
                    <>
                        <div className="border-b mr-2" />
                        <div className="py-4 w-[55px] lg:w-full">
                            <h3 className="hidden lg:block text-xs text-[#161823bf] px-2 mb-2 font-semibold">
                                Following accounts
                            </h3>
                            <div>
                                {suggestedUser.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-center p-2 lg:pr-0 rounded hover:bg-[#16182308]"
                                    >
                                        <UserItem data={user} sizeImg={30} />
                                    </div>
                                ))}
                                <button className="lg:block hidden text-[#fe2c55] mt-2 px-2 hover:underline text-[14px]">
                                    See all
                                </button>
                            </div>
                        </div>
                    </>
                )} */}
                <div className="border-b mr-2" />
                <div className="lg:block hidden text-[11px] text-gray-500 pt-4">
                    <div className="pb-3 flex flex-wrap gap-1">
                        <a href="/" className="hover:underline">
                            About
                        </a>
                        <a href="/" className="hover:underline">
                            Contact
                        </a>
                        <a href="/" className="hover:underline">
                            Careers
                        </a>
                        <a href="/" className="hover:underline">
                            ByteDance
                        </a>
                    </div>
                    <div className="pb-3 flex flex-wrap gap-1">
                        <a href="/" className="hover:underline">
                            TikTok for Good
                        </a>
                        <a href="/" className="hover:underline">
                            Advertise
                        </a>
                        <a href="/" className="hover:underline">
                            TikTok LIVE Creator Networks
                        </a>
                        <a href="/" className="hover:underline">
                            Developers
                        </a>
                        <a href="/" className="hover:underline">
                            TikTok Rewards
                        </a>
                        <a href="/" className="hover:underline">
                            TikTok Embeds
                        </a>
                    </div>
                    <div className="pb-3 flex flex-wrap gap-1">
                        <a href="/" className="hover:underline">
                            Help
                        </a>
                        <a href="/" className="hover:underline">
                            Safety
                        </a>
                        <a href="/" className="hover:underline">
                            Terms Privacy
                        </a>
                        <a href="/" className="hover:underline">
                            Creator
                        </a>
                        <a href="/" className="hover:underline">
                            Portal Community
                        </a>
                        <a href="/" className="hover:underline">
                            Guidelines
                        </a>
                    </div>
                    <div className="pb-3 flex flex-wrap gap-1">
                        &copy; <span>{`${new Date().getFullYear()}`}</span>{" "}
                        TikTok
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultSidebar;
