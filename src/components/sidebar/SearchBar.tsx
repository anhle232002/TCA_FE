import React from "react";

interface Props extends Partial<HTMLInputElement> {}

export const SearchBar: React.FC<Props> = ({ placeholder }) => {
    return (
        <div className="bg-secondary-content text-accent px-3 py-2 rounded-md focus-within:ring-2">
            <input
                placeholder={placeholder}
                type="text"
                className="bg-transparent outline-none text-sm "
            />
        </div>
    );
};
