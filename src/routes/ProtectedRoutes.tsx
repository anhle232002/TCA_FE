import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface Props {}

export const ProtectedRoutes: React.FC<Props> = () => {
    const { data, error, isLoading } = useAuth();
    const navigate = useNavigate();
    if (error === "UNAUTHORIED") {
        navigate("/login");
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};
