import React from "react";
import { FiCheckCircle, FiLink2, FiInstagram, FiZap, FiUsers } from "react-icons/fi";

export default function Dashboard() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Get Started with Zorcha</h2>

      <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-6">
        {/* Top grid: Connect IG / Create Automation */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Connect Instagram */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-900">
                Connect your Instagram <br className="hidden sm:block" /> Page to Zorcha
              </div>

              <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                <FiCheckCircle /> Connected
              </span>
            </div>

            {/* Pretty card / art placeholder */}
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-purple-50 via-white to-purple-100 p-0.5">
              <div className="rounded-2xl bg-white/40 p-6">
                <div className="grid place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-100 via-white to-purple-100 py-14">
                  <div className="flex items-center gap-4 text-purple-600">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-600 text-white">
                      Z
                    </span>
                    <FiZap className="text-2xl opacity-70" />
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pink-100 text-pink-600">
                      <FiInstagram className="text-2xl" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Create first Automation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-900">
                Create your first <br className="hidden sm:block" /> Automation
              </div>

              <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                <FiCheckCircle /> Created
              </span>
            </div>

            {/* Pretty card / flow placeholder */}
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-0.5">
              <div className="rounded-2xl bg-white/40 p-6">
                <div className="grid place-items-center rounded-2xl bg-white py-14">
                  <div className="flex items-center gap-6 text-indigo-500">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">
                      💬
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">
                      ✈️
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100">
                      🏷️
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Refer & Earn */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="text-lg font-semibold text-gray-900">
              Refer &amp; Earn <br className="hidden sm:block" /> for Lifetime*
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4">
              <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 hover:bg-purple-100">
                <FiLink2 /> Get Link
              </button>
            </div>

            {/* Banner / art */}
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-fuchsia-50 via-white to-orange-50 p-0.5">
              <div className="rounded-2xl bg-white/60 p-6">
                <div className="h-32 rounded-2xl bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
              </div>
            </div>
          </div>

          {/* Right-side banner */}
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-amber-50 via-white to-pink-50 p-0.5">
            <div className="rounded-2xl bg-white/60 p-6">
              <div className="grid place-items-center rounded-2xl bg-white py-14">
                <div className="flex items-center gap-4 text-purple-600">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <FiUsers />
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://i.pravatar.cc/80?img=12"
                      alt=""
                    />
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://i.pravatar.cc/80?img=5"
                      alt=""
                    />
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-purple-100">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://i.pravatar.cc/80?img=36"
                      alt=""
                    />
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center max-w-sm">
                  Invite creators and brands to Zorcha and earn a commission for every paid
                  subscription they keep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
