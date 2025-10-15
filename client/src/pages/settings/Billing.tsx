import { FiGitBranch, FiMessageCircle, FiUsers } from "react-icons/fi";

type Stat = {
  label: string;
  value: string | number;
  of?: string | number;
  icon?: React.ReactNode;
};

type PlanCardProps = {
  name: string;            // e.g., "Free"
  subtitle?: string;       // e.g., "Current Plan"
  price: string;           // e.g., "₹0"
  cadence?: string;        // e.g., "/mo"
  stats?: Stat[];          // list of plan limits/usage
  className?: string;
};

export default function Billing() {
  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6`}
      style={{ boxShadow: "0 6px 24px rgba(16, 24, 40, 0.06)" }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">free</h3>
          <p className="mt-1 text-gray-500">"dfsdjlk</p>
        </div>
        <div className="text-right">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            {"free"}
            <span className="text-base font-semibold text-gray-500">"dfsjlk</span>
          </div>
        </div>
      </div>

      {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-0.5">
              {s.icon ?? <div className="h-5 w-5 rounded-md bg-purple-100" />}
            </div>
            <div>
              <div className="text-gray-900 font-semibold">
                {s.value}
                {s.of !== undefined && (
                  <span className="text-gray-400"> / {s.of}</span>
                )}
              </div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

// handy presets for the three stats you showed
export const defaultPlanStats: Stat[] = [
  {
    label: "Automations",
    value: "11",
    of: "3",
    icon: (
      <div className="h-6 w-6 rounded-lg bg-purple-100 grid place-items-center">
        <FiGitBranch className="text-purple-600" />
      </div>
    ),
  },
  {
    label: "DMs",
    value: "319",
    of: "1K",
    icon: (
      <div className="h-6 w-6 rounded-lg bg-purple-100 grid place-items-center">
        <FiMessageCircle className="text-purple-600" />
      </div>
    ),
  },
  {
    label: "Contacts",
    value: "295",
    of: "1K",
    icon: (
      <div className="h-6 w-6 rounded-lg bg-purple-100 grid place-items-center">
        <FiUsers className="text-purple-600" />
      </div>
    ),
  },
];
