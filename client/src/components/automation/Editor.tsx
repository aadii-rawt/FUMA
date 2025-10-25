import React, { useEffect, useState } from "react";
import Axios from "../../utils/axios";
import useUser from "../../context/userContext";
import AllPostModal from "./AllPostModal";
import KeywordSetup from "./KeywordSetup";
import DMComposer from "./DMComposer";
import ReelShimmer from "../shimmer/ReelShimmer";


const Editor: React.FC = () => {
  const [posts, setPosts] = useState([])
  const { selectedPost, setSelectedPost } = useUser()
  const [allPostModalOpen, setAllPostModalOpen] = useState(false)
  const {user} = useUser()
  const [loading,setLoading] = useState(true)

  const getPosts = async () => {
    if(!user) return
    try {
      setLoading(true)
      const res = await Axios.get("/ig/media",{ params: { limit: 3, access_token : user.access_token} });
      setPosts(res.data.data)
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  const handleSelectPost = (post) => {
    setSelectedPost((prev) => ({...prev, postMediaId : post.id, postThumbnail : post.thumbnail_url,caption : post.caption}))
    console.log(selectedPost);
  }

  return (
    <div className=" px-10 py-6 space-y-5 bg-gray-100 h-full overflow-y-scroll">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
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

        </div>


        {/* Tiles */}
        <div className="mt-5 flex gap-5">
          {loading ? <ReelShimmer /> : posts?.map((post: any,i) => (
            <div key={i} onClick={() => handleSelectPost(post)} className={`${post.id == selectedPost?.postMediaId && "border-2 border-indigo-500"} relative cursor-pointer h-50 w-40 overflow-hidden rounded-xl  p-0`}>
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
          className="mt-3 w-full rounded-xl border border-gray-200 py-3 text-center text-lg font-medium text-indigo-700 transition hover:bg-indigo-50"
        >
          Show More
        </button>
        <AllPostModal open={allPostModalOpen} onClose={() => setAllPostModalOpen(false)}  setSelectedPost={setSelectedPost} />

      </div>
      <KeywordSetup />

      <DMComposer />
    </div>
  );
};

export default Editor;
