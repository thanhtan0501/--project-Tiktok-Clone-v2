import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import Home from "../(dashboard)/page";
import { RiGroupFill, RiGroupLine } from "react-icons/ri";
import { BsCameraVideo, BsCameraVideoFill } from "react-icons/bs";

export const SideBarRoutes = [
    {
        href: "/",
        label: "For you",
        renderer: <Home />,
        active: false,
        activeIcon: <AiFillHome color="#fe2c55" size={22} />,
        nonActiveIcon: <AiOutlineHome size={22} />,
    },
    {
        href: "/following",
        label: "Following",
        renderer: <Home />,
        active: false,
        activeIcon: <RiGroupFill color="#fe2c55" size={22} />,
        nonActiveIcon: <RiGroupLine size={22} />,
    },
    {
        href: "/live",
        label: "LIVE",
        renderer: <Home />,
        active: false,
        activeIcon: <BsCameraVideoFill color="#fe2c55" size={22} />,
        nonActiveIcon: <BsCameraVideo size={22} />,
    },
];
