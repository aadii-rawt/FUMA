import React from "react";
import { SiTrustpilot, SiMeta } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import EngagementSection from "../components/EngagementSection";

const Home: React.FC = () => {
  return (
    <div className="w-full bg-pink-100">
      {/* ----- hero --------------- */}
      <section className='min-h-screen bg-[url("/bg.png")] h-full w-full bg-center bg-cover rounded-b-3xl' />

      {/* ----- gains section (below hero) --------------- */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* logos */}
          <div className="flex items-center justify-center gap-10 sm:gap-20">
            {/* Trustpilot */}
            <div className="flex items-center gap-4">
              <SiTrustpilot className="h-10 w-10 text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-2xl font-semibold leading-none text-gray-900">
                  Trustpilot
                </span>
                <div className="mt-1 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="h-5 w-5 text-emerald-500" />
                  ))}
                </div>
              </div>
            </div>

            {/* Divider dot for spacing on mobile (hidden on lg) */}
            <div className="h-2 w-2 rounded-full bg-gray-200 lg:hidden" />

            {/* Meta */}
            <div className="flex items-center gap-4">
              <SiMeta className="h-10 w-10 text-indigo-600" />
              <div className="flex flex-col">
                <span className="text-2xl font-semibold leading-none text-gray-900">
                  Meta
                </span>
                <span className="mt-1 text-sm text-gray-500">Tech Provider</span>
              </div>
            </div>
          </div>

          {/* pill */}
          <div className="mt-14 flex justify-center">
            <button
              className="rounded-full bg-white/80 px-6 py-3 text-lg font-medium text-gray-900 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-gray-200 backdrop-blur hover:ring-gray-300 transition"
              aria-label="Gains"
            >
              Gains
            </button>
          </div>

          {/* headline */}
          <h1 className="mt-10 text-center text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
            Supercharge your{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              growth
            </span>
          </h1>

          {/* subheading */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-xl sm:text-2xl text-slate-600">
            Grow your following — and your bank account
          </p>
        </div>
      </section>

      <EngagementSection />
    </div>
  );
};

export default Home;
