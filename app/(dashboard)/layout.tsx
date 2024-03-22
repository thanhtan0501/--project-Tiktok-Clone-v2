"use client";
import React from "react";
import DefaultSidebar from "../components/DefaultSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`mx-auto w-full flex-1 flex px-0`}>
            <DefaultSidebar />
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default layout;
