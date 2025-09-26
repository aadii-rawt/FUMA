import React, { useCallback, useMemo, useState } from "react";

type KeywordSetupProps = {
  className?: string;
};

const KeywordSetup: React.FC<KeywordSetupProps> = ({ className = "" }) => {
  const [anyKeyword, setAnyKeyword] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);

  // Add keyword on Enter
  const addKeyword = useCallback(() => {
    const k = input.trim();
    if (!k) return;
    // typing any keyword should turn OFF "Any keyword"
    if (anyKeyword) setAnyKeyword(false);

    setKeywords((prev) => {
      const next = Array.from(new Set([...prev, k])); // dedupe
      return next;
    });
    setInput("");
  }, [input, anyKeyword]);

  const removeKeyword = useCallback((k: string) => {
    setKeywords((prev) => prev.filter((x) => x !== k));
  }, []);

  // Toggle handler
  const handleToggle = useCallback(() => {
    setAnyKeyword((prev) => {
      const next = !prev;
      // If turned ON after writing keywords → clear all keywords
      if (next) {
        setKeywords([]);
        setInput("");
      }
      return next;
    });
  }, []);

  const pills = useMemo(
    () =>
      keywords.map((k) => (
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
    [keywords, removeKeyword]
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
          aria-pressed={anyKeyword}
          className={[
            "relative inline-flex h-6 w-12 items-center rounded-full transition-colors",
            anyKeyword ? "bg-violet-600" : "bg-gray-300",
          ].join(" ")}
          title="Any keyword"
        >
          <span
            className={[
              "absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
              anyKeyword ? "translate-x-6" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Subtext */}
      <p className="mt-3 text-[15px] text-slate-500">Any keyword</p>

      {/* Divider */}
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
