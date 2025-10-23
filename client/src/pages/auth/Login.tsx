import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Axios from "../../utils/axios"
import LoadingSpinner from "../../components/LoadingSpinner"

const Login = () => {
    const [email,setEmail] = useState<string>("")
    const [error,setError] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    

    const handleLogin = async () => {
        setError("")
        if(!email) return setError("Email is required")
        
        try {
            setLoading(true)
            await Axios.post("/auth/login", {email})
            navigate("/auth/verify",{state : {email,type: "login"}})
        
        } catch (error) {
            console.log(error);
            //@ts-ignore
            setError(error?.response?.data?.error || "someting went wrong")
        }finally {
            setLoading(false)
        }
    }

    const handleGoogleSignin = () => {
        return window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`

    }

    return (
        <div className="w-1/2 p-6">
            <h1 className="text-3xl font-semibold">Sign In</h1>
            <p className="text-sm mt-1 text-gray-400">Don't have an account? <Link to='/auth/signup' className="text-violet-700 underline ml-2">Signup</Link></p>
            <div className="mt-10">
                <button onClick={handleGoogleSignin}  className="border w-full flex items-center justify-center gap-3 text-center py-1.5 cursor-pointer border-gray-200 rounded-xl"> <img src="https://img.icons8.com/color/512/google-logo.png" alt="google icons" className="w-5" 
               
                />Sign in with Google</button>
                <br />
                <div className="mt-5 border-t border-gray-100 flex flex-col w-full">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter you email" className="border w-full mt-5 py-1.5 px-2 cursor-pointer border-gray-200 rounded-xl"/>
                    <button onClick={handleLogin} disabled={loading} className="border w-full text-center py-1.5 cursor-pointer border-gray-200 mt-5 rounded-xl bg-violet-700 text-white">{loading ? <LoadingSpinner size={22} /> : "Sign In"}</button>
                    {error && <p className="text-sm text-red-500 py-2">{error}</p>}
                    <p className="mt-8 text-xs text-gray-400">By proceeding you acknowledge that you have read, understood and agree to our Terms and Conditions.</p>
                </div>
            </div>
        </div>
    )
}

export default Login