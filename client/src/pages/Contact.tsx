import React, { useEffect, useMemo, useState } from "react";
import { LuListFilter } from "react-icons/lu";
import Axios from "../utils/axios";
import useUser from "../context/userContext";
import { AutomationShimmer } from "../components/shimmer/AutomatinShimmer";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

type ContactType = {
  id: string;
  username: string;
  email?: string;
  createdAt: string;
  // add other fields you use
};

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [q, setQ] = useState<string>("");
  const [sort, setSort] = useState<"last" | "name">("last");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const navigate = useNavigate();
  const { user } = useUser();

  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    const getContacts = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res = await Axios.get("/contacts", {
          params: {
            page,
            limit,
            q: q || undefined,
            sort,
          },
        });
        // expected: { data, total, page, limit }
        setContacts(res.data.data || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Error fetching contacts", err);
      } finally {
        setLoading(false);
      }
    };

    getContacts();
  }, [page, limit, q, sort, user]);

  // reset page when searching
  const handleSearchChange = (val: string) => {
    setQ(val);
    setPage(1);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 2;
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
          className={`px-3 py-0.5 cursor-pointer text-sm rounded-md border border-gray-400  ${p === page ? "bg-violet-600 text-white border-violet-600" : "bg-white"
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
      <div className="flex sticky top-0 left-0 bg-[#f1f1f1] rounded-xl  flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div>
            <input
              value={q}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search contacts"
              className="w-[260px] rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-3 text-sm placeholder:text-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700">
            <LuListFilter className="text-[18px]" />
            <span className="opacity-70">Sorted by</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as any);
                setPage(1); // reset to first page on sort change
              }}
              className="bg-transparent text-slate-900 outline-none"
            >
              <option value="last">Last</option>
              <option value="name">A–Z</option>
            </select>
          </div>
        </div>

        <div>
          <Link to="#" className="inline-flex items-center gap-2 rounded-xl bg-[#6E32FF] px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95">
            Export Contacts
          </Link>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <AutomationShimmer />
      ) : contacts.length > 0 ? (
        <>
          <div className="mx-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-gray-500 font-medium">
                  <th className="px-2 md:px-6 py-3">Contact</th>
                  <th className="px-2 md:px-6 py-3 text-center">Last Interaction</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((c, idx) => (
                  <tr
                    key={c.id ?? idx}
                    className="border-b cursor-default border-gray-100 hover:bg-gray-50 transition"
                    onClick={() => {
                      /* change if you want to navigate to contact page */
                      // navigate(`/contacts/${c.id}`, { state: { contact: c } });
                    }}
                  >
                    <td className=" px-2 md:px-6 py-3 text-gray-900 flex items-center gap-3">
                      <span className="w-7 h-7 flex items-center justify-center text-lg font-semibold bg-violet-300/20 text-violet-600 rounded text-center">
                        <h1>{c.username?.[0]?.toUpperCase() || "?"}</h1>
                      </span>
                      <div>
                        <div className="font-medium">{c.username}</div>
                      </div>
                    </td>

                    <td className="px-2 md:px-6 py-3 text-gray-500 text-center">{formatDate(c.createdAt)}</td>
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
            <h3 className="text-lg font-semibold text-slate-800">No contacts yet</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">No contacts found.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
