/*eslint-disable */ // use for any in interface
import React from "react";

interface InputProps {
    className?: string;
    onChange: any;
    typeInput: string;
    index?: number;
}

/*eslint-enable */ // use for any in interface

export const Input: React.FC<InputProps> = ({
    className = "",
    typeInput = "",
    onChange,
    index,
}) => {
    return (
        <input
            className={`m-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
            type={typeInput}
            onChange={(e) =>
                index !== undefined ? onChange(index, e.target.value) : onChange(e.target.value)
            }
        />
    );
};
