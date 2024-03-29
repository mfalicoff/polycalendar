import fetch, { Response } from "node-fetch";
import { User } from "@interfaces/users.interface";
import store from "@redux/store";
import { changeUser } from "@redux/slices/user";

export const loginService = async (data: User): Promise<Response> => {
    return await fetch(`${process.env.ROUTE}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const signUp = async (data: User): Promise<Response> => {
    return await fetch(`${process.env.ROUTE}/users`, {
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
    localStorage.clear();
};
