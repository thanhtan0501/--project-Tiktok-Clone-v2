import React from "react";
import { TbLoader2 } from "react-icons/tb";

interface LoadingProps {
    className?: string;
    size?: string | number;
    color?: string;
}

const Loading = ({ className = "", size, color = "#fff" }: LoadingProps) => {
    return (
        <div
            className={`flex h-full w-full items-center justify-center ${className}`}
        >
            <TbLoader2 className={`animate-spin`} size={size} color={color} />
        </div>
    );
};

export default Loading;
