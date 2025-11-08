import React, { useEffect, useMemo, useState } from "react";
import { FiSearch, FiDownload, FiChevronDown, FiCalendar } from "react-icons/fi";
import Axios from "../utils/axios";
import useUser from "../context/userContext";
import { AutomationShimmer } from "../components/shimmer/AutomatinShimmer";

import { LuSearch, LuListFilter, LuPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { PiLinkSimpleLight } from "react-icons/pi";
import { formatDate } from "../utils/formatDate";


const Contacts: React.FC = () => {
    const [contacts, setContacts] = useState([])
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<"last" | "name">("last");
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState<Boolean>(true)
    const navigate = useNavigate()

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let arr = contacts.filter(
            (c) => c.username.toLowerCase().includes(q) || (c.email || "").toLowerCase().includes(q)
        );
        if (sort === "name") {
            arr = arr.slice().sort((a, b) => a.username.localeCompare(b.username));
        }
        // "last" keeps original order in sample; in real app you'd sort by date
        return arr;
    }, [contacts, query, sort]);


    useEffect(() => {
        const getContacts = async () => {
            try {
                const res = await Axios.get("/contacts")
                console.log(res);

                setContacts(res.data.contacts)
            } catch {
                console.log("Error fetching contacts")
            } finally {
                setLoading(false)
            }
        }
        getContacts()
    }, [])

    return (
  <div className="w-full rounded-xl h-full bg-[#f1f1f1] overflow-y-scroll pb-5  border-[1px] border-gray-500/20">



            {/* Controls */}
            <div className="flex sticky top-0 left-0 bg-[#f1f1f1] rounded-xl  flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
                {/* Search */}


                <div className="flex items-center gap-3">
                    <div>

                        {/* <LuSearch className=" text-grat-800" /> */}
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search automations"
                            className="w-[260px] rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                        />
                    </div>
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

                </div>



                {/* New Automation */}
                <Link to="/automation/new" className="inline-flex items-center gap-2 rounded-xl bg-[#6E32FF] px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95">
                    {/* <LuPlus className="text-[18px]" /> */}
                 Export Contacts
                </Link>
            </div>

            {/* Empty state card */}
            {loading ? <AutomationShimmer /> : contacts.length > 0 ?
                <div className="mx-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <table className="w-full text-sm text-gray-700">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-left text-gray-500 font-medium">
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3 text-center">Last Intrection</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts?.map((auto, idx) => (
                                <tr
                                    onClick={() => navigate(`/automation/${auto.id}`, { state: { post: auto } })}
                                    key={idx}
                                    className="border-b cursor-pointer border-gray-100 hover:bg-gray-50 transition"
                                >
                                    {/* Automation Name */}
                                    <td className="px-6 py-3 text-gray-900 flex items-center gap-3">
                                        <span className="w-7 h-7 flex items-center justify-center text-lg font-semibold bg-violet-300/20 text-violet-600 rounded text-center">
                                            <h1>{auto.username[0]}</h1>
                                        </span>
                                        {auto.username}
                                    </td>



                                    {/* Last Published */}
                                    <td className="px-6 py-3 text-gray-500 text-center">
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
    )
};
export default Contacts;