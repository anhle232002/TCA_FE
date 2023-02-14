import { signUp } from "@/api/signup";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const Register: React.FC<Props> = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorMesssage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await signUp({ username, fullName, password, repeat_password: repeatPassword });

        navigate("/login");
    };

    const comparePassword = () => {
        if (repeatPassword !== password) {
            setErrorMessage("Password does not match");
        } else {
            setErrorMessage("");
        }
    };

    return (
        <div className="w-full h-screen center from-primary/30 to-primary/70 bg-gradient-to-tr">
            <div className="w-[400px] py-6 bg-secondary rounded-md bg-opacity-30 shadow-md ">
                <h2 className="text-center py-3 font-semibold">Register</h2>

                <form onSubmit={handleSignup} className="px-6 py-2">
                    <div className="flex items-center border-b shadow-md py-2 px-3 rounded-md mb-6 border-primary focus-within:border-b-2">
                        <input
                            className="pl-2 text-sm bg-transparent outline-none border-none"
                            type="text"
                            name="fullName"
                            placeholder="Full name"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.currentTarget.value)}
                        />
                    </div>
                    <div className="flex items-center border-b shadow-md py-2 px-3 rounded-md mb-6 border-primary focus-within:border-b-2">
                        <input
                            className="pl-2 text-sm bg-transparent outline-none border-none"
                            type="text"
                            required
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                        />
                    </div>
                    <div className="flex items-center border-b shadow-md py-2 px-3 rounded-md mb-6 border-primary focus-within:border-b-2">
                        <input
                            className="pl-2 text-sm bg-transparent outline-none border-none"
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <div className="flex items-center border-b shadow-md py-2 px-3 rounded-md border-primary focus-within:border-b-2">
                        <input
                            className="pl-2 text-sm bg-transparent outline-none border-none"
                            type="password"
                            name="repeatPassword"
                            required
                            placeholder="Confirm password"
                            value={repeatPassword}
                            onBlur={comparePassword}
                            onChange={(e) => setRepeatPassword(e.currentTarget.value)}
                        />
                    </div>

                    <div className="text-center text-xs text-red-500 mt-4">{errorMesssage}</div>

                    <button
                        type="submit"
                        className="block w-full bg-primary mt-8 py-2 rounded-md text-white font-semibold mb-2
                         hover:bg-transparent border-2 border-primary hover:text-primary tracking-wide duration-200"
                    >
                        Register
                    </button>
                    <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                        Forgot Password ?
                    </span>
                </form>
            </div>
        </div>
    );
};
export default Register;
