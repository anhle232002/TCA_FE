import React, { InputHTMLAttributes } from "react";

interface Props extends Partial<InputHTMLAttributes<HTMLInputElement>> {}

export const SearchBar: React.FC<Props> = ({ placeholder, onChange, value }) => {
    return (
        <div className="bg-secondary-content text-accent px-3 py-2 rounded-md focus-within:ring-2">
            <input
                placeholder={placeholder}
                type="text"
                onChange={onChange}
                value={value}
                className="bg-transparent outline-none text-sm"
            />
        </div>
    );
};
