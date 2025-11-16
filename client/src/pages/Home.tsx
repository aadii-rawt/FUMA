
import React, { useEffect, useMemo, useState } from "react";
import { SiTrustpilot, SiMeta } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { LuClapperboard, LuBot, LuMegaphone, LuMessageCircle } from "react-icons/lu";
import FAQ from "../components/FAQ";
import { Link } from "react-router-dom";

const Home: React.FC = () => {

  return (
    <div className="w-full">
      {/* ----- hero --------------- */}
      <div className="">
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
                Empower your creator business with AutoDM integrations — from Amazon to Nykaa, automate your affiliate income without lifting a finger.
              </p>

              <form action="#" method="POST"
                className="max-w-md mx-auto mt-8 space-y-4 sm:space-x-4 sm:flex sm:space-y-0 sm:items-end">
                <div className="flex-1">
                  <label className="sr-only">
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

                  <Link to="/auth/signup"
                    className="inline-flex relative items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-primary border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                    Join Now
                  </Link>
                </div>
              </form>

              <ul className="flex items-center justify-center mt-6 space-x-6 sm:space-x-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-medium text-gray-900 sm:text-sm">
                    Automation
                  </span>
                </li>

                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-medium text-gray-900 sm:text-sm">
                    Growth
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="marquee mt-12 sm:mt-16 lg:mt-20 pb-8">
            <div className="marquee__inner">
              {/* === Group A === */}
              <div className="marquee__group py-2">
                {/* CARD 1 */}
                <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
                  <div className="card overflow-hidden w-[300px] lg:w-[420px] bg-white border border-gray-200 rounded-2xl">
                    <div className="px-4 py-5 sm:p-5">
                      <div className="flex items-start lg:items-center">
                        <img
                          className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                          src="https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66da9ced61739d7327618e55_95.png"
                          alt="Meesho"
                        />
                        <div className="flex-1 ml-4 lg:ml-6">
                          <p className="text-xs font-medium text-gray-900 lg:text-sm">Meesho</p>
                          <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg">
                            Brands you can connect with instantly
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 2 */}
                <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
                  <div className="card overflow-hidden w-[300px] lg:w-[420px] bg-white border border-gray-200 rounded-2xl">
                    <div className="px-4 py-5 sm:p-5">
                      <div className="flex items-start lg:items-center">
                        <img
                          className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                          src="https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66c074d12514da9000bf6437_66c0701a1ef0c15101c97d4e_77.png"
                          alt="Nykaa"
                        />
                        <div className="flex-1 ml-4 lg:ml-6">
                          <p className="text-xs font-medium text-gray-900 lg:text-sm">Nykaa</p>
                          <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg">
                            Automate DMs for your favorite stores
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 3 */}
                <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
                  <div className="card overflow-hidden w-[300px] lg:w-[420px] bg-white border border-gray-200 rounded-2xl">
                    <div className="px-4 py-5 sm:p-5">
                      <div className="flex items-start lg:items-center">
                        <img
                          className="lg:h-24 w-14 h-18 lg:w-24 rounded-xl object-cover"
                          src="https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66c07611cdd922093c5c24f4_98.webp"
                          alt="Flipkart"
                        />
                        <div className="flex-1 ml-4 lg:ml-6">
                          <p className="text-xs font-medium text-gray-900 lg:text-sm">Flipkart</p>
                          <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg">
                            Turn comments into conversions with AutoDM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 4 */}
                <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
                  <div className="card overflow-hidden w-[300px] lg:w-[420px] bg-white border border-gray-200 rounded-2xl">
                    <div className="px-4 py-5 sm:p-5">
                      <div className="flex items-start lg:items-center">
                        <img
                          className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                          src="https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66dc1ddef8cc06b6c602b90a_101.webp"
                          alt="Myntra"
                        />
                        <div className="flex-1 ml-4 lg:ml-6">
                          <p className="text-xs font-medium text-gray-900 lg:text-sm">Myntra</p>
                          <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg">
                            Seamless AutoDM integration with top brands
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 5 */}
                <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
                  <div className="card overflow-hidden w-[300px] lg:w-[420px] bg-white border border-gray-200 rounded-2xl">
                    <div className="px-4 py-5 sm:p-5">
                      <div className="flex items-start lg:items-center">
                        <img
                          className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cover"
                          src="https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66c076b23bd404abda6c76b7_64.webp"
                          alt="Ajio"
                        />
                        <div className="flex-1 ml-4 lg:ml-6">
                          <p className="text-xs font-medium text-gray-900 lg:text-sm">Ajio</p>
                          <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg">
                            Your all-in-one AutoDM solution for creators
                          </p>
                        </div>
                      </div>
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5 sm:py-20">
          {/* logos */}
          <div className="flex items-center justify-center gap-10 sm:gap-20">
            {/* Trustpilot */}
            <div className="flex items-center gap-4">
              <SiTrustpilot className="h-7 w-7 d:h-10 md:w-10 text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-semibold leading-none text-gray-900">
                  Trustpilot
                </span>
                <div className="mt-1 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="md:h-5 md:w-5 w-3 h-3 text-emerald-500" />
                  ))}
                </div>
              </div>
            </div>

            {/* Divider dot for spacing on mobile (hidden on lg) */}
            <div className="h-2 w-2 rounded-full bg-gray-200 lg:hidden" />

            {/* Meta */}
            <div className="flex items-center gap-4">
              <SiMeta className="h-7 w-7 md:h-10 md:w-10 text-indigo-600" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-semibold leading-none text-gray-900">
                  Meta
                </span>
                <span className="mt-1 text-sm text-gray-500">Tech Provider</span>
              </div>
            </div>
          </div>

          {/* pill */}
          <div className="mt-14 flex justify-center">
            <button
              className="rounded-full bg-white/80 px-4 md:px-6 py-1.5 md:py-3 text-lg font-medium text-gray-900 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-gray-200 backdrop-blur hover:ring-gray-300 transition"
              aria-label="Gains"
            >
              Gains
            </button>
          </div>

          {/* headline */}
          <h1 className="mt-10 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-5xl lg:leading-tight font-pj text-center">
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

      <section className="w-full max-w-6xl mx-auto relative overflow-hidden  p-[1.5px] bg-gradient-to-b from-orange-300 to-orange-50 rounded-[32px]">
        <div className="w-full flex items-end gap-20 bg-white/90 pb-20 backgroup-blur-sm rounded-[32px]">

          <div className="w-full md:w-[40%] p-10">
            <h1 className="text-5xl font-bold">Increase <br /> Engagement <br />by 10X</h1>
            <p className="text-gray-500 mt-10">Fuel curiosity and boost engagement with automated DMs. Drive your reels to viral with every comment turned into a conversation.</p>
          </div>
          <p>after FUMA</p>
        </div>
        <img src="increase.svg" alt="" className="w-full absolute bottom-0 left-0" />
      </section>


      {/* ---------- Two-card benefits (inline, same page, no new component) ---------- */}
      <section className="w-full">
        <div className="mx-auto max-w-6xl  py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Card 1 */}
            <div className="rounded-[32px] p-[1.5px] bg-white shadow p-1 bg-gradient-to-b from-orange-300 to-orange-50">
              <div className="rounded-[30px] bg-white/95 backdrop-blur-sm h-full">
                <div className="relative p-4 sm:p-6">
                  <div className="max-w-xl">
                    <h3 className="text-4xl sm:text-5xl font-bold leading-[1.1] text-slate-900">
                      Maximise <br /> Link Clicks
                    </h3>
                    <p className="mt-6 text-slate-600">
                      Stop relying on bio links. Instantly send clickable links via DM,
                      amplifying clicks and conversion rates.
                    </p>
                  </div>

                  <div className="mt-10">
                    <img src="/maxi.webp" alt="" />
                  </div>
                  {/* soft dotted background on the right */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 left-[48%] opacity-40">
                    <div className="h-full w-full bg-[radial-gradient(circle,_rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:18px_18px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[32px] h-full p-[1.5px] bg-white shadow p-1 bg-gradient-to-b from-orange-300 to-orange-50">
              <div className="rounded-[30px] bg-white/95 backdrop-blur-sm h-full">
                <div className="relative p-4 sm:p-6">
                  <div className="max-w-xl">
                    <h3 className="text-4xl sm:text-5xl font-bold leading-[1.1] text-slate-900">
                      Unlock More <br /> Brand Deals
                    </h3>
                    <p className="mt-6 text-slate-600">
                      Brands prioritise engagement when partnering with creators. With
                      higher reel interactions and link clicks, close more deals at top
                      rates.
                    </p>
                  </div>

                  {/* stat bubbles */}
                  <div className="mt-10">
                    <img src="/numbers_updated_image.webp" alt="" />
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
        <section className="pt-12  sm:pt-16">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-5xl lg:leading-tight font-pj">
                How FUMA Automates Your Viral
                <span className="relative inline-flex sm:inline">
                  <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                  <span className="relative"> Journey </span>
                </span>
              </p>
            </div>
          </div>

          <div className="pb-12">
            <div className="relative">
              {/* <div className="absolute inset-0 h-2/3 "></div> */}
              <div className="relative mx-auto">
                <div className="lg:max-w-3xl lg:mx-auto">
                  {/* <img className="transform scale-110" src="/hwoto.png" alt="" /> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ViralSteps />
      </div>

      <section className="mt-20">

        <FAQ />
      </section>

    </div>
  );
};

export default Home;

// put this helper component ABOVE your Home component (still in the same file)
function ViralSteps() {
  const steps = useMemo(
    () => [
      {
        icon: <LuClapperboard className="h-6 w-6 text-slate-700" />,
        title: "Select Posts or Reels",
        desc: "Pick a post or reel for DM automation.",
      },
      {
        icon: <LuMessageCircle className="h-6 w-6 text-slate-700" />,
        title: "Define Keywords",
        desc: "Set up key terms to attract your audience.",
      },
      {
        icon: <LuBot className="h-6 w-6 text-slate-700" />,
        title: "Automate DMs",
        desc: "Schedule personalised DMs with ease.",
      },
      {
        icon: <LuMegaphone className="h-6 w-6 text-slate-700" />,
        title: "Wait to go Viral!",
        desc: "Let your tool grow engagement effortlessly.",
      },
    ],
    []
  );

  // animation state
  const [active, setActive] = useState(0);   // which card is animating
  const [pct, setPct] = useState(0);         // 0 → 100 progress of current card

  useEffect(() => {
    const stepDurationMs = 5000; // time for one card to fill
    const fps = 60;
    const tick = 1000 / fps;
    let p = 0;

    const id = setInterval(() => {
      p += (tick / stepDurationMs) * 100;
      if (p >= 100) {
        p = 0;
        setActive((n) => (n + 1) % steps.length);
      }
      setPct(p);
    }, tick);

    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            // compute bar width for each card
            const width =
              i < active ? 100 : i === active ? Math.min(100, pct) : 0;

            return (
              <div
                key={s.title}
                className="rounded-3xl  border-slate-200 bg-white/80 backdrop-blur p-6 "
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center px-2 rounded-xl bg-slate-100">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                  </div>
                </div>

                {/* underline progress */}
                <div className="mt-6 h-[6px] w-full rounded-full bg-slate-200/70">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${width}%`,
                      transition: i === active ? "width 100ms linear" : "none",
                      background:
                        "linear-gradient(90deg,#7c3aed 0%, #8b5cf6 40%, #a78bfa 100%)",
                      boxShadow: "0 0 14px rgba(130, 87, 230, 0.45)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* soft background wash like the screenshot */}
      <div className="pointer-events-none absolute -inset-x-32 bottom-0 top-1/3 opacity-60 blur-2xl">
        <div className="h-full w-full bg-[radial-gradient(60%_120%_at_50%_0%,rgba(168,85,247,0.13),transparent)]" />
      </div>
    </section>
  );
}

