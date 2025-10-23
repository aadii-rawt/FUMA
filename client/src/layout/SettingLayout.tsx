import { useState } from "react";
import { FiSettings, FiUsers, FiCreditCard } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";

type Tab = "general" | "members" | "billing";

export default function SettingLayout() {
  const [tab, setTab] = useState<Tab>("general");
  const [name, setName] = useState("Dotdealz");
  const navigate = useNavigate()

  return (
    <div className="min-h-screen grid place-items-center p-4 lg:p-10">
      {/* Card */}
      <div className="w-full min-h-[520px] max-w-3xl rounded-3xl bg-white  border-2 border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-lg flex items-center gap-2">
            <FiSettings className="text-gray-500" />
            Settings
          </h1>
        </div>

        {/* Body: left nav + right content */}
        <div className="flex h-full">
          {/* Left menu */}
          <aside className="w-56 shrink-0 h-full border-r border-gray-200 bg-white">
            <div className="px-6 pt-5 pb-3 text-xs font-semibold text-gray-400 tracking-wide">
              WORKSPACE
            </div>
            <nav className="px-3 pb-6">
              <NavItem
                active={tab === "general"}
                onClick={() => navigate("/setting/general")}
                icon={<FiSettings className="h-4 w-4" />}
                label="General"
              />
              
              <NavItem
                active={tab === "billing"}
                onClick={() => navigate("/setting/billing")}
                icon={<FiCreditCard className="h-4 w-4" />}
                label="Billing"
              />
            </nav>
          </aside>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function NavItem({
  active,
  onClick,
  icon,
  label,
}: {
  active?: boolean;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition
        ${active ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
      aria-current={active ? "page" : undefined}
    >
      <span className="text-gray-500">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
