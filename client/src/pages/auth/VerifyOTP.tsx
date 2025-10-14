import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../../utils/axios";

const VerifyOTP: React.FC = () => {

  const {email,type} = useLocation().state || {}
  
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [error,setError] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const setRef = (el: HTMLInputElement | null, idx: number) => {
    inputsRef.current[idx] = el;
  };

  const focusIndex = (idx: number) => {
    if (idx >= 0 && idx < inputsRef.current.length) {
      inputsRef.current[idx]?.focus();
      inputsRef.current[idx]?.select();
    }
  };

  const handleChange = (idx: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[idx] = digit || "";
    setOtp(next);

    if (digit && idx < 5) focusIndex(idx + 1);
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key === "Backspace") {
      if (otp[idx]) {
        // Clear current box
        const next = [...otp];
        next[idx] = "";
        setOtp(next);
      } else if (idx > 0) {
        // Move back if empty
        focusIndex(idx - 1);
        const next = [...otp];
        next[idx - 1] = "";
        setOtp(next);
      }
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      focusIndex(idx - 1);
    } else if (key === "ArrowRight") {
      e.preventDefault();
      focusIndex(idx + 1);
    }
  };

  const handlePaste = (idx: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const chars = pasted.slice(0, 6 - idx).split("");
    const next = [...otp];

    for (let i = 0; i < chars.length; i++) {
      next[idx + i] = chars[i];
    }
    setOtp(next);

    const lastIndex = Math.min(idx + chars.length, 6) - 1;
    focusIndex(lastIndex < 5 ? lastIndex + 1 : 5);
  };

  const code = otp.join("");
  const isComplete = code.length === 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setError("")
      if(!code) return setError("Please enter OTP")
        
      try {
            setLoading(true)
            const endpoint = type == "login" ? "/auth/login/verify" : "/auth/signup/verify"
            await Axios.post(endpoint, {email,otp : code})
            navigate("/app")
        
      } catch (error) {
            console.log(error);  
            //@ts-ignore
            setError(error?.response?.data?.error || "someting went wrong")
      }finally {
            setLoading(false)
      }
  };

  return (
    <div className="w-1/2 p-6">
      <h1 className="text-3xl font-semibold">Check your inbox</h1>
      <p className="text-sm mt-1 text-gray-400">
        We sent you a verification code. Please be sure to check your spam folder too.
      </p>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="border w-full text-center py-1 cursor-pointer border-gray-200 rounded-xl flex items-center justify-between px-2">
          <div>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
          <Link to={type == "login" ? "/auth/login" : "/auth/signup"} className="text-xs text-violet-700 underline">
            Change Email
          </Link>
        </div>

        {/* OTP boxes */}
        <div className="mt-6 flex items-center justify-between gap-2">
          {otp.map((val, idx) => (
            <input
              key={idx}
              ref={(el) => setRef(el, idx)}
              value={val}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={(e) => handlePaste(idx, e)}
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              className="w-12 h-12 text-center text-xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              aria-label={`OTP Digit ${idx + 1}`}
            />
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-3">
          <button type="button" className="text-violet-700 underline cursor-pointer">
            Resend Email
          </button>{" "}
          in 30s
        </p>

        <div className="mt-4 w-full">
          <button
            type="submit"
            disabled={!isComplete}
            className={`border w-full text-center py-2 cursor-pointer border-gray-200 mt-5 rounded-xl ${
              isComplete ? "bg-violet-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
           {loading ? "loading..." :  "Verify Code" }
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;
