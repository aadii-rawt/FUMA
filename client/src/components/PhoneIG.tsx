import { HiChevronLeft } from "react-icons/hi2";

export default function PhoneIG() {
  return (
    <div className="relative w-[360px] h-[720px] rounded-[34px] bg-black text-white shadow-2xl border border-gray-800 overflow-hidden">
      {/* Notch */}
      <div className="absolute inset-x-0 top-0 flex justify-center">
        <div className="h-6 w-40 bg-black rounded-b-2xl border-b border-gray-800" />
      </div>

      {/* Header */}
      <div className="h-12 px-4 flex items-center gap-2">
        <HiChevronLeft className="text-xl" />
        <span className="mx-auto text-sm font-semibold">Posts</span>
      </div>

      {/* Username row */}
      <div className="px-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/10 grid place-items-center">◎</div>
        <span className="text-sm font-medium">@dotdiscount</span>
        <span className="ml-auto">⋯</span>
      </div>

      {/* Post image */}
      <div className="mt-3 px-4">
        <div className="aspect-[4/5] w-full bg-black rounded-xl overflow-hidden border border-white/10">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1612198182441-1c1f5f5e7b44?q=80&w=1200&auto=format&fit=crop"
            alt="post"
          />
        </div>
      </div>

      {/* Actions (fake) */}
      <div className="px-6 py-3 flex items-center gap-4 text-xl opacity-90">♡ 💬 ➤ ⤴︎</div>

      {/* Caption */}
      <div className="px-6 text-[11px] leading-4 text-white/90">
        <span className="font-semibold">dotdiscount</span> Comment for Link 🔗……
        <br />Follow and comment for more products…
      </div>
    </div>
  );
}
