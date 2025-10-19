import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PricingModal  from "./PricingModal";
import Payment from "./Payment";
import useUser from "../../context/userContext";

export default function UpgradeModal() {
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
const {setIsPriceModalOpen} = useUser()

  const handlePay = (details: any) => {
    const payload = {
      plan: selectedPlan,          
      payment: details,            
      meta: {
        initiatedAt: new Date().toISOString(),
        source: "UpgradeModal",
      },
    };

    // 👇 Your single place to log or send to API
    console.log("🔥 UPGRADE CHECKOUT PAYLOAD", payload);

    alert("Payment initiated! Check console for full payload.");
    handleClose();
  };


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-5xl px-4 sm:px-6 lg:px-8 rounded-xl border-2 border-gray-200 py-8 relative">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium"><button onClick={() => setSelectedPlan(null)} className={`${selectedPlan && "text-gray-400 cursor-pointer"}`}>Upgrade Plan  </button>{selectedPlan && <span> / Summary</span>}</h1>
          <button
            onClick={() => setIsPriceModalOpen(false)}
            className="text-2xl cursor-pointer hover:opacity-80"
            aria-label="Close"
          >
            <IoIosCloseCircleOutline />
          </button>
        </div>

        <div className="mt-6">
          {!selectedPlan ? (
            <PricingModal
              onSelectPlan={(plan) => setSelectedPlan(plan)}
            />
          ) : (
            <Payment
              selectedPlan={selectedPlan}
              onBack={() => setSelectedPlan(null)}
              onPay={handlePay}
            />
          )}
        </div>
      </div>
    </div>
  );
}
