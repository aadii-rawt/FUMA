import React from "react";
import FAQ from "../components/FAQ";


const About: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-[#0f172a]">
      {/* Background soft blobs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-[#ffd8c7]/60 via-[#fff]/0 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute -right-48 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-[#f7c3ff]/50 via-[#fff]/0 to-transparent blur-2xl" />

      <main className="mx-auto max-w-2xl px-6 pb-28 pt-16 sm:pt-24">
        {/* Hero Heading */}
        <h1 className="text-balance text-center text-4xl font-extrabold leading-[1.05] text-slate-900 sm:text-6xl md:text-7xl">
          Empowering
          <span className="block bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#fb7185] bg-clip-text text-transparent">
            conversations at
          </span>
          <span className="block bg-gradient-to-r from-[#a855f7] to-[#fb7185] bg-clip-text text-transparent">
            scale
          </span>
        </h1>

        {/* Copy Blocks */}
        <section className="mt-16 space-y-14 text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
          {/* [1] Community */}
          <div className="relative rounded-2xl p-2">
            <div className="text-slate-400 font-semibold tracking-wide">[1] Community</div>
            <p className="mt-3 max-w-3xl text-slate-700">
              At the heart of every strong community lies communication and healthy conversation. At FUMA, we are trying to empower creators and businesses to communicate with their communities efficiently.
            </p>
          </div>

          {/* accent underlay */}
          <div className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-[#fcd9bd]/50 via-[#fff]/0 to-transparent blur-2xl" />

          {/* [2] Velocity */}
          <div className="relative rounded-2xl p-2">
            <div className="text-slate-400 font-semibold tracking-wide">[2] Velocity</div>
            <p className="mt-3 max-w-4xl text-slate-700">
              In today’s fast-paced digital world, time is everything. That’s why we built a powerful, user-friendly platform to automate and enhance your messaging—helping you engage at scale, effortlessly and personally.
            </p>
          </div>

          {/* [3] Impact */}
          <div className="relative rounded-2xl p-2">
            <div className="text-slate-400 font-semibold tracking-wide">[3] Impact</div>
            <p className="mt-3 max-w-4xl text-slate-700">
              We believe meaningful customer engagement drives success. With intelligent automation, cutting-edge tech, and a dedicated team, FUMA is here to elevate your communication and keep you ahead.
            </p>
          </div>
        </section>
      </main>

      <FAQ />
    </div>
  );
};

export default About;
