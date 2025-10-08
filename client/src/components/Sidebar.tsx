import React from "react";
import {
  HiChevronDown,
  HiHome,
  HiUserGroup,
  HiClipboardDocumentList,
  HiGift,
  HiCog6Tooth,
  HiFire,
  HiCheckCircle,
} from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";

function Badge({ children, tone = "purple" }) {
  const base =
    "text-[10px] font-bold px-2 py-[2px] rounded-md leading-none inline-flex items-center";
  const theme =
    tone === "purple"
      ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-[inset_0_-1px_0_rgba(255,255,255,.6)]"
      : "bg-pink-100 text-pink-700 border border-pink-200 shadow-[inset_0_-1px_0_rgba(255,255,255,.6)]";
  return <span className={`${base} ${theme}`}>{children}</span>;
}

function MenuItem({ icon: Icon, label, active, rightBadge, glow }) {
  return (
    <div
      className={[
        "relative group rounded-xl cursor-pointer",
        active ? "bg-white/90 shadow-[0_2px_14px_rgba(17,12,46,0.04)]" : "",
      ].join(" ")}
    >
      {/* soft right fade like the screenshot */}
      {active && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/70 to-transparent" />
      )}

      {/* purple glow blob for AI Studio */}
      {glow && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full blur-xl bg-purple-400/40" />
      )}

      <button
        className={[
          "relative z-[1] cursor-pointer w-full flex items-center gap-3 px-4 py-2",
          active ? "text-purple-700" : "text-gray-400 hover:text-gray-700",
        ].join(" ")}
      >
        <span
          className={[
            "grid place-items-center rounded-lg",
            "w-8 h-8"
          ].join(" ")}
        >
          <Icon className="text-[18px]" />
        </span>
        <span
          className={[
            "text-[15px] font-medium",
            active ? "text-purple-700" : "text-gray-400 hover:text-gray-700",
          ].join(" ")}
        >
          {label}
        </span>
        <span className="ml-auto">{rightBadge}</span>
      </button>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="sticky top-0 left-0 w-[280px] h-screen px-3">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 " />

      {/* Top header */}
      <div className="h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 grid place-items-center rounded-lg bg-gray-900 text-white font-semibold">
            D
          </div>
          <button className="flex items-center gap-1 text-[15px] font-semibold text-gray-800">
            DotDiscount <HiChevronDown className="text-gray-500" />
          </button>
        </div>
        <div className="w-8 h-8 rounded-lg border border-gray-200 bg-white" />
      </div>

      {/* Divider */}
      <div className="">
        <MenuItem icon={HiHome} label="Home" active={false} />
      </div>

      <div className="my-2 mx-4 h-[1px] bg-gray-300" />

      <nav className=" space-y-2">
        <MenuItem
          icon={RiRobot2Line}
          label="AI Studio"
          glow
          rightBadge={<Badge>SOON</Badge>}
        />

        <MenuItem
          icon={RiRobot2Line}
          label="Automations"
          active
          rightBadge={null}
        />

        <MenuItem icon={HiUserGroup} label="Contacts" />

        <MenuItem
          icon={HiClipboardDocumentList}
          label="Forms"
          rightBadge={<Badge tone="pink">NEW</Badge>}
        />
      </nav>

      <div className="my-2 mx-4 h-[1px] bg-gray-300" />

      <nav className="space-y-2">
        <MenuItem icon={HiGift} label="Refer & Earn" />
        <MenuItem icon={HiCog6Tooth} label="Settings" />
      </nav>

      {/* Bottom perks */}
      <div className="absolute left-0 right-0 bottom-0 p-4">
        {/* <ul className="space-y-2 mb-4">
          {[
            "Unlimited Automations",
            "Unlimited Contacts",
            "Unlimited DMS",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2 text-gray-600">
              <HiCheckCircle className="text-emerald-500" />
              <span className="text-[14px]">{t}</span>
            </li>
          ))}
        </ul> */}

        <button className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold shadow-[0_8px_18px_rgba(124,58,237,.35)] hover:opacity-95">
          <HiFire className="text-[18px]" />
          Upgrade Plan
        </button>
      </div>
    </aside>
  );
}
