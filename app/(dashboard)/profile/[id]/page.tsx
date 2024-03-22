"use client";

import ModalEditProfile from "@/app/components/ModalEditProfile";
import PostUser from "@/app/components/PostUser";
import { useUser } from "@/app/context/user";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { store } from "@/app/stores";
import { postStore } from "@/app/stores/post";
import { profileStore } from "@/app/stores/profile";
import React, { useEffect } from "react";
import { TbEdit } from "react-icons/tb";

interface ProfileProps {
    params: { id: string };
}

const Profile = ({ params }: ProfileProps) => {
    const { isEditProfileModal, setIsEditProfileModal } = store();
    let { currentProfile, setCurrentProfile } = profileStore();
    let { postsByUser, setPostsByUser } = postStore();

    const contextUser = useUser();

    useEffect(() => {
        setCurrentProfile(params?.id);
        setPostsByUser(params?.id);
    }, []);

    return (
        <>
            <div className="w-full h-[calc(100%-60px)] overflow-auto flex-1 max-w-full ">
                <div className="pt-8 px-4 sm:px-6 pb-9 lg:w-[calc(100%-80px)] w-full lg:mx-auto">
                    <div className="flex flex-col gap-6">
                        <div className="max-w-[624px] min-h-[140px] relative flex flex-col">
                            <div className="flex gap-5 flex-wrap md:mr-[90px]">
                                {currentProfile && currentProfile?.avatar ? (
                                    <img
                                        loading="lazy"
                                        src={useCreateBucketUrl(
                                            currentProfile.avatar
                                        )}
                                        className="md:w-[120px] md:h-[120px]
                                        w-[80px] h-[80px] rounded-full bg-gray-100 shadow"
                                    />
                                ) : (
                                    <div
                                        className="md:w-[120px] md:h-[120px]
                                    w-[80px] h-[80px] rounded-full bg-gray-100"
                                    />
                                )}
                                <div className="flex flex-col min-w-[200px] flex-1 truncate justify-between">
                                    <h1 className="text-[30px] font-bold truncate">
                                        {currentProfile?.user_name || ""}
                                    </h1>
                                    <h2 className="text-[17px] font-semibold truncate">
                                        {currentProfile?.nick_name}
                                    </h2>
                                    {contextUser?.user?.user_id ===
                                    currentProfile?.user_id ? (
                                        <button
                                            className="mt-4 flex items-center justify-center gap-1 rounded-md px-4 py-1.5 text-[15px] font-semibold hover:bg-[#fe2c550f] w-max border"
                                            onClick={() =>
                                                setIsEditProfileModal(true)
                                            }
                                        >
                                            <TbEdit size={20} />
                                            <span>Edit Profile</span>
                                        </button>
                                    ) : (
                                        <button className="mt-4 flex items-center justify-center gap-1 rounded-md px-4 py-1.5 text-[15px] text-white font-semibold hover:bg-[#cb2e50] bg-[#fe2c55] w-max min-w-[150px]">
                                            Follow
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mt-[22px]">
                                <div className="flex items-center flex-row gap-1.5">
                                    <strong>
                                        <span>{0}</span>
                                    </strong>
                                    <span className="text-[15px] font-light text-[#161823bf]">
                                        Following
                                    </span>
                                </div>
                                <div className="flex items-center flex-row gap-1.5">
                                    <strong>
                                        <span>{0}</span>
                                    </strong>
                                    <span className="text-[15px] font-light text-[#161823bf]">
                                        Follower
                                    </span>
                                </div>
                                <div className="flex items-center flex-row gap-1.5">
                                    <strong>
                                        <span>{0}</span>
                                    </strong>
                                    <span className="text-[15px] font-light text-[#161823bf]">
                                        Likes
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="">{currentProfile?.bio}</span>
                            </div>

                            {/* Share Profile User*/}
                            {/* <div className="absolute right-0 top-[10px] flex flex-row items-center justify-between gap-4">
                                <button className="p-1">
                                    <PiShareFatLight size={25} />
                                </button>
                            </div> */}
                        </div>
                        <div className="flex flex-1 flex-col relative items-start justify-start min-h-[490px]">
                            <div className="w-full flex items-center border-b">
                                <div className="text-center py-2 px-8 text-[17px] font-semibold border-b-2 border-b-black">
                                    <span>Videos</span>
                                </div>
                                <div className="text-center py-2 px-8 text-[17px] font-semibold text-[#73747b]">
                                    <span>Likes</span>
                                </div>
                            </div>
                            <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-6 gap-y-4">
                                {postsByUser && postsByUser.length > 0
                                    ? postsByUser?.map((post) => (
                                          <PostUser key={post.id} post={post} />
                                      ))
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isEditProfileModal ? <ModalEditProfile /> : null}
        </>
    );
};

export default Profile;
