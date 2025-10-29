import React, { useCallback, useMemo, useState } from "react";
import useUser from "../../context/userContext";

type KeywordSetupProps = {
  className?: string;
};

const KeywordSetup: React.FC<KeywordSetupProps> = ({ className = "" }) => {;
  const [input, setInput] = useState<string>("");
  const {keywords,setKeywords, anyKeyword,setAnyKeyword, selectedPost, setSelectedPost} = useUser()

  // Add keyword on Enter
  const addKeyword = useCallback(() => {
    const k = input.trim();
    if (!k) return;
    if (selectedPost.anyKeyword) setSelectedPost((prev) => ({...prev,anyKeyword : false}));
    setSelectedPost((prev) => ({...prev, keywords : [...prev.keywords, k] }))
    console.log(selectedPost);
    
    setInput("");
  }, [input, anyKeyword]);

  const removeKeyword = useCallback((k: string) => {
    setSelectedPost((prev) => ({...prev, keywords: prev.keywords.filter((x) => x !== k)}))
  }, []);

  // Toggle handler
  const handleToggle = useCallback(() => {
    setSelectedPost((prev) => ({...prev, anyKeyword : !prev.anyKeyword, keywords : []}))
  }, []);

  const pills = useMemo(
    () =>
      selectedPost?.keywords.map((k) => (
        <span
          key={k}
          className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-slate-700"
        >
          {k}
          <button
            type="button"
            className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-200 text-[18px] cursor-pointer text-slate-600 hover:bg-gray-300"
            onClick={() => removeKeyword(k)}
            aria-label={`Remove ${k}`}
          >
            ×
          </button>
        </span>
      )),
    [selectedPost.keywords, removeKeyword]
  );

  return (
    <div className={`w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
            2
          </span>
          <h2 className="text-xl font-semibold text-slate-900">Setup Keywords</h2>
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={selectedPost.anyKeyword}
          className={[
            "relative inline-flex cursor-pointer h-6 w-12 items-center rounded-full transition-colors",
            selectedPost.anyKeyword ? "bg-violet-600" : "bg-gray-300",
          ].join(" ")}
          title="Any keyword"
        >
          <span
            className={[
              "absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
              selectedPost.anyKeyword ? "translate-x-6" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>
      
      <p className="mt-3 text-[15px] text-slate-500">Any keyword</p>
      <div className="my-4 h-px w-full bg-gray-200" />

      {/* Input */}
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addKeyword();
            }
          }}
          placeholder="Type & Hit ↵ Enter to add Keyword"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
        />
      </div>

      {/* Pills */}
      <div className="mt-5 flex flex-wrap gap-2 font-medium">{pills}</div>
    </div>
  );
};

export default KeywordSetup;
