import React from "react";
import { FaInstagram } from "react-icons/fa";
import { TbBrandMeta } from "react-icons/tb";
import { BiTransferAlt } from "react-icons/bi";

const ConnectInsta: React.FC = () => {

  const handleConnect = async () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/instagram/connect`
  }

  return (
    <div className="w-1/2 p-6">
      <div className="w-full">
        <h1 className="leading-tight font-medium text-2xl text-neutral-900 tracking-tight">
          Connect Instagram
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Use your Instagram account to connect to  FUMA.
        </p>
        <p className="text-xs my-1 p-2 py-1 flex  rounded-lg bg-orange-100 text-orange-600">
          Make sure you have a Facebook Page connected to your Instagram account.
        </p>


        <div className="mt-12 flex items-center gap-2">
          <h1 className="font-semibold text-xl">FUMA</h1>
          <BiTransferAlt className="text-neutral-600" size={20} />
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-sm">
            <FaInstagram className="text-white" size={28} />
          </div>
        </div>

        <button
          onClick={handleConnect}
          className="mt-8 w-full cursor-pointer rounded-xl py-2 text-white  font-semibold shadow-lg
                     bg-gradient-to-r from-[#6418ff] to-[#8a2be2] hover:opacity-95 transition"
        >
          Go To Instagram
        </button>


        {/* Meta badge */}
        <div className="mt-15">
          <div className="flex items-center gap-3">
            <TbBrandMeta className="text-[#1860ff]" size={28} />
            <div>
              <div className="text-xl leading-none font-semibold text-neutral-900">
                Meta
              </div>
              <div className="text-[12px] text-neutral-500 -mt-1">Tech Provider</div>
            </div>
          </div>
          <p className="mt-2 text-neutral-500 text-sm">
            FUMA has been certified by Meta as an official Tech Provider.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectInsta;
