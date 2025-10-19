import { Link, Outlet } from "react-router-dom"

const AuthLayout = () => {
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

            <footer>
                <p className="text-sm text-gray-400">©2025 <a target="_blank" className="hover:text-violet-700 underline" href="https://dotdazzle.in">Dotdazzle</a> Product</p>
            </footer>

        </div>
    )
}

export default AuthLayout