import { Link } from "react-router-dom"

const VerifyOTP = () => {
    return (
          <div className="w-1/2 p-6">
            <h1 className="text-3xl font-semibold">Check your inbox</h1>
            <p className="text-sm mt-1 text-gray-400">We sent you an verification code. Please be sure to check your spam folder too.</p>
            <div className="mt-10">
                <div className="border w-full text-center py-1 cursor-pointer border-gray-200 rounded-xl flex items-center justify-between px-2">
                    <div>
                        <p className="text-sm text-gray-400">rawataddi@gmail.com</p>
                    </div>
                    <Link to='/auth/signup' className="text-xs text-violet-700 underline">change Email</Link>
                </div>
                <p className="text-xs text-gray-400"><button className="text-violet-700 underline cursor-pointer">Resend Email</button> in 30s</p>
                <div className="mt-4 w-full">
                    <button className="border w-full text-center py-1 cursor-pointer border-gray-200 mt-5 rounded-xl bg-violet-700 text-white">Veify Code</button>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP