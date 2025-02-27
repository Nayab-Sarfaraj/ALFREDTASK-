import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    const { login, user } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (user !== null) navigate("/")
    })

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
    };
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Email</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-2 text-sm">
                    Do not have an account?{" "}
                    <button className="text-blue-500 cursor-pointer" onClick={() => navigate("/sign-up")}>
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    )
}

export default LoginForm