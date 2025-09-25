import { useState } from "react";

export default function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className={`w-11 h-6 rounded-full relative transition
        ${on ? "bg-emerald-500" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
        ${on ? "translate-x-5" : ""}`}
      />
    </button>
  );
}
