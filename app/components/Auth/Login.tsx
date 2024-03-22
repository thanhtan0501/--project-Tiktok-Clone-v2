import React, { useState } from "react";
import TextInput from "../TextInput";
import { TbLoader2 } from "react-icons/tb";
import { useUser } from "@/app/context/user";
import { useRouter } from "next/navigation";
import { store } from "@/app/stores";

interface ShowErrorObject {
    type: string;
    message: string;
}

const Login = () => {
    const router = useRouter();
    const contextUser = useUser();
    const { setIsLoginModal } = store();

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | "">("");
    const [password, setPassword] = useState<string | "">("");
    const [error, setError] = useState<ShowErrorObject | null>(null);

    const showError = (type: string) => {
        if (error && Object.entries(error).length > 0 && error.type === type) {
            return error.message;
        }
        return "";
    };

    const validate = () => {
        setError(null);
        let isError = false;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!email) {
            setError({ type: "email", message: "An email is required" });
            isError = true;
        } else if (!reg.test(email)) {
            setError({ type: "email", message: "The email is not valid" });
            isError = true;
        } else if (!password) {
            setError({
                type: "password",
                message: "A password is required",
            });
            isError = true;
        }
        return isError;
    };
    const handleLogin = async () => {
        try {
            setLoading(true);
            const isError = validate();
            if (isError) {
                setLoading(false);
                return;
            }
            if (!contextUser) {
                setLoading(false);
                return;
            }
            await contextUser.login(email, password);
            setLoading(false);
            setIsLoginModal(false);
            router.refresh;
        } catch (error) {
            console.log(error);
            setLoading(false);
            alert(error);
        }
    };
    return (
        <div>
            <h1 className="text-center text-[28px] mb-4 font-bold">Log in</h1>
            <div className="px-6 py-2">
                <label htmlFor="email" className="text-sm font-semibold">
                    Email
                </label>
                <TextInput
                    id="email"
                    value={email}
                    placeholder="Enter your email..."
                    onUpdate={setEmail}
                    inputType="email"
                    error={showError("email")}
                    setError={setError}
                    autoFocus={true}
                    autoComplete="email"
                />
            </div>
            <div className="px-6 py-2">
                <label htmlFor="password" className="text-sm font-semibold">
                    Password
                </label>
                <TextInput
                    id="password"
                    value={password}
                    placeholder="Password"
                    onUpdate={setPassword}
                    inputType="password"
                    setError={setError}
                    error={showError("password")}
                />
            </div>
            <div className="px-6 py-2 mt-8">
                <button
                    disabled={(!password && !email) || loading}
                    onClick={() => handleLogin()}
                    className={`w-full rounded-md text-base font-semibold py-3    ${
                        password && email
                            ? "text-white bg-[#fe2c55] hover:bg-[#cb2e50] "
                            : "text-[#16182357] bg-[#1618230f]"
                    }`}
                >
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <TbLoader2
                                className=" animate-spin"
                                size={24}
                                color="#fff"
                            />
                        </div>
                    ) : (
                        "Log in"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Login;
