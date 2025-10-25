import { FiSettings, FiCreditCard } from "react-icons/fi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
export default function SettingLayout() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen grid place-items-center p-4 lg:p-10" onClick={() => navigate("/app")}>
      <div onClick={(e) => e.stopPropagation()} className="w-full h-[520px] max-h-[520px] max-w-3xl rounded-3xl bg-white  border-2 border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-lg flex items-center gap-2">
            <FiSettings className="text-gray-500" />
            Settings
          </h1>
        </div>
        <div className="flex h-full">
          <div className="w-56 shrink-0 h-full border-r border-gray-200 bg-white">
            <div className="px-6 pt-5 pb-3 text-xs font-semibold text-gray-400 tracking-wide">
              WORKSPACE
            </div>
            <nav className="px-3 pb-6 space-y-1">
              <NavLink to="/setting/general" className={({isActive}) => `w-full cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}>
                <span className="text-gray-500"><FiSettings className="h-4 w-4" /></span>
                <span>General</span>
              </NavLink>
              <NavLink to="/setting/billing"  className={({isActive}) => `w-full cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}>
                <span className="text-gray-500"><FiCreditCard className="h-4 w-4" /></span>
                <span>Billing</span>
              </NavLink>
            </nav>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
