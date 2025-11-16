
import PricingModal from "../components/upgrade/PricingModal";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import UpgradeModal from "../components/upgrade/UpgradeModal";
import useUser from "../context/userContext";
import Subscription from "../components/Subscription";
import ScrollToTop from "../components/ScrollToTop";
import Notification from "../components/Notification";
export default function Layout() {
  const { isPriceModalOpen } = useUser()
  const { showSubscriptionModal,notification } = useUser();

  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-[#EBEBEB] relative">
      <ScrollToTop />
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50 rounded-xl m-2 ">
        <Outlet />
      </div>

      {isPriceModalOpen && <UpgradeModal />}
      {showSubscriptionModal && <Subscription />}
    {notification &&  <Notification /> }
    </div>
  );
}
