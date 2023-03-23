import React from "react";
import { IButton } from "@components/button";

export const Center: React.FC<IButton> = ({ className, children }) => {
    return <div className={`max-w-md mx-auto mt-8 ${className}`}>{children}</div>;
};
