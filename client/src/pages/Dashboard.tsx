import React, { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiLink2,
  FiInstagram,
  FiZap,
  FiUsers,
  FiMessageSquare,
} from "react-icons/fi";
import { FiSettings, FiPlus } from "react-icons/fi";
import useUser from "../context/userContext";
import Axios from "../utils/axios";
import Stats from "../components/Stats";

type UserStats = {
  automationCount: number;
  messageCount: number;
  contactCount: number;
};

type Stat = {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  limit: number;
};

export default function Dashboard() {
  const { user, setIsPriceModalOpen } = useUser();
  const [userStats, setStats] = useState<UserStats>({
    automationCount: 0,
    messageCount: 0,
    contactCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const stats: Stat[] = [
    {
      id: "automations",
      icon: <FiPlus size={18} />,
      label: "Automations",
      value: userStats.automationCount,
      limit: 3,
    },
    {
      id: "messages",
      icon: <FiMessageSquare size={18} />,
      label: "Messages",
      value: userStats.messageCount,
      limit: 1000,
    },
    {
      id: "contacts",
      icon: <FiUsers size={18} />,
      label: "Contacts",
      value: userStats.contactCount,
      limit: 1000,
    },
  ];

  useEffect(() => {
    const getAutomationCount = async () => {
      setLoading(true);
      try {
        const res = await Axios.get("/user/stats");
        console.log("GET /user/stats response:", res?.data);

        // Normalize the payload shape:
        // Accept either res.data.data or res.data (depends on your backend wrapper)
        const payload = res?.data?.data ?? res?.data ?? {};

        // Support multiple naming conventions (camelCase, snake_case)
        const automationCount =
          Number(payload.automationCount ?? payload.automation_count ?? payload.automation ?? 0) || 0;
        const messageCount =
          Number(payload.messageCount ?? payload.message_count ?? payload.messages ?? 0) || 0;
        const contactCount =
          Number(payload.contactCount ?? payload.contact_count ?? payload.contacts ?? 0) || 0;

        // debug log
        console.log({ automationCount, messageCount, contactCount });

        setStats({
          automationCount,
          messageCount,
          contactCount,
        });
      } catch (err: any) {
        console.error("Failed to fetch user stats", err?.response?.data ?? err.message ?? err);
      } finally {
        setLoading(false);
      }
    };

    getAutomationCount();
  }, []);

  return (
    <section className="space-y-4 overflow-y-scroll border-[1px] border-gray-500/20 rounded-xl p-4">
      <h2 className="text-2xl font-bold text-gray-900">Get Started with FUMA</h2>

      <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-6">
        {user.plan == "FREE" ? <div className="mb-20">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-800">Plans &amp; Billing</h3>

                <Pill className="bg-slate-100 text-slate-700">{user?.plan || "FREE"}</Pill>
                <Pill className="bg-slate-100 text-slate-700">Monthly</Pill>
                <Pill className="bg-emerald-100 text-emerald-700">Active</Pill>
              </div>
              <div className="flex items-start">
                <button
                  type="button"
                  onClick={() => setIsPriceModalOpen(true)}
                  className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
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
            {loading && <div className="mt-3 text-xs text-gray-500">Loading stats...</div>}
          </div>
        </div>
          :
          <Stats metrics={[
            { label: "Automation", value: userStats.automationCount },
            { label: "Messages", value: userStats.messageCount },
            { label: "Contacts", value: userStats.contactCount },
          ]} />
        }
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
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-600 text-white">F</span>
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
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">💬</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">✈️</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">🏷️</span>
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
                    <img className="h-8 w-8 rounded-full object-cover" src="https://i.pravatar.cc/80?img=12" alt="" />
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <img className="h-8 w-8 rounded-full object-cover" src="https://i.pravatar.cc/80?img=5" alt="" />
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <img className="h-8 w-8 rounded-full object-cover" src="https://i.pravatar.cc/80?img=36" alt="" />
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center max-w-sm">
                  Invite creators and brands to FUMA and earn a commission for every paid subscription they keep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- small components ---------- */

const ProgressStat: React.FC<{ stat: Stat }> = ({ stat }) => {
  const percent = stat.limit <= 0 ? 0 : Math.min(100, Math.round((stat.value / stat.limit) * 100));

  // format limit like "1K"
  const formatLimit = (n: number) => (n >= 1000 ? `${Math.round(n / 100) / 10}K` : `${n}`);
  const displayValue = `${stat.value ?? 0} / ${formatLimit(stat.limit)}`;

  return (
    <div className="flex-1 min-w-[180px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-purple-600">
            {stat.icon}
          </div>
          <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
        </div>

        <div className="text-sm text-slate-500">
          <span className="text-sm font-medium">{displayValue}</span>
        </div>
      </div>

      <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${percent === 100 ? "bg-red-500" : "bg-gradient-to-r from-purple-500 to-pink-500"} transition-all duration-500`}
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
