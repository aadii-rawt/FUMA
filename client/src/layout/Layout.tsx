
import PricingModal from "../components/upgrade/PricingModal";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import UpgradeModal from "../components/upgrade/UpgradeModal";

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#EBEBEB]">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50 rounded-xl m-2">
        <Outlet />
      </div>

      <UpgradeModal />
    </div>
  );
}
