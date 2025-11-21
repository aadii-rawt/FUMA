// Tabs.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const tabsData = [
  { id: "home", label: "Home", icon: HomeIcon, url : "/app" },
  { id: "automate", label: "Automate", icon: AutomateIcon, url : "/automation"  },
  { id: "contacts", label: "Contacts", icon: ContactsIcon, url : "/contacts"  },
  { id: "more", label: "More", icon: MoreIcon, url : ""  },
];

export default function Tabs() {
  const [active, setActive] = useState("automate");

  return (
    <div className="w-full flex md:hidden justify-centerc bg-gray-100">
      <nav
        aria-label="Bottom tabs"
        className="bg-gray-100 w-full px-6 py-3 gap-8 shadow-sm flex items-center justify-between"
      >
        {tabsData.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <NavLink  key={t.id}
              to={t.url}
              className="relative flex flex-col items-center gap-1 focus:outline-none"
            >
              {/* Active pill background */}
              <div
                className={`absolute -inset-y-2 -inset-x-3 rounded-2xl transition-all duration-200
                `}
                aria-hidden
              />

              {/* Icon container (keeps icons visible above the pill) */}
              <div
                className={`relative z-20 flex items-center justify-center  rounded-lg transition-all duration-200
                  ${isActive ? "" : "text-gray-400"}`}
              >
                <Icon active={isActive} />
              </div>

              {/* Label */}
              <span
                className={`relative z-20 text-xs transition-colors duration-200 ${
                  isActive ? "text-violet-600 font-semibold" : "text-gray-400"
                }`}
              >
                {t.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

/* -------------------------
   Icons (inline SVG components)
   Each receives prop: active (boolean)
   ------------------------- */

function HomeIcon({ active }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={active ? "text-violet-600" : "text-gray-400"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z"
        stroke={active ? "#6D28D9" : "#9CA3AF"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? "#fff" : "none"}
      />
    </svg>
  );
}

function AutomateIcon({ active }) {
  // stylized "t" / block icon
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className=""
    >
      <g fill="none" fillRule="evenodd">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          fill={active ? "#F3E8FF" : "transparent"}
        />
        <path
          d="M8 9h8M12 9v6"
          stroke={active ? "#6D28D9" : "#9CA3AF"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {active && (
          <circle cx="16.5" cy="7.5" r="1.6" fill="#6D28D9" />
        )}
      </g>
    </svg>
  );
}

function AIIcon({ active }) {
  // glowing circular icon like your screenshot
  return (
    <div className="relative">
      {/* glow */}
      <span
        className={`absolute inset-0 rounded-full ${
          active ? "blur-[10px] opacity-80" : "opacity-0"
        }`}
        style={{
          background:
            active
              ? "radial-gradient(circle at 50% 40%, rgba(124,58,237,0.45), rgba(124,58,237,0.12) 35%, transparent 60%)"
              : "transparent",
          width: 34,
          height: 34,
        }}
      />
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        className="relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="7"
          fill={active ? "#F5F3FF" : "#fff"}
          stroke={active ? "#C4B5FD" : "#E5E7EB"}
          strokeWidth="1.2"
        />
        <path
          d="M12 9.5l1 1-1 1-1-1z"
          fill={active ? "#7C3AED" : "#9CA3AF"}
        />
      </svg>
    </div>
  );
}

function ContactsIcon({ active }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 8a7 7 0 0 1 14 0"
        stroke={active ? "#6D28D9" : "#9CA3AF"}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function MoreIcon({ active }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={active ? "#6D28D9" : "#9CA3AF"}>
        <circle cx="5" cy="5" r="1.6" />
        <circle cx="12" cy="5" r="1.6" />
        <circle cx="19" cy="5" r="1.6" />
        <circle cx="5" cy="12" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="19" cy="12" r="1.6" />
      </g>
    </svg>
  );
}
