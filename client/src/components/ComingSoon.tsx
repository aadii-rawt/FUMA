import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi2";

/**
 * ComingSoon.tsx
 * Exact UI replica of the provided "Cooking Our Website" coming-soon section
 * Stack: React + TypeScript + Tailwind CSS
 */

const Blob = ({ className = "" }: { className?: string }) => (
  <div
    className={
      "pointer-events-none absolute blur-3xl opacity-60 " + className
    }
  />
);

const Squiggle = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={"absolute w-10 h-10 " + className}
    aria-hidden
  >
    <path
      d="M6 40c6-10 14 10 20 0s14 10 20 0"
      fill="none"
      strokeWidth="8"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

const TopBadge = () => (
  <div className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2">
    <div className="bg-white/90 backdrop-blur border border-slate-200 shadow-[0_10px_25px_rgba(2,6,23,0.08)] rounded-[28px] px-5 py-2.5 flex items-center gap-2">
      <span className="grid place-items-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-sm">•</span>
      <span className="text-slate-700 font-medium">Designknot</span>
    </div>
  </div>
);

const ThumbEmoji = () => (
  <div className="text-5xl select-none" aria-hidden>
    👍
  </div>
);

const NotifyButton = () => (
  <button
    type="button"
    className="group inline-flex items-center gap-3 rounded-full bg-slate-900 text-white pl-4 pr-5 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.25)] hover:shadow-[0_22px_50px_rgba(2,6,23,0.28)] transition-shadow"
  >
    <span className="grid place-items-center w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/20">
      <HiOutlineMail className="w-5 h-5" />
    </span>
    <span className="text-[15px] font-semibold tracking-wide">Notify Me</span>
    <HiChevronRight className="w-5 h-5 translate-x-0 transition-transform group-hover:translate-x-0.5" />
  </button>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="uppercase tracking-[0.2em] text-[12px] text-slate-500">{children}</span>
);

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#f8fbff] to-white rounded-[32px] border border-slate-100">
      {/* soft background blobs */}
      <Blob className="w-[45rem] h-[45rem] bg-[radial-gradient(closest-side,rgba(56,189,248,0.25),transparent)] -left-20 -top-24" />
      <Blob className="w-[38rem] h-[38rem] bg-[radial-gradient(closest-side,rgba(244,114,182,0.20),transparent)] -right-20 -top-28" />
      <Blob className="w-[36rem] h-[36rem] bg-[radial-gradient(closest-side,rgba(167,243,208,0.25),transparent)] -left-24 bottom-10" />

      {/* decorative squiggles */}
      <Squiggle className="text-green-700/30 left-10 bottom-28 rotate-40" />
      <Squiggle className="text-amber-600/50 right-14 bottom-20 -rotate-20" />

      {/* content card */}
      <div className="relative mx-auto max-w-3xl text-center pt-24 pb-24 px-6">
        {/* <TopBadge /> */}

        <div className="mb-6">
          <ThumbEmoji />
        </div>

        <Pill>We're still</Pill>

        <h1 className="mt-4 text-4xl sm:text-5xl md:text-[64px] leading-[1.1] font-extrabold text-blue-600 tracking-tight">
          Cooking Our Website.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-500">
          We are going to launch our website Very Soon.
          <br />
          Stay Tune.
        </p>

        <div className="mt-10">
          <NotifyButton />
        </div>

        {/* ground shadow under button */}
        <div className="pointer-events-none mx-auto mt-8 h-10 w-64 rounded-full bg-slate-900/10 blur-2xl" />
      </div>
    </div>
  );
}
