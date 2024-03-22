import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TextInput from "../TextInput";
import { TbLoader2 } from "react-icons/tb";
import { useUser } from "@/app/context/user";
import { store } from "@/app/stores";

interface ShowErrorObject {
    type: string;
    message: string;
}

const Register = () => {
    const router = useRouter();
    const contextUser = useUser();
    const { setIsLoginModal } = store();

    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string | "">("");
    const [email, setEmail] = useState<string | "">("");
    const [password, setPassword] = useState<string | "">("");
    const [confirmPassword, setConfirmPassword] = useState<string | "">("");
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

        if (!name) {
            setError({ type: "name", message: "A name is required" });
            isError = true;
        } else if (!email) {
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
        } else if (password.length < 8) {
            setError({
                type: "password",
                message: "The password needs to be longer",
            });
            isError = true;
        } else if (password != confirmPassword) {
            setError({
                type: "confirmPassword",
                message: "The passwords do not match",
            });
            isError = true;
        }
        return isError;
    };

    const handleRegister = async () => {
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
            await contextUser.register(name, email, password);
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
            <h1 className="text-center text-[28px] mb-4 font-bold">Register</h1>
            <div className="px-6 py-2">
                <label htmlFor="name" className="text-sm font-semibold">
                    Name
                </label>
                <TextInput
                    id="name"
                    value={name}
                    placeholder="Enter your name..."
                    onUpdate={setName}
                    inputType="text"
                    error={showError("name")}
                    setError={setError}
                    autoFocus={true}
                    autoComplete="name"
                />
            </div>
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
                    error={showError("password")}
                    setError={setError}
                />
            </div>
            <div className="px-6 py-2">
                <label
                    htmlFor="confirm_password"
                    className="text-sm font-semibold"
                >
                    Confirm password
                </label>
                <TextInput
                    id="confirm_password"
                    value={confirmPassword}
                    placeholder="Confirm password"
                    onUpdate={setConfirmPassword}
                    inputType="password"
                    error={showError("confirmPassword")}
                    setError={setError}
                />
            </div>
            <div className="px-6 py-2 mt-8">
                <button
                    disabled={
                        (!password && !email && !name && !confirmPassword) ||
                        loading
                    }
                    onClick={() => handleRegister()}
                    className={`w-full rounded-md text-base font-semibold py-3    ${
                        password && email && confirmPassword && name
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
                        <span>Register</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Register;
