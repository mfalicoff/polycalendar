import React, { SyntheticEvent, useState } from "react";
import { Button, Container, Footer, Header } from "@components";
import { useRouter } from "next/router";
import { loginService, loginUser } from "../src/services/login.service";
import { Response } from "node-fetch";
import { User } from "@interfaces/users.interface";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async (event: SyntheticEvent) => {
        event.preventDefault();
        const res: Response = await loginService({
            email: username,
            password: password,
        });
        if (res.status === 200) {
            const data = await res.json();
            const user: User = data.data;
            loginUser(user.email);
            if (process.env.ADMIN_ID === user._id) await router.push("/admin");
            else await router.push("/");
        }
    };

    const signUp = async () => {
        await router.push("/signup");
    };

    return (
        <Container>
            <Header />
            <div className="flex-1 container my-8 max-w-screen-lg mx-auto p-5">
                <div className="flex items-center justify-center h-screen">
                    <div className="col-span-1 rounded-md border border-gray-300 p-5">
                        <div className="py-4">
                            <h1>Login</h1>
                        </div>
                        <div>
                            <form onSubmit={handleLogin}>
                                <fieldset>
                                    <div className="py-4">
                                        <label>
                                            Username or email
                                            <br />
                                            <input
                                                className="px-4 py-1 border-b-2 border-gray-400 outline-none  focus:border-gray-400"
                                                name="name"
                                                value={username}
                                                onChange={({ target }) => setUsername(target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            Password
                                            <br />
                                            <input
                                                className="px-4 py-1 border-b-2 border-gray-400 outline-none  focus:border-gray-400"
                                                name="name"
                                                value={password}
                                                onChange={({ target }) => setPassword(target.value)}
                                            />
                                        </label>
                                    </div>
                                </fieldset>
                                <br />
                                <Button type="submit">Submit</Button>
                            </form>
                        </div>
                        <div>
                            <Button type="button" onClick={signUp}>
                                Create Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
};

export default Login;
