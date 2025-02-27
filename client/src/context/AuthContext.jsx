import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const login = async (email, password) => {
        try {
            const { data } = await axios.post("http://localhost:8080/user/login", { email, password })
            console.log(data)
            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("ojk", "dadadasdasas")
            console.log("herer")
            return true
        } catch (error) {
            console.log(error)
            if (!error.response?.data.success) {
                toast.error(error.response.data.message)
            }

        }
    }

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post("http://localhost:8080/user/register", { name, email, password })
            console.log(data)
            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(user))
        } catch (error) {
            console.log(error)
            if (!error.response?.data.success) {
                toast.error(error.response.data.message)
            }
        }
    }

    const logout = async () => {
        try {
            await axios.get("http://localhost:8080/user/logout")

            setUser(null)
            localStorage.setItem("user", null)
            return true

        } catch (error) {
            console.log(error)
            if (!error.response?.data.success) {
                toast.error(error.response.data.message)
            }
            return false

        }
    }

    const getUserProfile = async () => {
        try {
            const data = await axios.get("http://localhost:8080/user/me", { withCredentials: true })
            console.log(data)
            setUser(data.user)
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <AuthContext.Provider value={{ user, login, logout, register, getUserProfile }}>

            {children}
        </AuthContext.Provider>
    )

}