import React from "react";

type Props = { size?: number; className?: string };
export default function LoadingSpinner({ size = 18, className = "" }: Props) {
  return (
    <span className="flex items-center justify-center">

    <svg
      className={`animate-spin text-white ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {/* Track (dim ring) */}
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      {/* Arc */}
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
      />
    </svg>
    </span>
  );
}
