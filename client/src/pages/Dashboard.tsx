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
import MessageAnalytics from "../components/analytics/MessageAnalytics";

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
        const res = await Axios.get("/stats/basic");
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
    <section className="space-y-4 overflow-y-scroll md:border-[1px] border-gray-500/20 h-full rounded-xl p-4">
      <h2 className="text-2xl font-bold text-gray-900">Get Started with FUMA</h2>

      <div className="rounded-3xl border border-gray-200  bg-white p-4 sm:p-6">
        {user?.plan == "FREE" ? 
        <div className="mb-10">
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
      <MessageAnalytics />
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
