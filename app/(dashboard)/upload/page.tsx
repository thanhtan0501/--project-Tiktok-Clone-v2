"use client";

import { useUser } from "@/app/context/user";
import useCreatePost from "@/app/hooks/useCreatePost";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";
import { GoCheckCircle } from "react-icons/go";

interface UploadError {
    type: string;
    message: string;
}

const Upload = () => {
    const contextUser = useUser();
    const router = useRouter();

    const [fileDisplay, setFileDisplay] = useState<string>("");
    const [caption, setCaption] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<UploadError | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
        if (!contextUser?.user) router.push("/");
    }, [contextUser]);

    const handleUploadVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setFileDisplay(fileUrl);
            setFile(file);
            setCaption(file.name);
        }
    };

    const handleClearVideo = () => {
        setFileDisplay("");
        setFile(null);
    };
    const handleDiscard = () => {
        setCaption("");
        handleClearVideo();
    };
    const validate = () => {
        setError(null);
        let isError = false;

        if (!file) {
            setError({ type: "File", message: "A video is required" });
            isError = true;
        } else if (!caption) {
            setError({ type: "caption", message: "A caption is required" });
            isError = true;
        }
        return isError;
    };
    const handleSubmit = async () => {
        let isError = validate();
        if (isError) return;
        if (!file || !contextUser?.user) return;
        setIsUploading(true);
        try {
            await useCreatePost(file, contextUser?.user?.user_id, caption);
            router.push(`/profile/${contextUser?.user?.user_id}`);
            setIsUploading(false);
        } catch (error) {
            console.log(error);
            setIsUploading(false);
            alert(error);
        }
    };

    return (
        <div className="h-[calc(100%-60px)] bg-[#f8f8f8] w-full overflow-y-auto">
            <div className="mx-auto w-[90%] py-4 flex flex-col gap-4">
                <div className="w-full bg-white shadow-lg rounded-lg p-4">
                    <div>
                        <h1 className="text-[16px] font-semibold">
                            Upload video
                        </h1>
                        <span className="text-[#16182380] text-[14px]">
                            Post a video to your account.
                        </span>
                    </div>
                </div>
                <div className="w-full bg-white shadow-lg rounded-lg px-10 pt-5 pb-10">
                    {!fileDisplay ? (
                        <label
                            htmlFor="fileInput"
                            className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full h-[470px]  text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-[#16182308] cursor-pointer hover-btn"
                        >
                            <FaCloudArrowUp color="#ababaf" size="40" />
                            <h1 className="mt-6 text-[24px] font-semibold">
                                Select video to upload
                            </h1>
                            <span className="mt-1 mb-6 text-[14px] text-[#161823bf]">
                                Drag and drop files
                            </span>
                            <span className="mb-1.5 text-[13px] text-[#73747b]">
                                MP4 or WebM
                            </span>
                            <span className="mb-1.5 text-[13px] text-[#fe2c55]">
                                Up to 10 minutes
                            </span>
                            <span className="mb-1.5 text-[13px] text-[#73747b]">
                                Less than 50 MB
                            </span>
                            <label
                                htmlFor="fileInput"
                                className="max-w-[400px] w-full mt-8 bg-[#fe2c55] text-white rounded py-2 hover:bg-[#ea284e] cursor-pointer hover-btn"
                            >
                                Select file
                            </label>

                            <input
                                type="file"
                                id="fileInput"
                                accept="video/*"
                                hidden
                                onChange={(e) => handleUploadVideo(e)}
                            />
                        </label>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full h-[540px] max-w-[260px] p-3 rounded-2xl cursor-pointer relative">
                                {isUploading ? (
                                    <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                                        <div className="mx-auto flex items-center justify-center gap-1 flex-wrap">
                                            <Loading size={30} color="#fff" />
                                            <div className="text-white font-bold">
                                                Uploading...
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                <img
                                    className="absolute z-20 pointer-events-none"
                                    src="/images/mobile-case.png "
                                />
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    src={fileDisplay}
                                    className=" absolute rounded-[50px] object-contain z-10 p-[13px] w-full h-full bg-black bg-opacity-80"
                                />
                                <div
                                    className={`absolute -bottom-12 flex items-center z-50 rounded-xl border w-full p-1 border-gray-300 ${
                                        isUploading ? "cursor-default" : ""
                                    }`}
                                >
                                    <div className="flex items-center truncate gap-1">
                                        <GoCheckCircle
                                            size={16}
                                            className="min-w-[16px]"
                                        />
                                        <span className="text-[11px] truncate">
                                            {file ? file.name : ""}
                                        </span>
                                    </div>
                                    <button
                                        disabled={isUploading}
                                        className={`text-[11px] ml-2 font-semibold py-1 px-1.5 rounded-lg ${
                                            !isUploading
                                                ? "hover:bg-gray-200"
                                                : ""
                                        }`}
                                        onClick={() => handleClearVideo()}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 mb-6 flex-1">
                                <div className="">
                                    <div className=" flex items-center justify-between">
                                        <div className="text-[15px] font-semibold">
                                            Caption
                                        </div>
                                        <div className="text-[12px] text-gray-400">
                                            {caption.length}/150
                                        </div>
                                    </div>
                                    <input
                                        maxLength={150}
                                        type="text"
                                        className="w-full border p-2.5 rounded-md focus:outline-none mt-1"
                                        value={caption}
                                        onChange={(e) =>
                                            setCaption(e.target.value)
                                        }
                                        disabled={isUploading}
                                    />
                                </div>
                                <div className="flex gap-3 mt-8">
                                    <button
                                        disabled={isUploading}
                                        onClick={() => handleDiscard()}
                                        className={`max-w-[130px] w-full p-3 border text-[16px] font-semibold ${
                                            !isUploading
                                                ? "hover:bg-gray-100"
                                                : ""
                                        } bg-transparent rounded flex items-center justify-center`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={isUploading}
                                        onClick={() => handleSubmit()}
                                        className={`max-w-[130px] w-full p-3 border rounded flex items-center justify-center ${
                                            !isUploading
                                                ? "hover:bg-[#cb2e50] bg-[#fe2c55]"
                                                : "bg-[#cb2e50]"
                                        }`}
                                    >
                                        {isUploading ? (
                                            <Loading size={24} color="#fff" />
                                        ) : (
                                            <span className="text-[16px] text-white font-semibold">
                                                Submit
                                            </span>
                                        )}
                                    </button>
                                </div>
                                {error && (
                                    <div className="text-red-600 mt-4">
                                        {error.message}
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

export default Upload;
