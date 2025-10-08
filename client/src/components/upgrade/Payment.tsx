import React, { useState } from "react";
import {
  FiX,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiChevronDown,
  FiPercent,
  FiArrowRight,
  FiLoader,
} from "react-icons/fi";

type Method = "card" | "upi";

export default function Payment() {
  const [method, setMethod] = useState<Method>("upi");
  const [loading, setLoading] = useState(false);

  const pay = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="w-full">

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* LEFT: form */}
        <div className="space-y-8">
          {/* Billed to */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">Billed to</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Name" placeholder="aditya" />
              <div>
                <Label>Phone</Label>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm text-gray-700">
                    <span className="text-lg">🇮🇳</span>
                    <FiChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  <input
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40"
                    placeholder="+91 1234 567 890"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Billing details */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">Billing Details</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Country" placeholder="India" LeftIcon={FiMapPin} />
              <Input label="City" placeholder="Delhi" />
            </div>
            <button className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:opacity-90">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-purple-50 text-purple-600">+</span>
              Add Business Details
            </button>
          </section>

          {/* Payment details */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">Payment Details</h3>

            {/* tabs */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setMethod("card")}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition
                ${method === "card" ? "border-purple-400 text-gray-900 ring-2 ring-purple-200" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                <span className="grid h-7 w-10 place-items-center rounded-md bg-gray-100">
                  <FiCreditCard />
                </span>
                Credit/Debit Card
              </button>

              <button
                onClick={() => setMethod("upi")}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition
                ${method === "upi" ? "border-purple-400 text-gray-900 ring-2 ring-purple-200" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                <span className="grid h-7 w-10 place-items-center rounded-md bg-purple-100 text-purple-600">
                  ▲
                </span>
                UPI or QR
              </button>
            </div>

            {/* banner */}
            {method === "upi" && (
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-purple-300 bg-purple-50/60 px-4 py-3 text-sm font-semibold text-purple-700">
                <span className="flex -space-x-1.5">
                  <Badge>G</Badge>
                  <Badge>P</Badge>
                  <Badge>₹</Badge>
                </span>
                Scan &amp; pay using your preferred UPI App
              </div>
            )}
          </section>
        </div>

        {/* RIGHT: summary card */}
        <aside className="lg:sticky lg:top-6">
          <div className="rounded-3xl border bg-white shadow-sm">
            {/* header gradient */}
            <div className="rounded-t-3xl bg-gradient-to-br from-purple-50 via-white to-purple-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xl font-semibold">
                    Upgrade to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">Pro</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="mr-3 line-through text-gray-500">₹14,388</span>
                    <span className="font-semibold text-gray-900">₹9,588</span>
                    <span className="text-gray-500"> /yr</span>
                  </div>
                </div>
                <button className="text-sm font-semibold text-gray-700 underline underline-offset-2">Change</button>
              </div>
            </div>

            {/* body */}
            <div className="space-y-4 p-5">
              <Row
                left={
                  <div>
                    <div className="font-medium text-gray-800">Pro (Yearly)</div>
                    <div className="text-sm text-gray-500">
                      Billed today, then billed yearly
                    </div>
                  </div>
                }
                right={
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">₹9,588</div>
                    <div className="text-sm text-gray-500">₹9,588 /yr after</div>
                  </div>
                }
              />

              <button className="flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                <span className="inline-flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <FiPercent />
                  </span>
                  Add promotion code
                </span>
                <FiArrowRight />
              </button>

              <Divider />

              <Row left={<span>Subtotal</span>} right={<span>₹9,588</span>} />
              <Row left={<span>IGST (18%)</span>} right={<span>₹1,726</span>} />

              <Divider />

              <Row
                left={<span className="font-semibold">Total Due Today</span>}
                right={<span className="font-semibold">₹11,314</span>}
              />
              <div className="text-sm text-gray-500">
                Billed next on <b>08 October 2026</b>
              </div>

              <button
                onClick={pay}
                className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-purple-600 font-semibold text-white hover:bg-purple-600/90"
              >
                {loading ? (
                  <FiLoader className="h-5 w-5 animate-spin" />
                ) : (
                  "Pay Now"
                )}
              </button>

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-purple-100 text-purple-600">
                    %
                  </span>
                  <div>
                    <div className="font-semibold text-gray-800">
                      You save ₹4,800
                    </div>
                    <div className="text-sm text-gray-500">
                      Includes yearly savings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- tiny atoms ---------- */

function Input({
  label,
  placeholder,
  LeftIcon,
}: {
  label: string;
  placeholder?: string;
  LeftIcon?: React.ComponentType<any>;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        {LeftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <LeftIcon className="h-4 w-4" />
          </span>
        )}
        <input
          className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40 ${
            LeftIcon ? "pl-9" : ""
          }`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
      {children}
    </div>
  );
}

function Row({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between text-sm text-gray-700">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function Divider() {
  return <hr className="my-2 border-gray-200" />;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full border border-purple-300 bg-white text-[11px] font-bold text-purple-700">
      {children}
    </span>
  );
}
