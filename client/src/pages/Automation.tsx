import React, { useEffect, useState } from "react";
import { LuSearch, LuListFilter, LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import useUser from "../context/userContext";
import Axios from "../utils/axios";
          {/* JSX only — paste inside your page/render (React + TS). Uses Tailwind classes and react-icons */}
import { RiRobot2Line, RiStarLine, RiMore2Fill } from "react-icons/ri";

const Automation: React.FC = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"Last Published" | "A–Z" | "Newest">("Last Published");
  const [automations,setAutomations] = useState(null)

  useEffect(()=> {
    const getautomation = async ( ) => {
        const res = await Axios.get("/automation")
        console.log(res.data);
        setAutomations(res.data)
        
    }
    getautomation()
  },[])

  const {user} = useUser()
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
        {automations?.length > 0 ? 
        <div className="mx-4 rounded-xl border border-gray-200 bg-white">
          {/* Header */}
          <div className="flex items-center px-4 sm:px-6 py-3 text-sm font-medium text-gray-500">
            <div className="w-[46%] sm:w-[50%]">Automation</div>
            <div className="w-[12%] hidden sm:block">Runs</div>
            <div className="w-[16%] sm:w-[14%]">Status</div>
            <div className="w-[22%] sm:w-[20%]">Last Published</div>
            <div className="w-[10%] sm:w-[6%]" />
          </div>

          <div className="divide-y">
            {automations.map((auto, idx) => (
              <div
                key={idx}
                className="flex items-center px-4 sm:px-6 py-4 hover:bg-gray-50"
              >
                {/* Automation col */}
                <div className="w-[46%] sm:w-[50%] flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                    <RiRobot2Line className="text-green-600 text-lg" />
                  </div>
                  <div className="text-gray-900">{auto.name}</div>
                </div>

                {/* Runs col */}
                <div className="w-[12%] hidden sm:block text-gray-700">{auto.runs}</div>

                {/* Status col */}
                <div className="w-[16%] sm:w-[14%]">
                  {auto.status === "Live" ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      Draft
                    </span>
                  )}
                </div>

                {/* Last Published */}
                <div className="w-[22%] sm:w-[20%] text-gray-700">{auto.createdAt}</div>

                {/* Actions */}
                <div className="w-[10%] sm:w-[6%] flex items-center justify-end gap-3">
                  <RiStarLine className="text-gray-400 text-xl hover:text-yellow-400 cursor-pointer" />
                  <RiMore2Fill className="text-gray-500 text-xl cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
        :
        <div className="px-4 pb-6 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-[#fbfbfc] p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No automations yet</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Create your first automation to start engaging with your Instagram followers.
            </p>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default Automation;
