import { lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Conversation } from "./components/conversation";
import { NoSelectedConversation } from "./components/conversation/NoSelectedConversation";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";

const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
    const location = useLocation();
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<HomePage />}>
                        <Route path="/" element={<NoSelectedConversation />}></Route>
                        <Route path="/messages/:uid" element={<Conversation />}></Route>
                    </Route>
                    <Route path="*" element={<div>Not Found</div>}></Route>
                </Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Register />}></Route>
            </Routes>
        </Suspense>
    );
}

export default App;
