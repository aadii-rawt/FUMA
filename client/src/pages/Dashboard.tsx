import React from "react";
import { FiCheckCircle, FiLink2, FiInstagram, FiZap, FiUsers, FiMessageCircle, FiBookOpen } from "react-icons/fi";
import {
  FiSettings,
  FiPlus,
  FiMessageSquare,
  FiClipboard,
} from "react-icons/fi";

const stats = [
  { id: "automations", icon: <FiPlus size={18} />, label: "Automations", value: 11, limit: 3 },
  { id: "messages", icon: <FiMessageSquare size={18} />, label: "Messages", value: 321, limit: 1000 },
  { id: "contacts", icon: <FiUsers size={18} />, label: "Contacts", value: 295, limit: 1000 },
  // { id: "forms", icon: <FiClipboard size={18} />, label: "Forms", value: 0, limit: 3 },
];


export default function Dashboard() {
  return (
    <section className="space-y-4 overflow-y-scroll border-[1px] border-gray-500/20  rounded-xl p-4">
      <h2 className="text-2xl font-bold text-gray-900">Get Started with FUMA</h2>

      <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="mb-20">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-800">Plans &amp; Billing</h3>

                <Pill className="bg-slate-100 text-slate-700">Free</Pill>
                <Pill className="bg-slate-100 text-slate-700">Monthly</Pill>
                <Pill className="bg-emerald-100 text-emerald-700">Active</Pill>
              </div>
              <div className="flex items-start">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <FiSettings />
                  Manage
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((s) => (
                <ProgressStat key={s.id} stat={s} />
              ))}
            </div>

          </div>
        </div>

        {/* Top grid: Connect IG / Create Automation */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Connect Instagram */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-900">
                Connect your Instagram <br className="hidden sm:block" /> Page to FUMA
              </div>

              <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                <FiCheckCircle /> Connected
              </span>
            </div>

            {/* Pretty card / art placeholder */}
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-purple-50 via-white to-purple-100 p-0.5">
              <div className="rounded-2xl bg-white/40 p-6">
                <div className="grid place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-100 via-white to-purple-100 py-14">
                  <div className="flex items-center gap-4 text-purple-600">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-600 text-white">
                      F
                    </span>
                    <FiZap className="text-2xl opacity-70" />
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pink-100 text-pink-600">
                      <FiInstagram className="text-2xl" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Create first Automation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-900">
                Create your first <br className="hidden sm:block" /> Automation
              </div>

              <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                <FiCheckCircle /> Created
              </span>
            </div>

            {/* Pretty card / flow placeholder */}
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-0.5">
              <div className="rounded-2xl bg-white/40 p-6">
                <div className="grid place-items-center rounded-2xl bg-white py-14">
                  <div className="flex items-center gap-6 text-indigo-500">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">
                      💬
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">
                      ✈️
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">
                      🏷️
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Refer & Earn */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="text-lg font-semibold text-gray-900">
              Refer &amp; Earn <br className="hidden sm:block" /> for Lifetime*
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4">
              <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 hover:bg-purple-100">
                <FiLink2 /> Get Link
              </button>
            </div>

            {/* Banner / art */}
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-fuchsia-50 via-white to-orange-50 p-0.5">
              <div className="rounded-2xl bg-white/60 p-6">
                <div className="h-32 rounded-2xl bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
              </div>
            </div>
          </div>

          {/* Right-side banner */}
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-amber-50 via-white to-pink-50 p-0.5">
            <div className="rounded-2xl bg-white/60 p-6">
              <div className="grid place-items-center rounded-2xl bg-white py-14">
                <div className="flex items-center gap-4 text-purple-600">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <FiUsers />
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://i.pravatar.cc/80?img=12"
                      alt=""
                    />
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://i.pravatar.cc/80?img=5"
                      alt=""
                    />
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://i.pravatar.cc/80?img=36"
                      alt=""
                    />
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center max-w-sm">
                  Invite creators and brands to FUMA and earn a commission for every paid
                  subscription they keep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


const ProgressStat: React.FC<{ stat: Stat }> = ({ stat }) => {
  const percent =
    stat.limit <= 0 ? 0 : Math.min(100, Math.round((stat.value / stat.limit) * 100));

  // we want to display counts like "321 / 1K" when large - helper:
  const formatLimit = (n: number) => (n >= 1000 ? `${Math.round(n / 100) / 10}K` : `${n}`);
  const displayValue = `${stat.value} / ${formatLimit(stat.limit)}`;

  return (
    <div className="flex-1 min-w-[180px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* icon circle */}
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-purple-600">
            {stat.icon}
          </div>
          <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
        </div>

        <div className="text-sm text-slate-500">
          <span className="text-sm font-medium">{displayValue}</span>
        </div>
      </div>

      {/* progress track */}
      <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        {/* gradient filled bar */}
        <div
          className={`h-full rounded-full ${percent == 100 ? "bg-red-500" : "bg-gradient-to-r from-purple-500 to-pink-500"} transition-all duration-500`}
          style={{ width: `${percent}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
};

const Pill: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${className}`}>{children}</span>
);