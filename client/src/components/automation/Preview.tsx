import React from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiMoreHorizontal, FiSend } from "react-icons/fi";
import { LuBookmark } from "react-icons/lu";
import useUser from "../../context/userContext";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const PhoneCard: React.FC<Props> = ({ className = "", children }) => {
  const { selectedPost ,user} = useUser()
  return (
    <div className="flex items-center justify-center mt-5">
      <div
        className={[
          // card
          "group relative h-[500px] w-[260px] overflow-hidden  rounded-[35px] border-2 border-neutral-800 bg-black p-[7px] shadow-[2px_5px_15px_rgba(0,0,0,0.48)]",
          className,
        ].join(" ")}
      >
        {/* side buttons */}
        <div
          className="absolute right-[-4px] top-[30%] h-[45px] w-[2px]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#111111,#222222,#333333,#464646,#595959)",
          }}
        />
        <div
          className="absolute left-[-4px] top-[26%] h-[30px] w-[2px]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#111111,#222222,#333333,#464646,#595959)",
          }}
        />
        <div
          className="absolute left-[-4px] top-[36%] h-[30px] w-[2px]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#111111,#222222,#333333,#464646,#595959)",
          }}
        />
        <div className="h-full w-full bg-white rounded-[35px] overflow-y-scroll no-scrollbar pt-3 text-black">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-yellow-500 text-[10px] font-semibold">
               <img src={user?.avatar || ""} alt="" />
              </div>
              <span className="text-sm font-medium">{user?.username}</span>
            </div>
            <FiMoreHorizontal className="text-xl text-white/80" />
          </div>

          {/* Square placeholder */}
          {selectedPost.postThumbnail !== "" ?
            <img src={selectedPost?.postThumbnail} alt="" className="w-full h-60 " /> :
            <div className="px-2">
              <div className="relative w-full overflow-hidden rounded-xl bg-gray-300 text-black">
                <div className="aspect-square w-full rounded-xl border border-dashed border-black grid place-items-center px-6 text-center">
                  <p className="text-[13px] leading-5 ">
                    You haven’t picked a post or reel
                    <br /> for your automation yet
                  </p>
                </div>
              </div>
            </div>
          }

          {/* Actions */}
          <div className="flex items-center justify-between px-3 pt-3">
            <div className="flex items-center gap-4">
              <FaRegHeart />
              <FaRegComment />
              <FiSend />
            </div>
            <LuBookmark />
          </div>

          {/* Caption / comments */}
          <div className="px-3 pt-3">
            {selectedPost ? <div className="space-y-1 pb-3">
              <div>
                <p className="text-xs">{selectedPost?.caption}</p>
                <button className="mt-1 text-xs">View all comments</button>
              </div>
            </div> :
              <div>
                <div className="text-xs font-semibold">@dotdiscount</div>
                <p className="mt-1 text-xs">View all comments</p>
              </div>
            }
          </div>
        </div>

        {/* top notch */}
        <div className="absolute right-1/2 top-0 h-[18px] w-[35%] translate-x-1/2 rounded-b-[10px] bg-black" />
        {/* speaker */}
        <div className="absolute right-1/2 top-[2px] h-[2px] w-[40%] translate-x-1/2 rounded bg-neutral-800" />
        {/* camera */}
        <div className="absolute right-[84%] top-[6px] h-[6px] w-[6px] translate-x-1/2 rounded-full bg-white/5">
          <div className="absolute right-1/2 top-1/2 h-[3px] w-[3px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-700/30" />
        </div>
      </div>

    </div>
  );
};

export default PhoneCard;
