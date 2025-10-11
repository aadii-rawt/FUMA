import { Link } from "react-router-dom"

const Signup = () => {
return (
        <div className="w-1/2 p-6">
            <h1 className="text-3xl font-semibold">Sign Up</h1>
            <p className="text-sm mt-1 text-gray-400">Already have an account? <Link to='/auth/login' className="text-violet-700 underline ml-2">Signin</Link></p>
            <div className="mt-10">
                <button className="border w-full text-center py-1.5 cursor-pointer border-gray-200 rounded-xl">Sign in with Google</button>
                <br />
                <div className="mt-5 border-t border-gray-100 flex flex-col w-full">
                    <input type="text" placeholder="Enter you email" className="border w-full mt-5 py-1.5 px-2 cursor-pointer border-gray-200 rounded-xl"/>
                    <button className="border w-full text-center py-1.5 cursor-pointer border-gray-200 mt-5 rounded-xl bg-violet-700 text-white">Sign In</button>
                    <p className="mt-8 text-xs text-gray-400">By proceeding you acknowledge that you have read, understood and agree to our Terms and Conditions.</p>
                </div>
            </div>
        </div>
    )
}
export default Signup
