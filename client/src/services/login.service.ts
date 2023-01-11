import fetch, { Response } from "node-fetch";
import { User } from "@interfaces/users.interface";
import store from "@redux/store";
import { changeUser } from "@redux/slices/user";

export const loginService = async (data: User): Promise<Response> => {
    return await fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const signUp = async (data: User): Promise<Response> => {
    return await fetch("http://localhost:3001/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const loginUser = (username: string): void => {
    store.dispatch(
        changeUser({
            email: username,
            password: "",
            loggedIn: true,
        }),
    );
};

export const logoutUser = (): void => {
    store.dispatch(
        changeUser({
            email: "",
            password: "",
            loggedIn: false,
        }),
    );
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
};
