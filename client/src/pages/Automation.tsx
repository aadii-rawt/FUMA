import React, { useEffect, useState } from "react";
import { LuSearch, LuListFilter, LuPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../context/userContext";
import Axios from "../utils/axios";
import { AutomationShimmer } from "../components/shimmer/AutomatinShimmer";
import { formatDate } from "../utils/formatDate";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

type AutomationType = {
  id: string;
  name: string;
  postThumbnail?: string;
  keywords?: string[];
  clickCount?: number;
  status?: "LIVE" | string;
  createdAt: string;
};

const Automation: React.FC = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"Last Published" | "A–Z" | "Newest">("Last Published");
  const [automations, setAutomations] = useState<AutomationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();
  const navigate = useNavigate();

  // pagination state
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  // helper: total pages
  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    const getAutomation = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res = await Axios.get("/automation", {
          params: {
            page,
            limit,
            q: q || undefined, // include q only if not empty
            // optionally: sort param
          },
        });
        // expected shape: { data, total, page, limit }
        setAutomations(res.data.data || []);
        setTotal(res.data.total || 0);
      } catch (error) {
        console.error("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };

    getAutomation();
  }, [page, limit, q, user]);

  // when user types search, reset to page 1
  const handleSearchChange = (val: string) => {
    setQ(val);
    setPage(1);
  };

  // render page buttons (simple logic: show up to 7 page buttons)
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 7;
    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let p = start; p <= end; p++) {
      buttons.push(
        <button
          key={p}
          onClick={(e) => {
            e.stopPropagation();
            setPage(p);
          }}
          className={`px-3 py-0.5 cursor-pointer text-sm rounded-md border border-gray-400 ${p === page ? "bg-violet-600 text-white border-violet-600" : "bg-white"
            }`}
        >
          {p}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="w-full rounded-xl h-full bg-[#f1f1f1] overflow-y-scroll pb-5  border-[1px] border-gray-500/20">
      {/* Controls */}
      <div className="flex sticky top-0 left-0 bg-[#f1f1f1]  flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
        {/* Search */}
        <div className="relative">
          <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => handleSearchChange(e.target.value)}
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
      {loading ? (
        <AutomationShimmer />
      ) : automations.length > 0 ? (
        <>
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
                {automations.map((auto, idx) => (
                  <tr
                    onClick={() => navigate(`/automation/${auto.id}`, { state: { post: auto } })}
                    key={auto.id ?? idx}
                    className="border-b cursor-pointer border-gray-100 hover:bg-gray-50 transition"
                  >
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

                    <td className="px-6 py-2 text-gray-400 text-center">{auto.clickCount}</td>

                    <td className="px-6 py-2 text-center">
                      {auto.status === "LIVE" ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Live</span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Stop</span>
                      )}
                    </td>

                    <td className="px-6 py-2 text-gray-500 text-center">{formatDate(auto.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-4">
            <div className="text-sm text-gray-400">
              Showing {(page - 1) * limit + 1} -{" "}
              {Math.min(page * limit, total)} of {total}
            </div>

            <div className="flex items-center gap-2">
              {page != 1 && <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPage((p) => Math.max(1, p - 1));
                }}
                disabled={page === 1}
                className="px-3 py-1 cursor-pointer rounded-md border border-gray-400 bg-white disabled:opacity-50"
              >
                <GrFormPrevious />
              </button>
              }
              <div className="flex gap-1 text-sm">{renderPageButtons()}</div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md border cursor-pointer border-gray-400 bg-white disabled:opacity-50"
              >
                <MdOutlineNavigateNext />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="px-4 pb-6 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-[#fbfbfc] p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No automations yet</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Create your first automation to start engaging with your Instagram followers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automation;
