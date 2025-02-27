import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return <div>
        {
            !user ? <LoginForm /> : <Outlet />
        }

    </div>
};

export default ProtectedRoute