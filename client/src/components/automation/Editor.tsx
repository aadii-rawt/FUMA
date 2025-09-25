// Editor.tsx
import React, { useEffect, useState } from "react";
import { FiZap } from "react-icons/fi";
import { BsPlayFill } from "react-icons/bs";
import Axios from "../../utils/axios";
import useUser from "../../context/userContext";
import AllPostModal from "./AllPostModal";

type EditorProps = {
  selectedThumb?: string;
};

interface InterPayLoad {
  limit: number;
  type: string;
}

const Editor: React.FC<EditorProps> = ({
  selectedThumb = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
}) => {
  const [anyPost, setAnyPost] = useState(false);
  const [posts, setPosts] = useState([])
  const { selectedPost, setSelectedPost } = useUser()
  const [allPostModalOpen, setAllPostModalOpen] = useState(false)

  const getPosts = async () => {
    try {
      const res = await Axios.get("/ig/media", { params: { limit: 3, } });
      console.log(res);
      setPosts(res.data.items)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="w-1/2  rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
            1
          </span>
          <h2 className="text-xl font-semibold text-gray-900">
            Select a Post or Reel
          </h2>
        </div>

        {/* Toggle */}
        <button
          type="button"
          aria-pressed={anyPost}
          onClick={() => setAnyPost((s) => !s)}
          className={[
            "relative inline-flex h-8 w-14 items-center rounded-full transition-colors",
            anyPost ? "bg-indigo-600" : "bg-gray-200",
          ].join(" ")}
        >
          <span
            className={[
              "absolute left-1 h-6 w-6 rounded-full bg-white shadow transition-transform",
              anyPost ? "translate-x-6" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Sub label */}
      <p className="mt-4 text-lg text-gray-700">Any post or reel</p>

      {/* Tiles */}
      <div className="mt-5 flex gap-5">
        {/* Selected media tile */}
        {posts?.map((post: any) => (
          <div onClick={() => setSelectedPost(post)} className={`${post.id == selectedPost?.id && "border-2 border-indigo-500"} relative cursor-pointer h-54 w-40 overflow-hidden rounded-xl  p-0`}>
            <img
              src={post?.thumbnail_url}
              alt="Selected post"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Show more */}
      <button
      onClick={() => setAllPostModalOpen(true)}
        type="button"
        className="mt-6 w-full rounded-xl border border-gray-200 py-3 text-center text-lg font-medium text-indigo-700 transition hover:bg-indigo-50"
      >
        Show More
      </button>
      <AllPostModal open={allPostModalOpen} onClose={() => setAllPostModalOpen(false)} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />

    </div>
  );
};

export default Editor;
