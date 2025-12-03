import { Link, Outlet, useNavigate } from "react-router-dom"
import useUser from "../context/userContext"
import Axios from "../utils/axios";

const AuthLayout = () => {

    const { user } = useUser()
    const navigate = useNavigate();
    const handleLogout = async () => {
        if (!user) return
        try {
            const res = await Axios.post("/auth/logout")
            if (res.status) {
                navigate("/auth/login")
            }
        } catch (error) {
            console.log("Something went wrong", error);

        }
    }
    return (
        <div className="min-h-screen max-h-screen bg-violet-50 flex flex-col justify-center gap-20 items-center py-10">
            <div>
                <Link to='/' className="font-bold text-3xl">FUMA</Link>
            </div>
            <div className="max-w-3xl w-full border bg-white rounded-2xl border-gray-100 shadow flex justify-between h-[465px] gap-10">
                <Outlet />
                <div className="w-1/2 relative">
                    <img src="/auth-layout.webp" alt="" className="-mt-6.5 absolute" />
                </div>
            </div>

            <footer className="flex gap-5">
                <p className="text-sm text-gray-400">©2025 <a target="_blank" className="hover:text-violet-700 underline" href="https://dotdazzle.in">Dotdazzle</a> Product</p>
               {user && <button onClick={handleLogout} className="text-sm text-gray-400 cursor-pointer underline">Signout</button>}
            </footer>

        </div>
    )
}

export default AuthLayout