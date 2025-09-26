import React, { useCallback, useMemo, useRef, useState } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiX, FiImage, FiPlusCircle } from "react-icons/fi";

type LinkItem = { id: string; title: string; url: string };

const DMComposer: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftUrl, setDraftUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const MAX = 80; // change to 1000 if you want the other variant

  const onPick = useCallback(() => fileRef.current?.click(), []);
  const onFile = useCallback((f?: File) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  }, []);
  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  };

  const startAdd = () => {
    setEditingId(null);
    setDraftTitle("");
    setDraftUrl("");
    setOpenModal(true);
  };
  const startEdit = (item: LinkItem) => {
    setEditingId(item.id);
    setDraftTitle(item.title);
    setDraftUrl(item.url);
    setOpenModal(true);
  };
  const saveLink = () => {
    if (!draftTitle.trim() || !draftUrl.trim()) return;
    if (editingId) {
      setLinks((prev) =>
        prev.map((l) => (l.id === editingId ? { ...l, title: draftTitle.trim(), url: draftUrl.trim() } : l))
      );
    } else {
      setLinks((prev) => [
        ...prev,
        { id: Math.random().toString(36).slice(2), title: draftTitle.trim(), url: draftUrl.trim() },
      ]);
    }
    setOpenModal(false);
    setDraftTitle("");
    setDraftUrl("");
    setEditingId(null);
  };
  const removeLink = (id: string) => setLinks((prev) => prev.filter((l) => l.id !== id));

  const counter = useMemo(() => `${message.length} / ${MAX}`, [message.length]);

  return (
    <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-sm font-semibold text-white">3</span>
        <h2 className="text-xl font-semibold text-slate-900">Send a DM</h2>
      </div>

      {/* Image picker */}
      {!imageUrl ? (
        <div
          onClick={onPick}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mb-4 grid h-28 w-full cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-gray-300 text-slate-400"
        >
          <div className="flex items-center gap-2 text-[15px]">
            <FiImage className="text-xl" />
            <span>Select / Drop an Image</span>
          </div>
        </div>
      ) : (
        <div className="relative mb-4 overflow-hidden rounded-2xl">
          <img src={imageUrl} className="block h-48 w-full object-cover" />
          <button
            onClick={onPick}
            className="absolute cursor-pointer left-3 bottom-3 rounded-full bg-black/60 px-3 py-2 text-sm font-semibold text-white backdrop-blur"
          >
            Change
          </button>
          <button
            onClick={() => {
              if (imageUrl) URL.revokeObjectURL(imageUrl);
              setImageUrl(null);
            }}
            className="absolute cursor-pointer right-3 bottom-3 rounded-full bg-black/60 p-2 text-white backdrop-blur"
            aria-label="Remove image"
          >
            <FiTrash2 />
          </button>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => onFile(e.target.files?.[0])}
      />

      {/* Message input */}
      <div className="rounded-2xl border border-gray-200 p-4">
        <textarea
          value={message}
          maxLength={MAX}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
          
          className="outline-none w-full auto-scale resize-none border-0 p-0 text-[15px] placeholder:text-slate-400 focus:ring-0"
        />
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
          <span className="inline-block h-3 w-3 rounded-full border" />
          <span>{counter}</span>
        </div>
      </div>

      {/* Links list */}
      {links.length > 0 && (
        <div className="mt-4 space-y-3">
          {links.map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px]"
            >
              <span className="truncate">{l.title}</span>
              <div className="ml-3 flex items-center gap-2">
                <button
                  className="rounded-md p-2 text-slate-600 hover:bg-gray-100"
                  onClick={() => startEdit(l)}
                  aria-label="Edit"
                >
                  <FiEdit2 />
                </button>
                <button
                  className="rounded-md p-2 text-slate-600 hover:bg-gray-100"
                  onClick={() => removeLink(l.id)}
                  aria-label="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Link button */}
      <button
        onClick={startAdd}
        className="mt-4 flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-medium text-[#6E32FF]"
      >
       <FiPlusCircle />
        Add Link
      </button>

      {/* Modal */}
      {openModal && (
        <div
          className="fixed inset-0 z-[1000] grid place-items-center"
          onMouseDown={(e) => e.target === e.currentTarget && setOpenModal(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-[1001] w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-200 px-6 py-3">
              <h3 className="text-xl font-semibold text-gray-900">Add Message</h3>
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-full cursor-pointer p-2 text-gray-500 hover:bg-gray-100"
              >
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
              <button
                onClick={saveLink}
                className="w-full rounded-xl bg-[#6E32FF] py-3 cursor-pointer text-lg font-semibold text-white hover:opacity-95"
              >
                {editingId ? "Update Message" : "Add Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DMComposer;
