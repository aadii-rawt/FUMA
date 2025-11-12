import { PiLinkSimpleLight } from "react-icons/pi";
import { TbDatabasePlus } from "react-icons/tb";
import { SlUserFollow } from "react-icons/sl";
import { LuMessageCircleHeart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
/* ----- Pricing Section ----- */
const featuresFree = [
  { label: "3 Automations", icons : <PiLinkSimpleLight/>, ok: true },
  { label: "1000 DMs", icons : <LuMessageCircleHeart />, ok: true },
  { label: "Follow before DM", icons : <SlUserFollow />, ok: false },
  { label: "Follow Up to re-engage", icons : <SlUserFollow />, ok: false },
  { label: "Data Collection", icons : <TbDatabasePlus />, ok: false },
];

const featuresPro = [
  { label: "Unlimited Automations", icons : <PiLinkSimpleLight/>, ok: true },
  { label: "Unlimited DMs", icons : <LuMessageCircleHeart />, ok: true },
  { label: "Follow before DM", icons : <SlUserFollow />, ok: true },
  { label: "Follow Up to re-engage", icons : <SlUserFollow />, ok: false },
  { label: "Data Collection", icons : <TbDatabasePlus />, ok: false },
];

const featuresUltimate = [
  { label: "Unlimited Automations", icons : <PiLinkSimpleLight/>, ok: true },
  { label: "Unlimited DMs", icons : <LuMessageCircleHeart />, ok: true },
  { label: "Follow before DM", icons : <SlUserFollow />, ok: true },
  { label: "Follow Up to re-engage", icons : <SlUserFollow />, ok: true },
  { label: "Data Collection", icons : <TbDatabasePlus />, ok: true },
];

type PriceProp = {
  title: string;
  price: string;
  cta: string;
  features: { label: string; ok: boolean }[];
  highlight?: boolean;
}

const PriceCard = ({
  title,
  price,
  cta,
  features,
  highlight = false,
}) => {
  const navigate = useNavigate()
  return (
    <div
      className={[
        "relative rounded-[28px] p-[2px] transition",
        highlight
          ? "bg-gradient-to-br from-fuchsia-400 via-violet-500 to-indigo-400 shadow-[0_30px_80px_rgba(109,40,217,0.35)]"
          : "bg-gradient-to-br from-slate-200 to-slate-100 shadow-[0_10px_50px_rgba(2,6,23,0.08)]",
      ].join(" ")}
    >
      <div
        className={[
          "rounded-[26px] bg-white/90 backdrop-blur-xl",
          "ring-1 ring-white/50",
          "overflow-hidden",
        ].join(" ")}
      >
        {/* soft top gradient wash */}
        <div
          className={[
            "absolute inset-x-0 top-0 h-32 pointer-events-none",
            highlight
              ? "bg-gradient-to-b from-fuchsia-50 to-transparent"
              : "bg-gradient-to-b from-slate-50 to-transparent",
          ].join(" ")}
        />
  
        <div className="p-6 sm:p-8">
          {/* Price & title */}
          <div className="text-slate-900">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                ₹{price}
              </div>
              <div className="text-slate-500 font-medium">/ mo</div>
            </div>
            <div className="mt-1 text-lg font-semibold">{title}</div>
          </div>
  
          {/* CTA */}
          <div className="mt-5">
            <button onClick={() => navigate("/auth/signup")}
              className={[
                "w-full cursor-pointer rounded-2xl py-3 text-center text-[17px] font-semibold transition",
                highlight
                  ? "bg-white text-slate-900 ring-1 ring-white/60 hover:bg-white"
                  : "bg-white text-slate-900 ring-1 ring-slate-200 hover:ring-slate-300",
              ].join(" ")}
            >
              {cta}
            </button>
          </div>
  
          {/* Features */}
          <div className="mt-8">
            <div className="text-slate-400 text-sm mb-3">What&apos;s Included:</div>
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f.label} className="flex items-center gap-3">
                  <span className={`h-5 w-5 ${f.ok ? "text-violet-600" : "text-gray-400"}`}>
                    {f.icons}
                  </span>
                  <span
                    className={[
                      "text-[15px]",
                      f.ok ? "text-slate-800" : "text-slate-400",
                    ].join(" ")}
                  >
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>
  
            {/* Support line */}
            <div className="mt-6 text-sm text-slate-400">
              {title === "Free"
                ? "Limited Support"
                : title === "Pro"
                ? "Email Support"
                : "Dedicated Success Manager"}
            </div>
          </div>
        </div>
      </div>
  
      {/* bottom glow shadow (like screenshot) */}
      {highlight && (
        <div className="pointer-events-none absolute -bottom-8 left-6 right-6 h-16 rounded-full bg-fuchsia-300/40 blur-2xl" />
      )}
    </div>
  );
    
} 

export default function Pricing() {
  return (
    <section className="w-full">
      
    <div className="min-h-screen">
      <section className="relative py-12 bg-white sm:py-16 lg:py-20">
        <div className="absolute inset-0">
          <img className="object-cover w-full h-full" src="/pricing-bg.png" alt="" />
        </div>

        <div className="relative mt-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
             Simple & affordable pricing for you
            </h1>
          </div>
        </div>

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] bg-[linear-gradient(to_bottom,rgba(236,72,153,0.10),transparent_40%),radial-gradient(1200px_400px_at_50%_120%,rgba(99,102,241,0.12),transparent)]" />
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] opacity-[0.18] bg-[linear-gradient(#0000_95%,#0001),linear-gradient(90deg,#0000_95%,#0001)] bg-[length:60px_60px]" />

          <div className="grid gap-6 lg:grid-cols-3">
            <PriceCard
              title="Free"
              price="0"
              cta="Go Free"
              features={featuresFree}
            />
            <PriceCard
              title="Pro"
              price="199"
              cta="Go Pro"
              features={featuresPro}
              highlight
            />
            <PriceCard
              title="Ultimate"
              price="299"
              cta="Go Ultimate"
              features={featuresUltimate}
            />
          </div>
        </div>
      </div>
      </section>
    </div>

    </section>
  );
}
