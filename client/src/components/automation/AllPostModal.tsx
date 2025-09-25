import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import Axios from "../../utils/axios";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

const AllPostModal: React.FC<Props> = ({ open, onClose, title, subtitle }) => {
  const el = document.getElementById("portal") as HTMLElement;
  const [posts, setPosts] = useState([])

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

  const getPosts = async () => {
    try {
      const res = await Axios.get("/ig/media", { params: { limit: 5, } });
      console.log(res);
      setPosts(res.data.items)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts()
  }, [])


  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000]"
      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        // close if clicking dark backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0  bg-black/50 backdrop-blur-[1px]" />
      {/* Dialog */}
      <div className="absolute inset-0 flex  items-start justify-center ">
        <div className="mx-4 mt-16 w-full overflow-hidden max-w-3xl rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between border-b px-6 py-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{title ?? "Select Post or Reel"}</h3>
              <p className="text-sm text-gray-500">{subtitle ?? "Choose from your posts and reels"}</p>
            </div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          {/* posts */}
          <div className="">
            {posts?.length == 0 && <p className="p-6 text-center text-gray-500">No posts found</p>}
            {posts?.map((post: any) => (
              <div key={post.id} className="relative cursor-pointer h-54 w-40 overflow-hidden rounded-xl border-2 border-indigo-500 p-0 m-4 inline-block">
                <img src={post?.thumbnail_url} />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4">
            <button className="w-full rounded-xl bg-[#6E32FF] py-4 text-lg font-semibold text-white hover:opacity-95">
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>,
    el
  );
};

export default AllPostModal;
