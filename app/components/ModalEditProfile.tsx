"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import TextInput from "./TextInput";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { profileStore } from "../stores/profile";
import { store } from "../stores";
import { useUser } from "../context/user";
import useUpdateProfile from "../hooks/useUpdateProfile";
import useChangeUserImage from "../hooks/useChangeUserImage";
import useUpdateProfileImage from "../hooks/useUpdateProfileImage";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import { customUseOnClickOutside } from "../hooks/customUseOnClickOutside";
import Loading from "../loading";
interface CropperDimensions {
    height?: number | null;
    width?: number | null;
    left?: number | null;
    top?: number | null;
}
interface ShowErrorObject {
    type: string;
    message: string;
}

const ModalEditProfile = () => {
    const router = useRouter();
    const editModalRef = useRef<HTMLDivElement>(null);
    const contextUser = useUser();
    let { setIsEditProfileModal } = store();
    let { currentProfile, setCurrentProfile } = profileStore();

    const [file, setFile] = useState<File | null>(null);
    const [cropper, setCropper] = useState<CropperDimensions | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [userImage, setUserImage] = useState<string | "">("");
    const [userName, setUserName] = useState<string | "">("");
    const [nickName, setNickName] = useState<string | "">("");
    const [userBio, setUserBio] = useState<string | "">("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [error, setError] = useState<ShowErrorObject | null>(null);

    useEffect(() => {
        setNickName(currentProfile?.nick_name || "");
        setUserBio(currentProfile?.bio || "");
        setUserName(currentProfile?.user_name || "");
        setUserImage(currentProfile?.avatar || "");
    }, []);

    const validate = () => {
        setError(null);
        let isError = false;

        if (!userName) {
            setError({ type: "userName", message: "A username is required" });
            isError = true;
        } else if (!nickName) {
            setError({ type: "nickName", message: "A name is required" });
            isError = true;
        }
        return isError;
    };

    const handleUpdateUserInfo = async () => {
        let isError = validate();
        if (isError) return;
        if (!contextUser?.user) return;

        try {
            setIsUpdating(true);
            await useUpdateProfile(
                currentProfile?.id || "",
                userName,
                nickName,
                userBio
            );
            setCurrentProfile(contextUser?.user?.user_id);
            setIsEditProfileModal(false);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e?.target?.files && e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploadedImage(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setUploadedImage(null);
        }
    };

    const showError = (type: string) => {
        if (error && Object.entries(error).length > 0 && error.type === type) {
            return error.message;
        }
        return "";
    };
    const handleCropAndUploadImage = async () => {
        let isError = validate();
        if (isError) return;
        if (!contextUser?.user) return;

        try {
            if (!file) return alert("You have no file");
            if (!cropper) return alert("You have no file");
            setIsUpdating(true);

            const newImageId = await useChangeUserImage(
                file,
                cropper,
                userImage
            );
            await useUpdateProfileImage(currentProfile?.id || "", newImageId);

            await contextUser.checkUser();
            setCurrentProfile(contextUser?.user?.user_id);
            setUserImage(newImageId);
            setUploadedImage(null);
            setIsUpdating(false);
        } catch (error) {
            console.log(error);
            setIsUpdating(false);
            alert(error);
        }
    };

    if (!isUpdating) {
        customUseOnClickOutside(editModalRef, () =>
            setIsEditProfileModal(false)
        );
    }

    return (
        <div
            id="ModalEditProfile"
            className="fixed flex items-center justify-center px-5 md:px-0 z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto"
        >
            <div
                className={`relative bg-white w-full max-w-[700px] rounded-lg ${
                    !uploadedImage ? "" : "h-[580px]"
                }`}
                ref={editModalRef}
            >
                <div className="flex items-center justify-between w-full p-5 border-b border-[#16182333]">
                    <h1 className="text-[22px] font-semibold">Edit Profile</h1>
                    <button
                        className={`p-1 rounded-full ${
                            isUpdating ? "" : "hover:bg-gray-100"
                        } `}
                        disabled={isUpdating}
                        onClick={() => setIsEditProfileModal(false)}
                    >
                        <IoCloseOutline size={25} />
                    </button>
                </div>
                <div className={`px-6 py-4`}>
                    {!uploadedImage ? (
                        <div className="">
                            <div
                                id="ProfileAvatarSection"
                                className="flex flex-col border-b min-h-[130px] h-full py-2 w-full gap-2 relative"
                            >
                                <h3 className="font-semibold text-[15px] text-[#161823] w-[120px]">
                                    Profile Photo
                                </h3>
                                <div className="flex items-center justify-center md:absolute top-5 right-[50%] md:translate-x-1/2 ">
                                    <label
                                        htmlFor="image"
                                        className={`relative ${
                                            isUpdating
                                                ? "cursor-default"
                                                : "cursor-pointer"
                                        }`}
                                    >
                                        <div className="w-[95px] h-[95px] border rounded-full bg-gray-200 shadow-xl overflow-hidden">
                                            <img
                                                loading="lazy"
                                                className="rounded-full object-cover"
                                                width={95}
                                                src={useCreateBucketUrl(
                                                    userImage
                                                )}
                                            />
                                        </div>
                                        <button
                                            disabled={isUpdating}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                document
                                                    ?.getElementById("image")
                                                    ?.click();
                                            }}
                                            className={`absolute inline-block bottom-0 right-0 p-1.5 rounded-full border bg-white ${
                                                isUpdating
                                                    ? ""
                                                    : "hover:bg-gray-100"
                                            } shadow-xl`}
                                        >
                                            <CiEdit size={18} />
                                        </button>
                                    </label>
                                    <input
                                        // disabled={isUpdating}
                                        hidden
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleUploadImage}
                                    />
                                </div>
                            </div>
                            <div
                                id="UserNameSection"
                                className="flex flex-col md:flex-row py-4 w-full gap-2 md:gap-6 border-b"
                            >
                                <h3 className="font-semibold text-[15px] text-[#161823] w-[120px]">
                                    TikTok ID
                                </h3>
                                <div className="flex-1 items-center">
                                    <div className="md:w-[60%] w-full">
                                        <TextInput
                                            value={userName}
                                            placeholder="TikTok ID"
                                            onUpdate={setUserName}
                                            inputType="text"
                                            error={showError("userName")}
                                            setError={setError}
                                            disabled={isUpdating}
                                        />
                                        <div className="text-[10px] text-[#161823bf] leading-4 mt-4">
                                            Usernames can only contain letters,
                                            numbers, underscores, and periods.
                                            Changing your username will also
                                            change your profile link.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="NickNameSection"
                                className="flex flex-col md:flex-row py-4 w-full gap-2 md:gap-6 border-b"
                            >
                                <h3 className="font-semibold text-[15px] text-[#161823] w-[120px]">
                                    Name
                                </h3>
                                <div className="flex-1 items-center">
                                    <div className="md:w-[60%] w-full">
                                        <TextInput
                                            value={nickName}
                                            placeholder="Your Name"
                                            onUpdate={setNickName}
                                            inputType="text"
                                            error={showError("nickName")}
                                            setError={setError}
                                            disabled={isUpdating}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                id="BioSection"
                                className="flex flex-col md:flex-row pt-4 w-full gap-2 md:gap-6"
                            >
                                <h3 className="font-semibold text-[15px] text-[#161823] w-[120px]">
                                    Bio
                                </h3>
                                <div className="flex-1 items-center">
                                    <div className="md:w-[60%] w-full">
                                        <textarea
                                            cols={30}
                                            rows={4}
                                            onChange={(e) =>
                                                setUserBio(e.target.value)
                                            }
                                            disabled={isUpdating}
                                            placeholder="Your Bio"
                                            maxLength={80}
                                            className="resize-none w-full bg-[#f1f1f2] placeholder:text-gray-400 focus:border-[#16182333] border border-transparent rounded-md outline-none px-3 py-2"
                                            value={userBio || ""}
                                        ></textarea>
                                        <p className="text-[10px] text-[#161823bf]">
                                            {userBio ? userBio.length : 0}/80
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-h-[420px] mx-auto bg-black circle-stencil rounded-xl overflow-hidden">
                            <Cropper
                                stencilProps={{ aspectRatio: 1 }}
                                className="h-[400px]"
                                onChange={(cropper) =>
                                    setCropper(cropper.getCoordinates())
                                }
                                src={uploadedImage}
                            />
                        </div>
                    )}
                </div>
                <div
                    id="ButtonSection"
                    className="p-5 border-t border-[#16182333] w-full"
                >
                    {!uploadedImage ? (
                        <div
                            id="UploadButton"
                            className="flex items-center justify-end  gap-4"
                        >
                            <button
                                disabled={isUpdating}
                                onClick={() => setIsEditProfileModal(false)}
                                className={`flex items-center border w-[96px] justify-center rounded px-4 py-1.5 ${
                                    isUpdating ? "" : "hover:bg-[#f8f8f8]"
                                }`}
                            >
                                <span className="text-[15px] font-semibold">
                                    Cancel
                                </span>
                            </button>
                            <button
                                disabled={isUpdating}
                                onClick={() => handleUpdateUserInfo()}
                                className={`flex items-center border w-[96px] justify-center rounded px-4 py-1.5 text-white  ${
                                    isUpdating
                                        ? "bg-[#cb2e50]"
                                        : "bg-[#fe2c55] hover:bg-[#cb2e50]"
                                }`}
                            >
                                {isUpdating ? (
                                    <Loading size={22} color="#fff" />
                                ) : (
                                    <span className="text-[15px] font-semibold">
                                        Save
                                    </span>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div
                            id="CropperButton"
                            className="flex items-center justify-end  gap-4"
                        >
                            <button
                                disabled={isUpdating}
                                onClick={() => setUploadedImage(null)}
                                className={`flex items-center border w-[96px] justify-center rounded px-4 py-1.5 ${
                                    isUpdating ? "" : "hover:bg-[#f8f8f8]"
                                }`}
                            >
                                <span className="text-[15px] font-semibold">
                                    Cancel
                                </span>
                            </button>
                            <button
                                disabled={isUpdating}
                                onClick={() => handleCropAndUploadImage()}
                                className={`flex items-center border w-[96px] justify-center rounded px-4 py-1.5  text-white  ${
                                    isUpdating
                                        ? "bg-[#cb2e50]"
                                        : "hover:bg-[#cb2e50] bg-[#fe2c55]"
                                }`}
                            >
                                {isUpdating ? (
                                    <Loading size={22} color="#fff" />
                                ) : (
                                    <span className="text-[15px] font-semibold">
                                        Apply
                                    </span>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalEditProfile;
