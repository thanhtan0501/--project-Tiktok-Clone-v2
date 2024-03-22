import Link from "next/link";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { UserType } from "../types/types";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";

interface UserItemProps {
    data: UserType;
    type?: string;
    sizeImg?: number | string;
}

const UserItem = ({ data, type = "default", sizeImg = 40 }: UserItemProps) => {
    return (
        <Link
            href={`/profile/${data?.user_id}`}
            className={`flex items-center justify-between w-auto lg:w-full cursor-pointer truncate line-clamp-1 `}
        >
            <div className="flex items-center">
                <img
                    loading="lazy"
                    className="rounded-full"
                    width={sizeImg}
                    src={useCreateBucketUrl(data?.avatar)}
                />
                <div
                    className={`flex-1 md:ml-2.5 ${
                        type === "default" ? "hidden lg:block " : ""
                    }`}
                >
                    <div className="text-sm flex items-center gap-2 font-semibold ">
                        <span className="truncate leading-[18px] line-clamp-1">
                            {data.user_name}
                        </span>
                        {data.tick && <FaCheckCircle color="#20D5EC" />}
                    </div>
                    <span className="text-[#16182380] mt-1 text-sm leading-[18px] truncate line-clamp-1">
                        {data.nick_name}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default UserItem;
