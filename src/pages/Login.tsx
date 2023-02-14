import { login } from "@/api/login";
import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {}

const Login: React.FC<Props> = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            await login({ username, password });

            navigate("/");
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.error);
            }
        }
    };

    return (
        <div className="w-full h-screen center from-primary/30 to-primary/70 bg-gradient-to-tr">
            <div className="w-[400px] py-6 bg-secondary rounded-md bg-opacity-30 shadow-md ">
                <h2 className="text-center py-3 font-semibold">Sign in</h2>
                <form onSubmit={handleLogin} className="px-6 py-2">
                    <div className="flex items-center border-b shadow-md py-2 px-3 rounded-md mb-6 border-primary focus-within:border-b-2">
                        <input
                            className="pl-2 text-sm bg-transparent outline-none border-none"
                            type="text"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div className="flex items-center border-b shadow-md py-2 px-3 rounded-md border-primary focus-within:border-b-2">
                        <input
                            className="pl-2 text-sm bg-transparent outline-none border-none"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="block w-full bg-primary mt-8 py-2 rounded-md text-white font-semibold mb-2
                         hover:bg-transparent border-2 border-primary hover:text-primary tracking-wide duration-200"
                    >
                        Sign in
                    </button>

                    <div className="text-sm mt-3 text-center text-red-500">{errorMessage}</div>

                    <div className="text-sm ml-2 mt-3">
                        Don't have password ?{" "}
                        <Link className="hover:text-primary" to={"/signup"}>
                            Sign up here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
