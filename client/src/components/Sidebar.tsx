import React, { useEffect, useRef, useState } from "react";
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
import useUser from "../context/userContext";

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
      {active && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/70 to-transparent" />
      )}
      {glow && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full blur-xl bg-purple-400/40" />
      )}

      <button
        className={[
          "relative z-[1] cursor-pointer w-full flex items-center gap-3 px-4 py-2",
          active ? "text-purple-700" : "text-gray-400 hover:text-gray-700",
        ].join(" ")}
      >
        <span className="grid place-items-center rounded-lg w-8 h-8">
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

/* ---------------- Workspace menu (popover) ---------------- */
function WorkspaceMenu({
  anchorRect,
  onClose,
  user,
}: {
  anchorRect: DOMRect | null;
  onClose: () => void;
  user : any
}) {
  // Position the popover under the anchor; fallback to a nice default.
  const style: React.CSSProperties = anchorRect
    ? {
        position: "fixed",
        top: anchorRect.bottom + 8,
        left: anchorRect.left,
      }
    : { position: "fixed", top: 64, left: 24 };

  return (
    <div
      role="menu"
      aria-label="Workspace menu"
      className="z-[100] rounded-2xl bg-white border border-gray-200 shadow-[0_24px_60px_rgba(2,6,23,0.12)] w-[260px] overflow-hidden"
      style={style}
    >
      <div className="p-2">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-50"
          onClick={onClose}
        >
          <div className="w-7 h-7 grid place-items-center overflow-hidden rounded bg-gray-900 text-white text-[12px] font-bold">
           <img src={user?.avatar} alt="" />
          </div>
          <div className="text-[14px] font-semibold text-gray-900">{user?.username}</div>
        </button>

        <div className="my-2 h-[1px] bg-gray-200" />

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-gray-200">
            +
          </span>
          Add New Workspace
        </button>

        <div className="my-2 h-[1px] bg-gray-200" />

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-gray-200">
            👤
          </span>
          Account Settings
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-gray-200">
            ⚙️
          </span>
          Workspace Settings
        </button>

        <div className="my-2 h-[1px] bg-gray-200" />

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-gray-200">
            ⤴
          </span>
          Sign out
        </button>
      </div>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */
export default function Sidebar() {
  const { setIsPriceModalOpen } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const headerBtnRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const {user} = useUser()

  // Open/close
  const toggleMenu = () => {
    const rect = headerBtnRef.current?.getBoundingClientRect() || null;
    setAnchorRect(rect);
    setMenuOpen((s) => !s);
  };

  // Close on outside click & Esc
  useEffect(() => {
    if (!menuOpen) return;

    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const header = headerBtnRef.current;
      const menu = menuContainerRef.current;
      if (menu?.contains(target) || header?.contains(target)) return;
      setMenuOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <aside className="sticky top-0 left-0 w-[280px] h-screen px-3">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 " />

      {/* Top header */}
      <div className="h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 grid place-items-center overflow-hidden rounded-lg bg-gray-900 text-white font-semibold">
           <img src={user?.avatar} alt="" />
          </div>
          <button
            ref={headerBtnRef}
            onClick={toggleMenu}
            className="flex items-center gap-1 text-[15px] font-semibold text-gray-800"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
           {user?.username} <HiChevronDown className="text-gray-500" />
          </button>
        </div>
        <div className="w-8 h-8 rounded-lg border border-gray-200 bg-white" />

        {/* Popover container (fixed-positioned child rendered here for outside-click logic) */}
        <div ref={menuContainerRef} className="absolute left-0 top-20 pointer-events-none">
          {menuOpen && (
            <div className="pointer-events-auto">
              <WorkspaceMenu anchorRect={anchorRect} onClose={() => setMenuOpen(false)} user={user}/>
            </div>
          )}
        </div>
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
        <button
          onClick={() => setIsPriceModalOpen(true)}
          className="w-full  cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold shadow-[0_8px_18px_rgba(124,58,237,.35)] hover:opacity-95"
        >
          <HiFire className="text-[18px]" />
          Upgrade Plan
        </button>
      </div>
    </aside>
  );
}
