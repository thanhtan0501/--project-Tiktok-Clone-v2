"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Register from "./Register";
import Login from "./Login";
import { store } from "@/app/stores";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const Auth = () => {
    const authRef = useRef<HTMLDivElement>(null);
    let { setIsLoginModal, isLoginModal } = store();
    const [isRegister, setIsRegister] = useState<boolean>(false);

    const handleCloseModal = () => {
        setIsRegister(false);
        setIsLoginModal(false);
    };

    useOnClickOutside(authRef, () => setIsLoginModal(false));

    return (
        <>
            {isLoginModal ? (
                <div className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50">
                    <div
                        className="relative bg-white w-full max-w-[470px]  p-4 rounded-lg"
                        ref={authRef}
                    >
                        <div className="w-full flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="p-1.5 rounded-full hover:bg-gray-100"
                            >
                                <IoCloseOutline size={25} />
                            </button>
                        </div>
                        {isRegister ? <Register /> : <Login />}
                        <div className="flex items-center justify-center pt-5 pb-1 mt-4 border-t w-full">
                            <span className="text-[14px] text-gray-600">
                                {!isRegister
                                    ? "Don’t have an account?"
                                    : "Already have an account?"}
                            </span>

                            <button
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-[14px] text-[#F02C56] font-semibold pl-1"
                            >
                                <span>
                                    {!isRegister ? "Register" : "Log in"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Auth;
