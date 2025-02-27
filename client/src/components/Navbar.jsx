import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/themeContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate()

    const handleLogout = async () => {
        const result = await logout()
        if (result) navigate("/login")

    }
    return (
        <nav className={`p-4 shadow-md transition duration-300 
       dark:bg-gray-900  text-white }`}>

            <div className="container mx-auto flex justify-center items-center">


                <div className="flex items-center space-x-1">
                    {/* Dark Mode Toggle */}
                    <button onClick={toggleTheme} className="p-2 border rounded">
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>

                    <Link to="/review" className="px-4 py-2">Flashcards</Link>

                    <button
                        onClick={handleLogout}
                        className="ml-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
