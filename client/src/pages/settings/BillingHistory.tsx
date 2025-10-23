import React, { useEffect, useState } from "react";
import {
  FiDownload,
  FiCreditCard,
  FiSmartphone,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Axios from "../../utils/axios";

export default function BillingHistory() {

    const [history,setHistory] = useState(null)

    useEffect(() => {
      const getHistory = async () => {
          const res = await Axios.get("/subscriptions/history")
          console.log(res.data.data);
        setHistory(res.data.data)
      }
      getHistory()
    },[])
  return (
      <div className="min-h-screen grid place-items-center p-4 lg:p-10">
      {/* Card */}
      <div className="w-full min-h-[520px] max-w-3xl px-3 py-4 rounded-3xl bg-white  border-2 border-gray-100 overflow-hidden">
    <section className="space-y-3">
        <div className="flex gap-3 items-center">
            <Link to='/setting/billing'><IoMdArrowBack size={22} /></Link>
            <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
        </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          {/* Head */}
          <thead className="bg-gray-50 text-gray-600">
            <tr className="text-left">
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Description</th>
              <th className="px-5 py-3 font-medium">Method</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Invoice</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {/* Row 1 */}
            {history?.map((subs) => (
                <tr>
                <td className="px-5 py-4 whitespace-nowrap">{subs?.createdAt}</td>
                <td className="px-5 py-4">
                    <div className="font-medium">{subs.planTitle} — {subs.interval}</div>
                    <div className="text-xs text-gray-500">Razorpay • {subs.paymentId}</div>
                </td>
                <td className="px-5 py-4">
                    <div className="inline-flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-purple-100 text-purple-600">
                        <FiCreditCard />
                    </span>
                    <span className="text-xs text-gray-600">Card • **** 1234</span>
                    </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">₹{subs.amountTotal / 100}</td>
                <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <FiCheckCircle /> Paid
                    </span>
                </td>
                <td className="px-5 py-4 text-right">
                    <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                    <FiDownload /> PDF
                    </button>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </div>
    </div>
  );
}
