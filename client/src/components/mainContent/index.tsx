import React from "react";

export const MainContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...rest
}) => {
    return (
        <div className={`flex-1 container my-8 max-w-full mx-auto p-5 ${className}`} {...rest}>
            {children}
        </div>
    );
};
