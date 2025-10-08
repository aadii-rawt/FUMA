import { useState } from "react";
import { FiSettings, FiUsers, FiCreditCard } from "react-icons/fi";
import { Outlet } from "react-router-dom";

type Tab = "general" | "members" | "billing";

export default function SettingLayout() {
  const [tab, setTab] = useState<Tab>("general");
  const [name, setName] = useState("Dotdealz");

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center p-4 lg:p-10">
      {/* Card */}
      <div className="w-full max-w-3xl rounded-3xl bg-white  border-2 border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-lg flex items-center gap-2">
            <FiSettings className="text-gray-500" />
            Settings
          </h1>
        </div>

        {/* Body: left nav + right content */}
        <div className="flex">
          {/* Left menu */}
          <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
            <div className="px-6 pt-5 pb-3 text-xs font-semibold text-gray-400 tracking-wide">
              WORKSPACE
            </div>
            <nav className="px-3 pb-6">
              <NavItem
                active={tab === "general"}
                onClick={() => setTab("general")}
                icon={<FiSettings className="h-4 w-4" />}
                label="General"
              />
              
              <NavItem
                active={tab === "billing"}
                onClick={() => setTab("billing")}
                icon={<FiCreditCard className="h-4 w-4" />}
                label="Billing"
              />
            </nav>
          </aside>

          {/* Right content */}
          {/* <section className="flex-1 p-6 lg:p-8">
            {tab === "general" && (
              <div className="max-w-xl">
                <h2 className="text-lg font-semibold">General</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Change the settings for your current workspace
                </p>

                <label className="mt-6 block text-xs font-medium text-gray-500">
                  Workspace Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40"
                  placeholder="Workspace name"
                />

                <button
                  onClick={() => console.log("update:", name)}
                  className="mt-5 w-full rounded-lg bg-purple-600 hover:bg-purple-600/90 text-white text-sm font-semibold py-2.5"
                >
                  Update
                </button>

                <hr className="my-6" />

                <button
                  onClick={() => console.log("refresh permissions")}
                  className="w-full rounded-lg bg-purple-600 hover:bg-purple-600/90 text-white text-sm font-semibold py-2.5"
                >
                  Refresh Permissions
                </button>

                <p className="mt-4 text-sm text-gray-500 leading-6">
                  Instagram can unexpectedly lose the connection to your page
                  permissions. If you encounter any trouble, like content not
                  sending or setting not saving, always refresh your permissions
                  first.
                </p>
              </div>
            )}

            {tab === "members" && (
              <div className="max-w-xl">
                <h2 className="text-lg font-semibold">Members</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Invite teammates and manage roles.
                </p>
                <div className="mt-6 rounded-xl border p-4 text-sm text-gray-500">
                  Placeholder list — wire to your data later.
                </div>
              </div>
            )}

            {tab === "billing" && (
              <div className="max-w-xl">
                <h2 className="text-lg font-semibold">Billing</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Plan, invoices, and payment method.
                </p>
                <div className="mt-6 rounded-xl border p-4 text-sm text-gray-500">
                  Billing details placeholder.
                </div>
              </div>
            )}
          </section> */}
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
