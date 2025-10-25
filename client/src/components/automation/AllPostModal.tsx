import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import Axios from "../../utils/axios";
import useUser from "../../context/userContext";

type Props = {
  open: boolean;
  onClose: () => void;
  subtitle?: string;
  setSelectedPost? : () => void,

};

const AllPostModal: React.FC<Props> = ({ open, onClose, setSelectedPost }) => {
  const el = document.getElementById("portal") as HTMLElement;
  const [posts, setPosts] = useState([])
  const [select, setSelect] = useState(null)
  const {user} = useUser()

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return
      try {
        const res = await Axios.get("/ig/media", { params: { limit: 50,access_token : user?.access_token } });

        setPosts(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    getPosts()
  }, [])

  const confirmSelection = () => {
    setSelectedPost((prev) => ({...prev, postMediaId : select?.id, postThumbnail : select.thumbnail_url }))
    onClose()
  }


  if (!open) return null;

  return createPortal(
    <div
      className="fixed flex items-center justify-center inset-0 z-[1000] bg-black/50 backdrop-blur-[1px] w-full min-h-screen"
      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        // close if clicking dark backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >

      <div className="max-w-xl bg-white rounded-2xl shodow-lg">

        <div className="flex items-start justify-between border-b border-gray-200 px-3 py-4">
          <div>
            {/* <h3 className="text-xl font-semibold text-gray-900">{title ?? "Select Post or Reel"}</h3>
            <p className="text-sm text-gray-500">{subtitle ?? "Choose from your posts and reels"}</p> */}
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-full cursor-pointer p-2 text-gray-500 hover:bg-gray-100"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-wrap px-4 gap-4 my-5 w-full h-54 overflow-hidden overflow-y-scroll">
          {posts?.map((post: any, i) => (
            <div key={i} onClick={() => setSelect(post)} className={`${post.id == select?.id && "border-2 border-indigo-500"} relative cursor-pointer h-54 w-40 overflow-hidden rounded-xl  p-0`}>
              <img
                src={post?.thumbnail_url} className="w-full h-full" />
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 px-3 py-3">
          <button onClick={confirmSelection} className="w-full rounded-xl cursor-pointer bg-[#6527f7] py-4 text-lg font-semibold text-white hover:opacity-95">
            Confirm Selection
          </button>
        </div>
      </div>
    </div >,
    el
  );
};

export default AllPostModal;
