import React from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiMoreHorizontal, FiSend } from "react-icons/fi";
import { LuBookmark } from "react-icons/lu";
import useUser from "../../context/userContext";
import { BiHeart, BiShare, BiUser } from "react-icons/bi";
import { MdMic } from "react-icons/md";
import { ImImage } from "react-icons/im";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const PhoneCard: React.FC<Props> = ({ className = "", children }) => {
  const { selectedPost, user, previewURL } = useUser()
  return (
    <div className="flex items-center justify-center mt-5">
      <div
        className={[
          // card
          "group relative h-[500px] w-[260px] overflow-scroll hide-scrollbar  rounded-[35px] border-2 border-neutral-800 bg-black p-[7px] shadow-[2px_5px_15px_rgba(0,0,0,0.48)]",
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

        {/* {!selectedPost?.dmImageUrl && !selectedPost?.msgTitle ?
          <PostPreview user={user} selectedPost={selectedPost} />
          : */}
        <MessagePreview user={user} selectedPost={selectedPost} previewURL={previewURL} />
        {/* } */}

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


const PostPreview = ({ user, selectedPost }: any) => {
  return (
    <div className="h-full relative w-full bg-black rounded-[35px] overflow-y-scroll no-scrollbar pt-3 text-white">

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
      {selectedPost?.postThumbnail !== "" ?
        <img src={selectedPost?.postThumbnail} alt="" className="w-full h-60 " /> :
        <div className="px-2">
          <div className="relative w-full overflow-hidden rounded-xl bg-slate-900 text-white">
            <div className="aspect-square w-full rounded-xl border border-dashed border-gray-600 grid place-items-center px-6 text-center">
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
        {
          // @ts-ignore
          !selectedPost?.keywords?.length > 0 ? <div className="space-y-1 pb-3">
            <div>
              <p className="text-xs">{selectedPost?.caption}</p>
              <button className="mt-1 text-xs">View all comments</button>
            </div>
          </div> :
            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold bg-gray-200 p-1 rounded-full"><BiUser size={18} /> </div>
              <p className="text-[13px] font-medium">{selectedPost?.keywords?.[0]}</p>
            </div>
        }
      </div>

      <div className="absolute w-full bottom-0 left-0 flex flex-col justify-between pb-3 h-[60%] z-50 bg-[#3B3A3A] rounded-t-2xl">
        <div>
          <div className="flex items-center justify-center"><span className="w-10 my-2 rounded-xl h-1.5 bg-gray-300"></span></div>
          <div className="flex items-center justify-between px-4">
            <div></div>
            <div className="text-sm font-medium">Comments</div>
            <div><BiShare /></div>
          </div>
          <div className="border-t-2 mt-2 w-full flex justify-between border-gray-500/60 p-3 pt-5">
            <div className="flex gap-3">
              <div className=" w-7 h-7 rounded-full bg-gray-400"></div>
              <div className="flex flex-col text-xs">
                <span className="font-semibold">User</span>
                <span className="font-medium">Leaves a new comment</span>
                <span className="text-gray-400">Reply</span>
              </div>
            </div>
            <BiHeart className="text-sm" />
          </div>
        </div>

        <div>
          <div className="flex w-full px-2 ">
            <span className="w-full">💖</span>
            <span className="w-full">🙌</span>
            <span className="w-full">🔥</span>
            <span className="w-full">👏</span>
            <span className="w-full">😍</span>
            <span className="w-full">😮</span>
            <span className="w-full">😂</span>
          </div>
          <div className="px-3 my-2 flex gap-5">
            <div className="w-6 h-6 rounded-full bg-gray-400"></div>

            <div className="border text-xs border-gray-500 py-1 px-2 w-[80%] rounded-xl">
              Add a comment...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MessagePreview = ({ user, selectedPost, previewURL }: any) => {
  return (
    <div className="py-6 px-3 relative h-full ">
      <div className="flex gap-3 items-center">
        <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
        <h1 className="text-white text-sm">{user?.username}</h1>
      </div>
      {/* opening message */}

      <div className="flex gap-2 items-end mt-10 max-w-[200px]">
        <div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="w-full rounded-xl overflow-hidden">
          <div className="p-2 bg-[#262626]">
            <h1 className="text-xs font-medium text-white break-words whitespace-pre-wrap">
              {selectedPost?.openingMsgData?.text ?? ""}
            </h1>
            <div className="flex items-center justify-center font-medium rounded-lg mt-2 bg-[#363636] text-white text-xs py-1">
              {selectedPost?.openingMsgData?.btnText}
            </div>
          </div>


        </div>
      </div>

      {/* follow to dm */}
      <div className="flex gap-2 items-end mt-10 max-w-[200px]">
        <div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="w-full rounded-xl overflow-hidden">
          <div className="p-2 bg-[#262626]">
            <h1 className="text-xs font-medium text-white break-words whitespace-pre-wrap">
              {selectedPost?.followForDMData?.text ?? ""}
            </h1>
            <div className="flex items-center justify-center font-medium rounded-lg mt-2 bg-[#363636] text-white text-xs py-1">
              {selectedPost?.followForDMData?.visitProfile}
            </div>
            <div className="flex items-center justify-center font-medium rounded-lg mt-2 bg-[#363636] text-white text-xs py-1">
              {selectedPost?.followForDMData?.imFollowing}
            </div>
          </div>
        </div>
      </div>

      {/* message */}
      <div className="flex gap-2 items-end my-10 max-w-[200px]">
        <div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="w-full rounded-xl overflow-hidden">
          <img src={previewURL || selectedPost?.dmImageUrl} alt="" className="max-h-[200px]" />
          <div className="p-2 bg-[#262626]">
            <h1 className="text-sm text-white">{selectedPost?.msgTitle}</h1>
            <p className="text-xs text-gray-400">{selectedPost?.dmText}</p>
            {selectedPost?.dmLinks?.length > 0 && <div className="flex items-center justify-center rounded-lg mt-2 bg-[#363636] text-white text-xs py-1">
              {selectedPost?.dmLinks?.[0]?.title}
            </div>}
          </div>


        </div>
      </div>

      <div className="bg-[#262626] sticky bottom-2 left-0 w-full p-2 rounded-2xl flex items-center justify-between">
        <p className="text-gray-500 text-xs">Message...</p>
        <div className="text-gray-300 flex gap-3">
          <MdMic />
          <ImImage />
        </div>
      </div>
    </div>
  )
}

