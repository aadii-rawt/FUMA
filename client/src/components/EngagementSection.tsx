// src/components/EngagementSection.tsx
import React, { useEffect, useRef, useState } from "react";

const EngagementSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const glowRef = useRef<SVGPathElement | null>(null);
  const [inView, setInView] = useState(false);
  const [len, setLen] = useState(0);

  useEffect(() => {
    // Measure path length for stroke-dash animation
    if (pathRef.current) {
      const L = pathRef.current.getTotalLength();
      setLen(L);
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
          } else {
            // Reset so it replays when we come back
            setInView(false);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const dash = inView ? 0 : len;

  return (
    <section className="w-full bg-transparent py-14 sm:py-20" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Gradient border card */}
        <div className="rounded-[28px] p-[1.5px] bg-gradient-to-r from-orange-300 to-orange-500">
          <div className="rounded-[26px] bg-white/90 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-8 p-8 sm:p-12">
              {/* Left copy */}
              <div className="max-w-xl">
                <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] text-slate-900">
                  Increase <br /> Engagement <br /> by 10X
                </h2>
                <p className="mt-6 text-lg sm:text-xl text-slate-600">
                  Fuel curiosity and boost engagement with automated DMs. Drive your
                  reels to viral with every comment turned into a conversation.
                </p>
              </div>

              {/* Right chart */}
              <div className="relative">
                {/* subtle bg gradient like screenshot */}
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(80%_120%_at_70%_20%,rgba(246,80,149,0.12),transparent)] pointer-events-none" />

                <svg
                  viewBox="0 0 880 360"
                  className="w-full h-[260px] sm:h-[300px]"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* left grey -> right pink->purple */}
                    <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#d1d5db" />
                      <stop offset="48%" stopColor="#d1d5db" />
                      <stop offset="52%" stopColor="#f472b6" />
                      <stop offset="80%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>

                    {/* glow duplicate */}
                    <linearGradient id="glowGradient" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="50%" stopColor="#f472b6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.35" />
                    </linearGradient>

                    {/* dashed mid divider */}
                    <pattern
                      id="dash"
                      width="8"
                      height="8"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect width="2" height="8" fill="#e2e8f0" />
                    </pattern>
                  </defs>

                  {/* baseline shadow */}
                  <path
                    d="M16,290 C90,285 130,288 190,286 C230,285 260,282 300,280 C340,278 360,276 400,274 C430,273 460,272 490,270 C520,268 560,260 600,238 C640,216 680,200 720,176 C760,152 810,120 864,96"
                    fill="none"
                    stroke="#eef2f7"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />

                  {/* animated glow behind the main line */}
                  <path
                    ref={glowRef}
                    d="M16,292 C90,290 130,292 190,290 C230,289 260,286 300,284 C340,282 360,280 400,278 C430,277 460,276 490,274 C520,272 560,262 600,240 C640,218 680,202 720,178 C760,154 810,124 864,100"
                    fill="none"
                    stroke="url(#glowGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: len,
                      strokeDashoffset: dash,
                      transition: "stroke-dashoffset 1600ms cubic-bezier(.19,1,.22,1)",
                      filter: "blur(6px)",
                    }}
                  />

                  {/* main animated line */}
                  <path
                    ref={pathRef}
                    d="M16,292 C90,290 130,292 190,290 C230,289 260,286 300,284 C340,282 360,280 400,278 C430,277 460,276 490,274 C520,272 560,262 600,240 C640,218 680,202 720,178 C760,154 810,124 864,100"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: len,
                      strokeDashoffset: dash,
                      transition: "stroke-dashoffset 1600ms cubic-bezier(.19,1,.22,1) 120ms",
                    }}
                  />

                  {/* vertical dashed divider at ~mid */}
                  <line
                    x1="440"
                    y1="24"
                    x2="440"
                    y2="336"
                    stroke="url(#dash)"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />

                  {/* "after Zorcha" label & small square */}
                  <g transform="translate(460,220)">
                    <rect width="18" height="18" rx="4" fill="#6d28d9" />
                    <text
                      x="26"
                      y="14"
                      fontSize="18"
                      fontWeight={600}
                      fill="#1f2937"
                    >
                      after Zorcha
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Rounded outer corners (screenshot vibe) */}
        <div className="mt-4 h-0" />
      </div>
    </section>
  );
};

export default EngagementSection;
