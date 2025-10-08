import React, { useState } from "react";
import { LuSearch, LuListFilter, LuPlus, LuMessageSquare } from "react-icons/lu";
import { Link } from "react-router-dom";

const Automation: React.FC = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"Last Published" | "A–Z" | "Newest">("Last Published");

  return (
    <div className="w-full rounded-xl h-full bg-[#f7f7f8] border border-gray-200 bg-white/80">
      <div className="mx-auto max-w-6xl">

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          {/* Search */}
          <div className="relative">
            <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search automations"
              className="w-[260px] rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Sort pill */}
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700">
              <LuListFilter className="text-[18px]" />
              <span className="opacity-70">Sorted by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="bg-transparent text-slate-900 outline-none"
              >
                <option>Last Published</option>
                <option>Newest</option>
                <option>A–Z</option>
              </select>
            </div>

            {/* New Automation */}
            <Link to="/automation/new" className="inline-flex items-center gap-2 rounded-xl bg-[#6E32FF] px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95">
              <LuPlus className="text-[18px]" />
              New Automation
            </Link>
          </div>
        </div>

        {/* Empty state card */}
        <div className="px-4 pb-6 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-[#fbfbfc] p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No automations yet</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Create your first automation to start engaging with your Instagram followers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
