import React from "react";
import { SiTrustpilot, SiMeta } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { PiSparkle } from "react-icons/pi";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* ----- hero --------------- */}
      
      {/* <section className='min-h-screen bg-[url("/bg.png")] h-full w-full bg-center bg-cover rounded-b-3xl' /> */}
      <div className=" min-h-screen">
        <section className="relative py-12 bg-white sm:py-16 lg:py-20">
          <div className="absolute inset-0">
            <img className="object-cover w-full h-full" src="/pricing-bg.png" alt="" />
          </div>

          <div className="relative mt-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-6xl">
                Effortless DMs <br /> big results
              </h1>
              <p className="max-w-md mx-auto mt-6 text-base font-normal leading-7 text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
              </p>

              <form action="#" method="POST"
                className="max-w-md mx-auto mt-8 space-y-4 sm:space-x-4 sm:flex sm:space-y-0 sm:items-end">
                <div className="flex-1">
                  <label  className="sr-only">
                    Email address
                  </label>
                  <div>
                    <input type="email" name="" id=""
                      className="block w-full px-4 py-3 sm:py-3.5 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg  sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                      placeholder="Email address" />
                  </div>
                </div>

                <div className="relative group">
                  <div
                    className="absolute transitiona-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200">
                  </div>

                  <button type="button"
                    className="inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                    Join Now
                  </button>
                </div>
              </form>

              <ul className="flex items-center justify-center mt-6 space-x-6 sm:space-x-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-medium text-gray-900 sm:text-sm">
                    Weekly new articles
                  </span>
                </li>

                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-medium text-gray-900 sm:text-sm">
                    Join other 1600+ Devs
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex w-full gap-6 pb-8 mt-12 overflow-x-auto sm:mt-16 lg:mt-20 snap-x">
            <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
              <div
                className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-1.png"
                        alt="" />
                    </a>

                    <div className="flex-1 ml-4 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          Growth
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                        <a href="#" title="" className="">
                          How a visual artist redefines success in graphic design
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
              <div
                className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-2.png"
                        alt="" />
                    </a>

                    <div className="flex-1 ml-4 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          Growth
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                        <a href="#" title="" className="">
                          How a visual artist redefines success in graphic design
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
              <div
                className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-3.png"
                        alt="" />
                    </a>

                    <div className="flex-1 ml-4 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          Growth
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                        <a href="#" title="" className="">
                          How a visual artist redefines success in graphic design
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
              <div
                className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-4.png"
                        alt="" />
                    </a>

                    <div className="flex-1 ml-4 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          Growth
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                        <a href="#" title="" className="">
                          How a visual artist redefines success in graphic design
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
              <div
                className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-5.png"
                        alt="" />
                    </a>

                    <div className="flex-1 ml-4 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          Growth
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                        <a href="#" title="" className="">
                          How a visual artist redefines success in graphic design
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

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

      <div className="overflow-x-hidden ">
        <section className="pt-12 bg-gray-50 sm:pt-16">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="max-w-2xl mx-auto text-center">
                      <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                         How FUMA Automates Your Viral 
                          <span className="relative inline-flex sm:inline">
                              <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                              <span className="relative"> Journey </span>
                          </span>
                      </p>

                      <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
                          <a
                              href="#"
                              title=""
                              className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                              role="button"
                          >
                              Get more customers
                          </a>

                          <a
                              href="#"
                              title=""
                              className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-lg font-bold text-gray-900 transition-all duration-200 border-2 border-gray-400 sm:w-auto sm:mt-0 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 focus:bg-gray-900 hover:text-white focus:text-white hover:border-gray-900 focus:border-gray-900"
                              role="button"
                          >
                              <svg className="w-5 h-5 mr-2" viewBox="0 0 18 18" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M8.18003 13.4261C6.8586 14.3918 5 13.448 5 11.8113V5.43865C5 3.80198 6.8586 2.85821 8.18003 3.82387L12.5403 7.01022C13.6336 7.80916 13.6336 9.44084 12.5403 10.2398L8.18003 13.4261Z"
                                      stroke-width="2"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                  />
                              </svg>
                              Watch free demo
                          </a>
                      </div>

                      <p className="mt-8 text-base text-gray-500 font-inter">60 Days free trial · No credit card required</p>
                  </div>
              </div>

              <div className="pb-12 bg-white">
                  <div className="relative">
                      <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
                      <div className="relative mx-auto">
                          <div className="lg:max-w-6xl lg:mx-auto">
                              <img className="transform scale-110" src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png" alt="" />
                          </div>
                      </div>
                  </div>
              </div>
        </section>
      </div>

    </div>
  );
};

export default Home;
