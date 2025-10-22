import type React from "react"
import { Link, NavLink } from "react-router-dom"

const  Header : React.FC= () => {
return (
    <div className="bg-white max-w-xl z-50 mx-auto flex border border-gray-200 shadow items-center rounded-xl justify-between fixed inset-0 h-fit  top-5 px-5 py-2">
        <div className="flex gap-5 items-center">
        <Link to='/' className="font-bold text-2xl border-r pr-5 border-gray-400">FUMA</Link>
        <div className="flex gap-5">
            <NavLink to='/about' className="hover:text-violet-700" >About</NavLink>        
            <NavLink to='/pricing' className="hover:text-violet-700" >Pricing</NavLink>         
        </div>
        </div>
            <div className="flex items-center gap-5">
                <Link to='/auth/login' className="hover:text-violet-700" >Sign in </Link >
                <Link to='/auth/signup'  className="bg-primary text-white px-2 py-1 rounded-lg ">Start For Free</Link >
            </div>
    </div>
)
}

export default Header