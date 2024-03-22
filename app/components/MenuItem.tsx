import Link from "next/link";
import React, { ReactElement } from "react";

interface MenuItemProps {
    title: string;
    to: string;
    icon: ReactElement;
    active: boolean;
}

const MenuItem = ({ title, to, icon, active }: MenuItemProps) => {
    return (
        <div className="w-full flex items-center justify-center lg:justify-start p-2 rounded hover:bg-[#16182308] hover-btn">
            <Link href={to} className="flex items-center gap-2">
                {icon}
                <span
                    className={`font-semibold text-[18px] lg:block hidden ${
                        active ? "text-[#fe2c55]" : ""
                    }`}
                >
                    {title}
                </span>
            </Link>
        </div>
    );
};

export default MenuItem;
