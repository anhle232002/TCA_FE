import { lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";

const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/cid/:cid" element={<HomePage />}></Route>
                    <Route path="/user/:uid" element={<HomePage />}></Route>
                </Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Register />}></Route>
            </Routes>
        </Suspense>
    );
}

export default App;
