// components/withAuth.tsx
import React, { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

export const withAuth = <P extends Record<string, unknown>>(
    WrappedComponent: ComponentType<P>,
): React.FC<P> => {
    return (props: JSX.IntrinsicAttributes & P & { children?: React.ReactNode }) => {
        const router = useRouter();
        const user = useSelector((state: RootState) => state.storeUser);
        const isAuthenticated = () => {
            return user.loggedIn;
        };

        useEffect(() => {
            if (!isAuthenticated()) {
                router.replace("/");
            }
        }, []);

        return isAuthenticated() ? <WrappedComponent {...props} /> : null;
    };
};
