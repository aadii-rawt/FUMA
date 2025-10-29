
import PricingModal from "../components/upgrade/PricingModal";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import UpgradeModal from "../components/upgrade/UpgradeModal";
import useUser from "../context/userContext";
import Subscription from "../components/Subscription";

export default function Layout() {
  const { isPriceModalOpen } = useUser()
  const { showSubscriptionModal, setShowSubscriptionModal } = useUser();

  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-[#EBEBEB] relative">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50 rounded-xl m-2">
        <Outlet />
      </div>

      {isPriceModalOpen && <UpgradeModal />}
      {showSubscriptionModal && <Subscription onClose={() => setShowSubscriptionModal(false)} />}
      {/* <Subscription /> */}
    </div>
  );
}
