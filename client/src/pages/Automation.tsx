import React, { useEffect, useState } from "react";
import { LuSearch, LuListFilter, LuPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../context/userContext";
import Axios from "../utils/axios";
import { PiLinkSimpleLight } from "react-icons/pi";
import { AutomationShimmer } from "../components/shimmer/AutomatinShimmer";
import { formatDate } from "../utils/formatDate";

const Automation: React.FC = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"Last Published" | "A–Z" | "Newest">("Last Published");
  const [automations, setAutomations] = useState(null);
  const [loading, setLoading] = useState<Boolean>(true)
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    const getautomation = async () => {
      if (!user) return
      try {
        setLoading(true)
        const res = await Axios.get("/automation")
        setAutomations(res.data)
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false)
      }
    }
    getautomation()
  }, [])
  return (
    <div className="w-full rounded-xl h-full bg-[#f1f1f1] overflow-y-scroll pb-5  border-[1px] border-gray-500/20">


      {/* Controls */}
      <div className="flex sticky top-0 left-0 bg-[#f1f1f1]  flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
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
      {loading ? <AutomationShimmer /> : automations.length > 0 ?
        <div className="mx-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-gray-500 font-medium">
                <th className="px-6 py-3">Automation</th>
                <th className="px-6 py-3 text-center">Runs</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Last Published</th>
              </tr>
            </thead>

            <tbody>
              {automations?.map((auto, idx) => (
                <tr
                  onClick={() => navigate(`/automation/${auto.id}`, { state: { post: auto } })}
                  key={idx}
                  className="border-b cursor-pointer border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* Automation Name */}
                  <td className="px-6 py-2 text-gray-900 flex items-center gap-3">
                    <span className=" overflow-hidden bg-green-300/20 rounded text-center">

                      <img src={auto?.postThumbnail} alt="" className="w-10 h-14" />
                    </span>
                    <div>
                      <h1 className="font-medium"> {auto.name}</h1>
                      <div className="flex items-center gap-2 text-xs mt-1 text-gray-400">
                        {auto?.keywords?.slice(0, 3).map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="bg-violet-100 text-violet-500 px-2 py-0.5 rounded-full text-[11px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}

                        {auto?.keywords?.length > 3 && (
                          <span className="bg-violet-100 text-violet-500 px-2 py-0.5 rounded-full text-[11px] font-medium">
                            +{auto.keywords.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>


                  <td className="px-6 py-2 text-gray-400 text-center">
                    {auto.clickCount}
                  </td>

                  <td className="px-6 py-2 text-center">
                    {auto.status === "LIVE" ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Stop
                      </span>
                    )}
                  </td>

                  {/* Last Published */}
                  <td className="px-6 py-2 text-gray-500 text-center">
                    {formatDate(auto.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  );
};

export default Automation;
