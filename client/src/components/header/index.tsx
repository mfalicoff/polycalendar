import React, { SyntheticEvent } from "react";

import { Button } from "@components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import { logoutUser } from "../../services/login.service";
import DropdownLoginForm from "@components/header/loginForm";

export const Header: React.FC = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.storeUser);

    const handleLogout = async (event: SyntheticEvent) => {
        event.preventDefault();
        logoutUser();
        await router.push("/");
    };

    const handleClickMain = async () => {
        await router.push("/");
    };

    return (
        <div className="flex justify-between bg-gray-800 place-items-center">
            <div className="basis-1/4">
                {!user.loggedIn ? (
                    <>
                        <DropdownLoginForm />
                    </>
                ) : (
                    <>
                        <Button type="button" onClick={() => router.push("/admin")}>
                            Admin
                        </Button>
                        <Button type="button" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </div>
            <div className="basis-1/2">
                <h1
                    onClick={handleClickMain}
                    className="text-red-800 font-bold font text-lg cursor-pointer"
                >
                    PolyCalendar
                </h1>
            </div>
            <div>{!user.loggedIn ? <></> : <p className="text-white mr-5">{user.email}</p>}</div>
        </div>
    );
};
