
import { PiLinkSimpleLight } from "react-icons/pi";
import { TbDatabasePlus } from "react-icons/tb";
import { SlUserFollow } from "react-icons/sl";
import { LuMessageCircleHeart } from "react-icons/lu";

export type Feature = { label: string; ok: boolean, icons : any };

export type Plan = {
  id: "free" | "pro" | "ultimate";
  title: string;
  price: number;          // monthly price in INR for simplicity
  currency: "INR";
  period: "mo";
  features: Feature[];
  highlight?: boolean;
};

const featuresFree: Feature[] = [
    { label: "3 Automations", icons : <PiLinkSimpleLight/>, ok: true },
    { label: "1000 DMs", icons : <LuMessageCircleHeart />, ok: true },
    { label: "Follow before DM", icons : <SlUserFollow />, ok: false },
    { label: "Data Collection", icons : <TbDatabasePlus />, ok: false },
];

const featuresPro: Feature[] = [
  { label: "Unlimited Automations", icons : <PiLinkSimpleLight/>, ok: true },
  { label: "Unlimited DMs", icons : <LuMessageCircleHeart />, ok: true },
  { label: "Follow before DM", icons : <SlUserFollow />, ok: true },
  { label: "Data Collection", icons : <TbDatabasePlus />, ok: false },
];

const featuresUltimate: Feature[] = [
  { label: "Unlimited Automations", icons : <PiLinkSimpleLight/>, ok: true },
    { label: "Unlimited DMs", icons : <LuMessageCircleHeart />, ok: true },
    { label: "Follow before DM", icons : <SlUserFollow />, ok: true },
    { label: "Data Collection", icons : <TbDatabasePlus />, ok: true },
];

const PLANS: Plan[] = [
  {
    id: "free",
    title: "Free",
    price: 0,
    currency: "INR",
    period: "mo",
    features: featuresFree,
  },
  {
    id: "pro",
    title: "Pro",
    price: 199,
    currency: "INR",
    period: "mo",
    features: featuresPro,
    highlight: true,
  },
  {
    id: "ultimate",
    title: "Ultimate",
    price: 299,
    currency: "INR",
    period: "mo",
    features: featuresUltimate,
  },
];

function PriceCard({
  plan,
  onSelect,
}: {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}) {
  const { title, price, features, highlight } = plan;

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
          "overflow-hidden relative",
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-x-0 top-0 h-32 pointer-events-none",
            highlight
              ? "bg-gradient-to-b from-fuchsia-50 to-transparent"
              : "bg-gradient-to-b from-slate-50 to-transparent",
          ].join(" ")}
        />

        <div className="p-6">
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
          <div className="mt-3">
            <button
              onClick={() => { 
                if(plan.id == "free") return     
                onSelect(plan)
              }}
              className={[
                "w-full rounded-xl cursor-pointer py-3 text-center text-[17px] font-semibold transition",
                highlight
                  ? "bg-white text-slate-900 ring-1 ring-white/60 hover:bg-white"
                  : "bg-white text-slate-900 ring-1 ring-slate-200 hover:ring-slate-300",
              ].join(" ")}
            >
              {title === "Free" ? "Go Free" : `Choose ${title}`}
            </button>
          </div>

          {/* Features */}
          <div className="mt-4">
            <div className="text-slate-400 text-sm mb-3">
              What&apos;s Included:
            </div>
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

      {highlight && (
        <div className="pointer-events-none absolute -bottom-8 left-6 right-6 h-16 rounded-full bg-fuchsia-300/40 blur-2xl" />
      )}
    </div>
  );
}

export default function PricingModal({
  onSelectPlan,
}: {
  onSelectPlan: (plan: Plan) => void;
}) {
  // NOTE: This is just the grid/section. No duplicate backdrop here.
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] bg-[linear-gradient(to_bottom,rgba(236,72,153,0.10),transparent_40%),radial-gradient(1200px_400px_at_50%_120%,rgba(99,102,241,0.12),transparent)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] opacity-[0.18] bg-[linear-gradient(#0000_95%,#0001),linear-gradient(90deg,#0000_95%,#0001)] bg-[length:60px_60px]" />

      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PriceCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
        ))}
      </div>
    </div>
  );
}

export { PLANS };
