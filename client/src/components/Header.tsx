import type React from "react"
import { MdMenu, MdClose } from "react-icons/md"
import { Link, NavLink } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

const Header: React.FC = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <div className="bg-white max-w-xl hidden z-50 mx-auto md:flex border border-gray-200 shadow items-center rounded-xl justify-between fixed inset-0 h-fit top-5 px-5 py-2">
                <div className="flex gap-5 items-center">
                    <Link to='/' className="font-bold text-2xl border-r pr-5 border-gray-400">FUMA</Link>
                    <div className="flex gap-5">
                        <NavLink to='/about' className="hover:text-violet-700" >About</NavLink>
                        <NavLink to='/pricing' className="hover:text-violet-700" >Pricing</NavLink>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <Link to='/auth/login' className="hover:text-violet-700" >Sign in</Link>
                    <Link to='/auth/signup' className="bg-primary text-white px-2 py-1 rounded-lg">
                        Start For Free
                    </Link>
                </div>
            </div>

            <div className="flex md:hidden items-center justify-between p-3 relative">
                <Link to='/' className="font-bold text-2xl">FUMA</Link>

                <div className="flex items-center gap-3">
                    <button className="cursor-pointer" onClick={() => setOpen(!open)}>
                        {open ? <MdClose className="text-3xl" /> : <MdMenu className="text-3xl" />}
                    </button>
                </div>
                {open && (
                    <div
                        ref={menuRef}
                        className="absolute transition-all duration-700 ease-in-out right-0 top-14 w-full bg-gray-50 shadow-lg p-4 flex flex-col gap-3 z-50"
                    >
                        <NavLink to="/about" className="hover:text-violet-700">About</NavLink>
                        <NavLink to="/pricing" className="hover:text-violet-700">Pricing</NavLink>

                        <Link to="/auth/login" className="hover:text-violet-700">
                            Sign in
                        </Link>

                        <Link
                            to="/auth/signup"
                            className="bg-primary text-white text-center py-1 rounded-lg"
                        >
                            Start For Free
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
