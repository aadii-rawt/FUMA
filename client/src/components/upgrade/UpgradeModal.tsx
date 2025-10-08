import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PricingModal from "./PricingModal";
import Payment from "./Payment";

export default function UpgradeModal (){

   const [plantType,setPlanType] = useState<string>("fdsfd")
    return (
         <div className="fixed top-0 left-0 w-full bg-black/30 h-full flex items-center justify-center">
                    <div className="bg-white w-[80%] px-4 sm:px-6 lg:px-8  rounded-xl border-2 border-gray-200 py-10">
                      <div className="flex items-center justify-between">
                        <h1 className="text-lg font-medium">Upgrade Plan</h1>
                        <button className="text-2xl cursor-pointer"><IoIosCloseCircleOutline /></button>
                      </div>
                       <div className=" mt-5">
                        {!plantType ? <PricingModal /> : <Payment />}
                    </div>
                </div>
        </div>
    )
}