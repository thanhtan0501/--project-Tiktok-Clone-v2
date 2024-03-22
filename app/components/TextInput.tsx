import React from "react";

interface ShowErrorObject {
    type: string;
    message: string;
}

interface TextInputProps {
    id?: string;
    value: string;
    placeholder: string;
    onUpdate: (newValue: string) => void;
    inputType: string;
    error: string;
    setError: (value: ShowErrorObject | null) => void;
    autoFocus?: boolean;
    disabled?: boolean;
    autoComplete?: string;
}

const TextInput = ({
    id = "",
    value,
    placeholder,
    onUpdate,
    inputType,
    error,
    setError,
    autoFocus = false,
    autoComplete = "off",
    disabled = false,
}: TextInputProps) => {
    return (
        <>
            <input
                disabled={disabled}
                id={id}
                placeholder={placeholder}
                className={`block overflow-hidden w-full bg-[#f1f1f2] placeholder:text-gray-400 focus:border-[#16182333] border  rounded-md outline-none px-3 py-2 ${
                    error
                        ? "border-[#ff4c3a] text-[#ff4c3a]"
                        : "border-transparent text-black"
                }`}
                value={value || ""}
                onChange={(e) => onUpdate(e.target.value)}
                type={inputType}
                autoComplete={autoComplete}
                onFocus={() => {
                    if (error) {
                        setError(null);
                    }
                }}
                autoFocus={autoFocus}
            />
            {error ? (
                <div className="text-[#ff4c3a] text-[12px] font-semibold mt-1">
                    <span>{error}</span>
                </div>
            ) : null}
        </>
    );
};

export default TextInput;
