import React, { useCallback, useMemo, useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import useUser from '../../context/userContext'
import { FiEdit2, FiPlusCircle, FiTrash2, FiX } from 'react-icons/fi'

const Defaultmsg = `Oh no! It seems you're not following me 👀It would really mean a lot if you visit my profile and hit the follow button😁. Once you have done that, click on the 'I'm following' button below and you will get the link ✨.`
const AddProducts = () => {

  const { selectedPost, setSelectedPost, imageUrl, setImageUrl, previewURL, setPreviewURL, setCurrentPreview } = useUser();

  const handleToggle = useCallback(() => {
    if (selectedPost.hasProducts) {
      setSelectedPost((prev) => {
        const { products, ...rest } = prev
        return { ...rest, hasProducts: false }
      })
      return

    }

    setSelectedPost((prev) => ({
      ...prev, hasProducts: true,
    }))
  }, [selectedPost.hasProducts]);

  const [openModal, setOpenModal] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftUrl, setDraftUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const objectUrlRef = useRef<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const MAX = 80;

  const onPick = useCallback(() => fileRef.current?.click(), []);


  const removeImage = () => {
    if (imageUrl?.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
  };

  const startAdd = () => {
    setEditingId(null);
    setDraftTitle("");
    setDraftUrl("");
    setOpenModal(true);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setDraftTitle(item.title);
    setDraftUrl(item.url);
    setOpenModal(true);
  };

  const saveLink = () => {
    if (!draftTitle.trim() || !draftUrl.trim()) return;
    if (editingId) {
      setSelectedPost((prev) => ({ ...prev, products: prev.products.map(l => (l.id === editingId ? { ...l, title: draftTitle.trim(), url: draftUrl.trim() } : l)) }))
    } else {
      setSelectedPost((prev) => ({ ...prev, products: [...prev.products, { id: Math.random().toString(36).slice(2), title: draftTitle.trim(), url: draftUrl.trim() }] }))
    }

    setOpenModal(false);
    setDraftTitle("");
    setDraftUrl("");
    setEditingId(null);
  };

  const toDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // data:image/...;base64,XXXX
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return; // optional: show error
    if (file.size > 10 * 1024 * 1024) return;   // optional: show error

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPreviewURL(objectUrl);

    const dataUri = await toDataURL(file); // data:image/...;base64,XXXX
    setSelectedPost(prev => ({ ...prev, dmImageUrl: dataUri }));
  };

  const removeLink = (id: string) => setSelectedPost((prev) => ({ ...prev, dmLinks: prev.dmLinks.filter(l => l.id !== id) }));

  const counter = useMemo(() => `${selectedPost.dmText.length} / ${MAX}`, [selectedPost.dmText.length]);

  return (
    <div onClick={() => setCurrentPreview("msg")} className={`w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Add Products</h2>
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={selectedPost.hasProducts}
          className={[
            "relative cursor-pointer inline-flex h-6 w-12 items-center rounded-full transition-colors",
            selectedPost.hasProducts ? "bg-violet-600" : "bg-gray-300",
          ].join(" ")}
          title="Any keyword"
        >
          <span
            className={[
              "absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
              selectedPost.hasProducts ? "translate-x-6" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>

      {selectedPost?.hasProducts && <div>

        {selectedPost.products.length > 0 && (
          <div className="mt-4 space-y-3">
            {selectedPost.products.map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px]">
                <span className="truncate">{l.title}</span>
                <div className="ml-3 flex items-center gap-2">
                  <button className="rounded-md p-2 text-slate-600 hover:bg-gray-100" onClick={() => startEdit(l)} aria-label="Edit">
                    <FiEdit2 />
                  </button>
                  <button className="rounded-md p-2 text-slate-600 hover:bg-gray-100" onClick={() => removeLink(l.id)} aria-label="Delete">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={startAdd}
          className="mt-4 flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-medium text-[#6E32FF]">
          <FiPlusCircle /> Add Link
        </button>

      </div>
      }

      {/* Modal (unchanged UI) */}
      {openModal && (
        <div className="fixed inset-0 z-[1000] grid place-items-center" onMouseDown={(e) => e.target === e.currentTarget && setOpenModal(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-[1001] w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-200 px-6 py-3">
              <h3 className="text-xl font-semibold text-gray-900">Add Product</h3>
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
                {editingId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AddProducts