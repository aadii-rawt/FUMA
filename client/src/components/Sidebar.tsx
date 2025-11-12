import React, { useEffect, useRef, useState } from "react";
import {
  HiChevronDown,
  HiHome,
  HiUserGroup,
  HiClipboardDocumentList,
  HiGift,
  HiCog6Tooth,
  HiFire,
} from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";
import useUser from "../context/userContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Axios from "../utils/axios";
import { IoSettingsOutline } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import { LuContactRound } from "react-icons/lu";

export default function Sidebar() {
  const { setIsPriceModalOpen } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const headerBtnRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const { user ,setShowSubscriptionModal} = useUser()

  const navigate = useNavigate()


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

  const handleLogout = async () => {
    if (!user) return
    try {
      const res = await Axios.post("/auth/logout")
      if (res.status) {
        navigate("/auth/login")
      }
    } catch (error) {
      console.log("Something went wrong", error);

    }
  }

  const handleContact = () => {
    if (user.plan != "ULTIMATE") {
      setShowSubscriptionModal(true)
      return
    }
    navigate("/contacts")
  }
  return (
    <aside className="sticky top-0 left-0 w-[280px] h-screen px-3">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 " />

      {/* Top header */}
      <div className="h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 grid place-items-center overflow-hidden rounded-lg bg-gray-300 text-white font-semibold">
            <img src={user?.avatar || "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"} alt="" className="w-full" />
          </div>
          <button
            ref={headerBtnRef}
            onClick={toggleMenu}
            className="flex items-center cursor-pointer gap-1 text-[15px] font-semibold text-gray-800"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            {user?.username} <HiChevronDown className="text-gray-500" />
          </button>
        </div>
        <div ref={menuContainerRef} className="absolute left-0 top-0 pointer-events-none">
          {menuOpen && (
            <div className="pointer-events-auto">
              <WorkspaceMenu anchorRect={anchorRect} logout={handleLogout} onClose={() => setMenuOpen(false)} user={user} />
            </div>
          )}
        </div>
      </div>

      <NavLink to="/app"
        className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-2 font-medium ${isActive ? "text-purple-500 rounded-2xl bg-gradient-to-r from-white/70 to-transparent" : "text-gray-400 hover:text-gray-700"}`}>
        <span className="grid place-items-center rounded-lg w-8 h-8">
          <HiHome className="text-[18px]" />
        </span>
        <span >Home</span>
      </NavLink>

      <div className="my-2 mx-4 h-[1px] bg-gray-300" />

      <nav className=" space-y-2">
        <NavLink to="/automation"
          className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-2 font-medium ${isActive ? "text-purple-500 rounded-2xl bg-gradient-to-r from-white/70 to-transparent" : "text-gray-400 hover:text-gray-700"}`}>
          <span className="grid place-items-center rounded-lg w-8 h-8">
            <RiRobot2Line className="text-[18px]" />
          </span>
          <span >Automation</span>
        </NavLink>
        <button className="" onClick={handleContact}>
        <NavLink to="/contacts"  onClick={(e) => e.preventDefault()}
          className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-2 font-medium ${isActive ? "text-purple-500 rounded-2xl bg-gradient-to-r from-white/70 to-transparent" : "text-gray-400 hover:text-gray-700"}`}>
          <span className="grid place-items-center rounded-lg w-8 h-8">
            <LuContactRound  className="text-[18px]" />
          </span>
          <span >Contacts</span>
        </NavLink>
        </button>

        <div className={`w-full cursor-pointer  flex items-center gap-3 px-4 py-2 font-medium text-gray-500 hover:text-gray-700`}>
          <div className="flex items-center gap-3">
            <span className="grid place-items-center rounded-lg w-8 h-8">
              <HiClipboardDocumentList className="text-[18px]" />
            </span>
            <span className="grid place-items-center rounded-lg w-8 h-8">Forms</span>
          </div>
           <span className="ml-auto text-xs text-purple-700 px-2 py-1 bg-purple-100 border-[1px] border-purple-400/20 rounded-xl">Coming Soon</span>
        </div>

      </nav>

      <div className="my-2 mx-4 h-[1px] bg-gray-300" />

      <nav className="space-y-2">
        <NavLink to="/setting/general"
          className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-2 font-medium ${isActive ? "text-purple-500 rounded-2xl bg-gradient-to-r from-white/70 to-transparent" : "text-gray-400 hover:text-gray-700"}`}>
          <span className="grid place-items-center rounded-lg w-8 h-8">
            <HiCog6Tooth className="text-[18px]" />
          </span>
          <span >Settings</span>
        </NavLink>
      </nav>

      {user?.plan == "FREE" &&
        <div className="absolute left-0 right-0 bottom-0 p-4">
          <button
            onClick={() => setIsPriceModalOpen(true)}
            className="w-full  cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold shadow-[0_8px_18px_rgba(124,58,237,.35)] hover:opacity-95"
          >
            <HiFire className="text-[18px]" />
            Upgrade Plan
          </button>
        </div>
      }

    </aside>
  );
}

/* ---------------- Workspace menu (popover) ---------------- */
function WorkspaceMenu({
  anchorRect,
  onClose,
  user,
  logout
}: {
  anchorRect: DOMRect | null;
  onClose: () => void;
  user: any,
  logout: () => void;
}) {
  // Position the popover under the anchor; fallback to a nice default.
  const style: React.CSSProperties = anchorRect
    ? {
      position: "fixed",
      top: anchorRect.bottom + 8,
      left: anchorRect.left,
    }
    : { position: "fixed", top: 0, left: 0 };

  return (
    <div
      role="menu"
      aria-label="Workspace menu"
      className="z-[100] fixed top-16 rounded-2xl bg-white border border-gray-200 shadow-[0_24px_60px_rgba(2,6,23,0.12)] w-[260px] overflow-hidden"
    // style={style}
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

        <Link to='/setting/general' className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-gray-200">
            <IoSettingsOutline /> 
          </span>
          Account Settings
        </Link>

        <div className="my-2 h-[1px] bg-gray-200" />

        <button onClick={logout} className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-gray-200">
           <TbArrowBackUp />
          </span>
          Sign out
        </button>
      </div>
    </div>
  );
}
