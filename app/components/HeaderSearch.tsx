import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import UserItem from "./UserItem";
import { UserType } from "../types/types";
import useSearchByName from "../hooks/useSearchByName";
import useDebounce from "../hooks/useDebounce";
import { customUseOnClickOutside } from "../hooks/customUseOnClickOutside";

const HeaderSearch = () => {
    const searchRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [searchValue, setSearchValue] = useState<string | "">("");

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [searchProfiles, setSearchProfiles] = useState<UserType[]>([]);

    const debouncedValue = useDebounce(searchValue, 400);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchProfiles([]);
            return;
        }
        setIsLoading(true);
        handleSearch();
    }, [debouncedValue]);

    const handleChange = (e: { target: { value: string } }) => {
        if (e.target.value[0] !== " ") {
            setSearchValue(e.target.value);
        }
    };

    const handleSearch = async () => {
        try {
            const result = await useSearchByName(debouncedValue);
            if (result) return setSearchProfiles(result);
            setIsLoading(false);
            setSearchProfiles([]);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setSearchProfiles([]);
            alert(error);
        }
    };

    customUseOnClickOutside(searchRef, () => setShowPopup(false));
    return (
        <>
            <div
                ref={searchRef}
                className="relative hidden md:flex items-center justify-end bg-[#f1f1f2] rounded-full max-w-[430px] w-full"
            >
                <input
                    type="text"
                    onChange={handleChange}
                    onFocus={() => setShowPopup(true)}
                    className="w-full pl-5 my-2 bg-transparent py-1 pr-3 placeholder-[#838383] text-[15px] focus:outline-none"
                    placeholder="Search accounts..."
                    value={searchValue}
                />
                {showPopup && searchProfiles && searchProfiles.length > 0 && (
                    <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-0 rounded-xl  overflow-hidden">
                        <div className="pt-2">
                            {searchProfiles.map((item) => (
                                <div
                                    key={item.id}
                                    className="w-full flex items-center p-2 px-3 hover:bg-[#16182308] cursor-pointer hover-btn"
                                    onClick={() => {
                                        setShowPopup(false);
                                        setSearchValue("");
                                    }}
                                >
                                    <UserItem data={item} type="search" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <span className=" w-[0.5px] h-[30px] bg-gray-300"></span>
                <button
                    className="flex items-center justify-center h-full p-3 hover:bg-[#16182308] rounded-tr-full rounded-br-full "
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <BiSearch color="#a1a2a7" size="22" />
                </button>
            </div>
        </>
    );
};

export default HeaderSearch;
