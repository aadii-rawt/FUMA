import React from "react";
import { TfiStatsUp } from "react-icons/tfi";

type Metric = {
  label: string;
  value: number | string;
};

type Props = {
  title?: string;
  dateLabel?: string;
  metrics?: Metric[]; 
  onDateClick?: () => void;
};

export default function Stats({
  title = "Conversion Funnel",
  dateLabel = "This Month",
  metrics = [
    { label: "Automation", value: 0 },
    { label: "Messages", value: 0 },
    { label: "Contacts", value: 0 },
  ],
  onDateClick,
}: Props) {
  return (
    <div className="mb-20">
      <div className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">

        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50">
             <TfiStatsUp />
            </div>

            <div>
              <h3 className="text-slate-800 font-medium text-lg">{title}</h3>
            </div>
          </div>

          <button
            onClick={onDateClick}
            className="flex items-center gap-2 border border-slate-200 rounded-full px-3 py-2 text-sm text-slate-700 hover:shadow-sm"
            aria-label="Change date range"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>{dateLabel}</span>
          </button>
        </div>

        {/* Metrics */}
        <div className="px-6 pb-8">
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            {metrics.map((m, idx) => (
              <div key={m.label} className="flex flex-col items-center py-6">
                <div className="text-slate-400 text-sm mb-3">{m.label}</div>
                <div className="text-3xl font-bold text-slate-800">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative gradient bar at bottom */}
        <div className="absolute left-0 right-0 bottom-0 h-6 md:h-8">
          <div className="h-full w-full bg-gradient-to-r from-sky-200 via-teal-100 to-transparent opacity-90 rounded-b-2xl"></div>
        </div>
      </div>
    </div>
  );
}
