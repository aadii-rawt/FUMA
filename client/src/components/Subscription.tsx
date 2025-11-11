import React from "react";
import {
  FiX,
  FiCheck,
  FiZap,
  FiMessageCircle,
  FiUsers,
  FiClipboard,
} from "react-icons/fi";
import useUser from "../context/userContext";


export default function Subscription() {

  const { setShowSubscriptionModal,setIsPriceModalOpen } = useUser()

  const onClose = () => {
    setIsPriceModalOpen(true)
    setShowSubscriptionModal(false)
  }
  return (
    <div className="fixed inset-0 z-[100]">
      {/* dim */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2">
        <div className="relative rounded-[28px] border border-white/50 bg-white/90 shadow-2xl">
          {/* close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            aria-label="Close"
          >
            <FiX />
          </button>

          {/* header */}
          <div className="px-10 pt-10 text-center">
            {/* crown pill */}
            <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 p-[2px] shadow-lg">
              <div className="h-full w-full rounded-2xl bg-white/90 grid place-items-center">
                <span className="text-2xl text-purple-600">👑</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Unlock your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">Growth</span>
            </h2>

            {/* <p className="mt-2 text-sm text-yellow-600">
              You’ve exceeded your free tier limits!
              <br />
              Don’t stop now—scale beyond the free tier
            </p> */}

            {/* progress-ish bar */}
            <div className="mx-auto mt-5 h-2 w-full max-w-[420px] rounded-full bg-gray-200">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 relative">
                <span className="absolute -right-[6px] -top-[5px] h-3.5 w-3.5 rounded-full bg-amber-400 ring-4 ring-amber-300/40" />
              </div>
            </div>
          </div>


          {/* features */}
          <div className="mt-6 grid gap-3 px-10 pb-8">
            <Feature icon={<FiZap />} text="Unlimited Automations" />
            <Feature icon={<FiMessageCircle />} text="Unlimited DMS" />
            <Feature icon={<FiUsers />} text="Unlimited Contacts" />
            <Feature icon={<FiClipboard />} text="Unlimited Leads" />
          </div>

          {/* cta */}
          <div className="px-10 pb-10">
            <button
              onClick={onClose}
              className="mx-auto border-none outline-none flex h-12 w-full max-w-[420px] cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-base font-semibold text-white shadow-lg hover:opacity-95"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-0">
      <div className="flex items-center gap-1">
        <span className="grid h-9 w-9 place-items-center  text-purple-600 text-lg">
          {icon}
        </span>
        <span className="text-[15px] font-medium text-gray-800">{text}</span>
      </div>
      <span className="grid h-6 w-6 place-items-center rounded-full bg-purple-100 text-purple-700">
        <FiCheck />
      </span>
    </div>
  );
}
