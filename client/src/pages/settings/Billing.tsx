import { useEffect, useState } from "react";
import { FiPlusSquare, FiMessageCircle, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import useUser from "../../context/userContext";
import Axios from "../../utils/axios";

const planPrice = {
  FREE : 0,
  PRO : 199,
  ULTIMATE : 299
}

export default function Billing() {

  const [stats,setStats] = useState({
    automationCount : "0",
    messageCount : "0",
    contactCount : "0"    
  })
  const { user } = useUser()

  useEffect(() => {
    const getAutomationCount = async () => {
      if (!user) return

      try {
          const res = await Axios.get("/user/stats")
          setStats(res.data)     
      } catch (error) {

      }
    }
    getAutomationCount()
  }, [])

  return (
    <div className='f-full p-4'>
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Billing Information</h2>
          <Link to='/setting/billing/history' className="text-sm text-violet-500 underline">Billing History</Link>
        </div>
        <p className="text-gray-500">
          Update your payment information or switch plans according to your needs
        </p>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xl font-semibold text-gray-900">{user?.plan}</div>
              <div className="text-sm text-gray-500">Current Plan</div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ₹{planPrice[user?.plan] || 0}<span className="text-base font-medium text-gray-500">/mo</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-4 h-px w-full bg-gray-100" />

          {/* Feature stats */}
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {/* Automations */}
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-purple-100 text-purple-600">
                <FiPlusSquare className="text-lg" />
              </span>
              <div>
                <div className="text-sm font-semibold text-gray-800">{stats?.automationCount} {user.plan == "FREE" && "/ 3" }</div>
                <div className="text-xs text-gray-500">Automations</div>
              </div>
            </div>

            {/* DMs */}
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-purple-100 text-purple-600">
                <FiMessageCircle className="text-lg" />
              </span>
              <div>
                <div className="text-sm font-semibold text-gray-800">{stats.messageCount} {user.plan == "FREE" && "/ 1K"}</div>
                <div className="text-xs text-gray-500">DMs</div>
              </div>
            </div>

            {/* Contacts */}
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-purple-100 text-purple-600">
                <FiUser className="text-lg" />
              </span>
              <div>
                <div className="text-sm font-semibold text-gray-800">{stats.contactCount} {user.plan == "FREE" && "/ 1K" }</div>
                <div className="text-xs text-gray-500">Contacts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
