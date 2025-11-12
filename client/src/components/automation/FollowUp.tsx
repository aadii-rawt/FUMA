import React, { useCallback, useState } from "react";
import { FiTrash2, FiEdit2, FiX, FiPlusCircle } from "react-icons/fi";
import useUser from "../../context/userContext";
import { FaCrown } from "react-icons/fa";


type LinkItem = { id: string; text: string; url: string };
const Defaultmsg = `Still here? You must like the madness 😏
More crazy reels on the way — don’t follow if you hate good vibes.`

const FollowUp: React.FC = () => {
  const { selectedPost, user, setSelectedPost, setShowSubscriptionModal, setCurrentPreview } = useUser();

  const [openModal, setOpenModal] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftUrl, setDraftUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const startAdd = () => {
    setEditingId(null);
    setDraftTitle("");
    setDraftUrl("");
    setOpenModal(true);
  };

  const startEdit = (item: LinkItem) => {
    setEditingId(item.id);
    setDraftTitle(item.text);
    setDraftUrl(item.url);
    setOpenModal(true);
  };

  const saveLink = () => {
    if (!draftTitle.trim() || !draftUrl.trim()) return;
    if (editingId) {
      setSelectedPost((prev) => ({ ...prev, followUpData: { ...prev.followUpData, dmLinks: prev.followUpData.dmLinks.map(l => (l.id === editingId ? { ...l, text: draftTitle.trim(), url: draftUrl.trim() } : l)) } }))
    } else {
      setSelectedPost((prev) => ({ ...prev, followUpData: { ...prev.followUpData, dmLinks: [...prev.followUpData.dmLinks, { id: Math.random().toString(36).slice(2), text: draftTitle.trim(), url: draftUrl.trim() }] } }))
    }
    setOpenModal(false);
    setDraftTitle("");
    setDraftUrl("");
    setEditingId(null);
  };

 

  const handleToggle = useCallback(() => {
    if (user.plan != "ULTIMATE") {
      setShowSubscriptionModal(true)
      return
    }


    if (selectedPost.followUp) {
      setSelectedPost((prev) => {
        const { followUpData, ...rest } = prev
        return { ...rest, followUp: false }
      })
      return

    }

    setSelectedPost((prev) => ({
      ...prev, followUp: true, followUpData: {
        text: Defaultmsg,
        dmLinks: [{
          id: Math.random().toString(36).slice(2),
          text: "Visit Profile",
          url: `https://www.instagram.com/${user.username}`
        }]
      }
    }))
  }, [selectedPost.followUp]);


  const removeLink = (id: string) => setSelectedPost((prev) => ({ ...prev, dmLinks: prev.dmLinks.filter(l => l.id !== id) }));

  return (
    <div onClick={() => setCurrentPreview("msg")} className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Follow Up Message</h2>
        </div>

        {/* Toggle */}
        <div className='flex items-center gap-3'>
          <div className='px-5 py-1 text-amber-700 text-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-2xl'>
            <FaCrown />
          </div>

          <button
            type="button"
            onClick={handleToggle}
            aria-pressed={selectedPost.followUp}
            className={[
              "relative cursor-pointer inline-flex h-6 w-12 items-center rounded-full transition-colors",
              selectedPost.followUp ? "bg-violet-600" : "bg-gray-300",
            ].join(" ")}
            title="Any keyword"
          >
            <span
              className={[
                "absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
                selectedPost.followUp ? "translate-x-6" : "translate-x-0",
              ].join(" ")}
            />
          </button>
        </div>
      </div>



      {/* Links list */}
      {selectedPost?.followUp && <> <div className='rounded-xl p-3 border mt-4 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
        <textarea
          name=""
          value={selectedPost?.followUpData?.text}
          onChange={(e) => setSelectedPost((prev) => ({ ...prev, followUpData: { ...prev.followUpData, text: e.target.value } }))}
          className='w-full outline-none border-none resize-none '
          rows={5}></textarea>
        <p className='text-sm text-gray-400'>23/1000</p>
      </div>
        <div className='space-y-2'>

          {selectedPost.followUpData.dmLinks.length > 0 && (
            <div className="mt-4 space-y-3">
              {selectedPost.followUpData.dmLinks.map((l) => (
                <div key={l.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px]">
                  <span className="truncate">{l.text}</span>
                  <div className="ml-3 flex items-center gap-2">
                    <button className="rounded-md cursor-pointer p-2 text-slate-600 hover:bg-gray-100" onClick={() => startEdit(l)} aria-label="Edit">
                      <FiEdit2 />
                    </button>
                    <button className="rounded-md cursor-pointer p-2 text-slate-600 hover:bg-gray-100" onClick={() => removeLink(l.id)} aria-label="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}


          <button onClick={startAdd} className="mt-4 flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-medium text-[#6E32FF]">
            <FiPlusCircle /> Add Link
          </button>
        </div>
      </>
      }

      {openModal && (
        <div className="fixed inset-0 z-[1000] grid place-items-center" onMouseDown={(e) => e.target === e.currentTarget && setOpenModal(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-[1001] w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-200 px-6 py-3">
              <h3 className="text-xl font-semibold text-gray-900">Add Message</h3>
              <button onClick={() => setOpenModal(false)} className="rounded-full cursor-pointer p-2 text-gray-500 hover:bg-gray-100">
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-3">
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="Enter Title     Open Link"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
              <input
                value={draftUrl}
                onChange={(e) => setDraftUrl(e.target.value)}
                placeholder="Enter Link     https://example.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <button onClick={saveLink} className="w-full rounded-xl bg-[#6E32FF] py-3 cursor-pointer text-lg font-semibold text-white hover:opacity-95">
                {editingId ? "Update Message" : "Add Message"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FollowUp;
