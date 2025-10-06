/* ----- Pricing Section ----- */
const featuresFree = [
  { label: "3 Automations", ok: true },
  { label: "1000 DMs", ok: true },
  { label: "1000 Contacts", ok: true },
  { label: "Follow before DM", ok: false },
  { label: "Data Collection", ok: false },
];

const featuresPro = [
  { label: "Unlimited Automations", ok: true },
  { label: "Unlimited DMs", ok: true },
  { label: "Unlimited Contacts", ok: true },
  { label: "Follow before DM", ok: true },
  { label: "Data Collection", ok: true },
];

const featuresUltimate = [...featuresPro];

const PriceCard = ({
  title,
  price,
  badge,
  cta,
  subtitle = "Billed yearly",
  features,
  highlight = false,
}: {
  title: string;
  price: string;
  badge?: string;
  cta: string;
  subtitle?: string;
  features: { label: string; ok: boolean }[];
  highlight?: boolean;
}) => (
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
      {/* Save badge */}
      {badge && (
        <div className="absolute right-4 top-4 rounded-full bg-slate-900/80 text-white text-xs font-semibold px-3 py-1 shadow">
          {badge}
        </div>
      )}

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
          <div className="mt-2 text-sm text-slate-500">{subtitle}</div>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <button
            className={[
              "w-full rounded-2xl py-3 text-center text-[17px] font-semibold transition",
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
                {/* {f.ok ? (
                  <LuCheckCircle2 className="h-5 w-5 text-violet-600" />
                ) : (
                  <LuXCircle className="h-5 w-5 text-slate-300" />
                )} */}
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

export default function Pricing() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* subtle grid + gradient background, behind cards */}
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
              price="799"
              badge="Save ₹4800"
              cta="Go Pro"
              features={featuresPro}
              highlight
            />
            <PriceCard
              title="Ultimate"
              price="1999"
              badge="Save ₹12000"
              cta="Go Ultimate"
              features={featuresUltimate}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
