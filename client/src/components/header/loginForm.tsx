import React, { useState } from "react";
import { Button } from "@components";
import { Response } from "node-fetch";
import { loginService, loginUser } from "../../services/login.service";
import { User } from "@interfaces/users.interface";
import { useNotification } from "@components/notification";

interface LoginFormData {
    username: string;
    password: string;
}

const DropdownLoginForm: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({
        username: "",
        password: "",
    });
    const { showNotification } = useNotification();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res: Response = await loginService({
            email: formData.username,
            password: formData.password,
        });

        if (res.status === 200) {
            const data = await res.json();
            const user: User = data.data;
            localStorage.setItem("user", JSON.stringify(user.cookie));
            loginUser(user.email);
            toggleDropdown();
            showNotification("Logged in successfully!", false, 3000);
        } else {
            const error = await res.json();
            showNotification(`Login failed! ${error.message}`, true, 3000);
        }
    };

    return (
        <div className="relative inline-block">
            <Button onClick={toggleDropdown}>Login</Button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg">
                    <form className="p-4 space-y-4" onSubmit={(e) => handleLogin(e)}>
                        <div>
                            <label htmlFor="username" className="block mb-1 text-sm font-semibold">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>
                        <Button type="submit">Login</Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DropdownLoginForm;
