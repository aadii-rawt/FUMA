import React from "react";
import { SiTrustpilot, SiMeta } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { PiSparkle } from "react-icons/pi";

const Home: React.FC = () => {
  return (
    <div className="w-full">
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


      {/* ---------- Two-card benefits (inline, same page, no new component) ---------- */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Card 1 */}
            <div className="rounded-[32px] p-[1.5px] bg-gradient-to-r from-orange-300 to-orange-500">
              <div className="rounded-[30px] bg-white/95 backdrop-blur-sm">
                <div className="relative p-8 sm:p-12">
                  <div className="max-w-xl">
                    <h3 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] text-slate-900">
                      Maximise <br /> Link Clicks
                    </h3>
                    <p className="mt-6 text-lg text-slate-600">
                      Stop relying on bio links. Instantly send clickable links via DM,
                      amplifying clicks and conversion rates.
                    </p>
                  </div>

                  {/* micro UI cluster */}
                  <div className="mt-12">
                    <div className="flex flex-col gap-4">
                      <div className="inline-flex items-center gap-3 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-gray-200 px-4 py-2 w-fit">
                        <div className="h-6 w-6 rounded-md bg-violet-600" />
                        <span className="text-sm text-slate-700">
                          When comment includes{" "}
                          <span className="font-semibold">Send Tool</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-5 w-0.5 bg-slate-300 rounded-full" />
                        <div className="inline-flex items-center gap-2 rounded-2xl border border-violet-300/60 bg-white px-4 py-2 shadow-[0_10px_30px_rgba(124,58,237,0.12)]">
                          <div className="h-5 w-5 rounded-md bg-violet-600" />
                          <span className="text-sm font-semibold text-violet-700">
                            Send DM with Link
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* soft dotted background on the right */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 left-[48%] opacity-40">
                    <div className="h-full w-full bg-[radial-gradient(circle,_rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:18px_18px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[32px] p-[1.5px] bg-gradient-to-r from-orange-300 to-orange-500">
              <div className="rounded-[30px] bg-white/95 backdrop-blur-sm">
                <div className="relative p-8 sm:p-12">
                  <div className="max-w-xl">
                    <h3 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] text-slate-900">
                      Unlock More <br /> Brand Deals
                    </h3>
                    <p className="mt-6 text-lg text-slate-600">
                      Brands prioritise engagement when partnering with creators. With
                      higher reel interactions and link clicks, close more deals at top
                      rates.
                    </p>
                  </div>

                  {/* stat bubbles */}
                  <div className="mt-12">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="inline-flex items-center gap-3 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-gray-200 px-4 py-2">
                        <div className="h-6 w-6 rounded-lg bg-black/5 grid place-items-center">
                          <div className="h-3 w-3 rounded-full bg-black/50" />
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold text-slate-900 leading-none">
                            1.4K
                          </div>
                          <div className="text-[11px] text-slate-500 -mt-0.5">
                            Comments
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-emerald-500">
                          +23%
                        </div>
                      </div>

                      <div className="h-5 w-0.5 bg-slate-300 rounded-full" />

                      <div className="inline-flex items-center gap-3 rounded-2xl border border-fuchsia-300/60 bg-white px-4 py-2 shadow-[0_10px_30px_rgba(236,72,153,0.12)]">
                        <div className="h-5 w-5 rounded-md bg-fuchsia-600" />
                        <div className="text-sm">
                          <div className="font-semibold text-slate-900 leading-none">
                            7.1K
                          </div>
                          <div className="text-[11px] text-slate-500 -mt-0.5">
                            Link Clicks
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-500">
                          +79%
                        </span>
                      </div>
                    </div>

                    {/* ghost phone panel */}
                    <div className="mt-6 rounded-3xl bg-gradient-to-br from-slate-50 to-white ring-1 ring-slate-200/70 shadow-[inset_0_0_60px_rgba(0,0,0,0.04)] p-6">
                      <div className="text-4xl sm:text-5xl font-extrabold text-slate-900">
                        1,001,429
                      </div>
                      <div className="text-sm text-slate-500">Accounts reached</div>
                      <div className="text-xs text-emerald-500 mt-1">
                        +53.7% vs Last Week
                      </div>
                    </div>
                  </div>

                  {/* soft purple wash on the right */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 left-[55%] opacity-40">
                    <div className="h-full w-full bg-[radial-gradient(80%_120%_at_70%_20%,rgba(124,58,237,0.16),transparent)]" />
                  </div>
                </div>
              </div>
            </div>
            {/* /Card 2 */}
          </div>
        </div>
      </section>
      {/* ---------- /Two-card benefits ---------- */}

      
      {/* ----- CTA: Step into the future ----- */}
<section className="w-full">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
    <h2 className="text-center text-2xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-slate-900">
      Step into the future of
      <br />
      <span className="block">DM Automations</span>
    </h2>

    <p className="mx-auto mt-6 max-w-4xl text-center text-xl sm:text-xl text-slate-500">
      Join thousands of creators &amp; brands using Zorcha to grow engagement,
      build connections, &amp; monetize their following.
    </p>

    <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4 sm:gap-6">
      {/* Primary button */}
      <a
        href="#"
        className="group inline-flex items-center gap-3 rounded-[22px] sm:rounded-[28px] 
                   bg-violet-700 text-white  font-semibold
                   px-6 py-3 sm:px-10 sm:py-5
                   shadow-[0_12px_30px_rgba(109,40,217,0.35)]
                   ring-1 ring-violet-800/40 hover:brightness-110 transition"
      >
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/15">
          <PiSparkle className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        Start For Free
      </a>

      {/* Secondary button */}
      <a
        href="#"
        className="inline-flex items-center justify-center rounded-[22px] sm:rounded-[28px]
                   bg-white text-slate-900  font-semibold
                   px-6 py-3 sm:px-10 sm:py-5
                   ring-1 ring-slate-200 shadow-[0_10px_25px_rgba(0,0,0,0.06)]
                   hover:ring-slate-300 transition"
      >
        See Pricing
      </a>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
