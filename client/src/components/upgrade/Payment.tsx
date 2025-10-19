import React, { useEffect, useMemo, useState } from "react";
import {
  FiCreditCard,
  FiPercent,
  FiArrowRight,
  FiLoader,
  FiMapPin,
} from "react-icons/fi";

type Method = "card" | "upi";

// Optional: allow parent to pass selected plan & collect payload
type PlanSummary = {
  name: string;               // e.g., "Pro"
  cycle: "Monthly" | "Yearly";
  priceStruck?: string;       // "₹14,388"
  priceFinal: string;         // "₹9,588"
  periodSuffix: string;       // "/yr" or "/mo"
  nextBillingDate?: string;   // "08 October 2026"
};

type Props = {
  selectedPlan : any;
  plan?: PlanSummary;
  onPayAllDetails?: (payload: any) => void; // optional callback; still console.log
  onBack : (payload : any) => void
};

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function Payment({ selectedPlan, plan, onPayAllDetails, onBack }: Props) {
  
  const total = (18 / 100) * selectedPlan?.price  + selectedPlan.price
  const [method, setMethod] = useState<Method>("upi"); // purely visual now
  const [loading, setLoading] = useState(false);

  // ---- form state (no visual change) ----
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // +91 ...
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [promo, setPromo] = useState("");

  // Load Razorpay script once
  useEffect(() => {
    if (window.Razorpay) return;
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // Basic validation (no method-specific inputs anymore)
  const canPay =
    name.trim().length > 1 &&
    phone.trim().length >= 8 &&
    country.trim().length > 1 &&
    city.trim().length > 1;

  // Parse "₹11,314" => 11314 (INR), then paise
  const parseINR = (inr: string) => {
    const n = Number(String(inr).replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };


  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string; // put your key id in env

  const openRazorpay = (amountINR: number, payload: any) => {
    if (!window.Razorpay) {
      alert("Payment gateway not loaded yet. Please try again in a moment.");
      return;
    }
    if (!keyId) {
      console.error("Missing VITE_RAZORPAY_KEY_ID");
      alert("Razorpay key not configured");
      return;
    }

    const options = {
      key: keyId,
      amount: amountINR * 100, // paise
      currency: "INR",
      name: "FUMA",
      description: `${selectedPlan.title} plan`,
      // You can create an order on your backend and pass order_id here:
      // order_id: "<from-your-backend>",
      prefill: {
        name,
        contact: phone,
        email: "", // supply if you capture it
      },
      notes: {
        promo: promo || "",
        plan_name: "summary.name",
        plan_cycle:" summary.cycle",
        source_component: "Payment",
      },
      theme: { color: "#7c3aed" },
      handler: function (response: any) {
        // Razorpay success
        const successPayload = {
          ...payload,
          razorpay: {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
          },
          status: "success",
        };
        console.log("✅ PAYMENT SUCCESS", successPayload);
        onPayAllDetails?.(successPayload);
        setLoading(false);
      },
      modal: {
        ondismiss: function () {
          const failPayload = {
            ...payload,
            status: "dismissed",
          };
          console.log("ℹ️ Payment modal dismissed", failPayload);
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (resp: any) {
      const failPayload = {
        ...payload,
        status: "failed",
        razorpay_error: resp?.error,
      };
      console.log("❌ PAYMENT FAILED", failPayload);
      onPayAllDetails?.(failPayload);
      setLoading(false);
    });
    rzp.open();
  };

  const pay = () => {
    if (!canPay) return;
    setLoading(true);

    // Compose your single final payload (no method-specific inputs)
    const payload = {
      billedTo: { name, phone },
      billingDetails: { country, city },
      promotion: promo || null,
      selectedMethodTab: method, // purely visual
      meta: {
        createdAt: new Date().toISOString(),
        component: "Payment",
      },
    };

    console.log("🧾 INITIATING RAZORPAY WITH PAYLOAD", payload);

    openRazorpay(total, payload);
  };

  return (
    <div className="w-full">
      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* LEFT: form */}
        <div className="space-y-6">
          {/* Billed to */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">Billed to</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div>
                <Label>Phone</Label>
                <div className="flex items-center gap-2">
                  <input
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40"
                    placeholder="+91 0000 000 000"
                    value={phone}
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Billing details */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">Billing Details</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Country"
                placeholder="country"
                LeftIcon={FiMapPin}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Input
                label="City"
                placeholder="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </section>

          {/* Payment details */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">Payment Details</h3>

            {/* tabs — purely visual now */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setMethod("card")}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 cursor-pointer text-sm font-semibold transition
                ${method === "card" ? "border-purple-400 text-gray-900 ring-2 ring-purple-200" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                <span className="grid h-5 w-10 place-items-center rounded-md bg-gray-100">
                  <FiCreditCard />
                </span>
                Credit/Debit Card
              </button>

              <button
                onClick={() => setMethod("upi")}
                className={`flex items-center gap-3 rounded-xl border cursor-pointer px-3 py-2.5 text-sm font-semibold transition
                ${method === "upi" ? "border-purple-400 text-gray-900 ring-2 ring-purple-200" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                <span className="grid h-5 w-10 place-items-center rounded-md bg-purple-100 text-purple-600">
                  ▲
                </span>
                UPI or QR
              </button>
            </div>

            {/* banner (keep) */}
            {method === "upi" && (
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-purple-300 bg-purple-50/60 px-4 py-3 text-sm font-semibold text-purple-700">
                <span className="flex -space-x-1.5">
                  <Badge url='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png' />
                  <Badge url='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png' />
                  <Badge url='https://cdn.iconscout.com/icon/free/png-256/free-paytm-icon-svg-download-png-226448.png?f=webp&w=256' />
                </span>
                Scan &amp; pay using your preferred UPI App (via Razorpay)
              </div>
            )}

            {/* ❌ removed method-specific input fields as requested */}
          </section>
        </div>

        {/* RIGHT: summary card */}
        <aside className="lg:sticky lg:top-6">
          <div className="rounded-3xl border-[1.5px] border-gray-100 bg-[#fafafa]">
            {/* header gradient */}
            <div className="rounded-xl bg-gradient-to-br from-purple-50 via-white to-purple-100 p-5 m-2 border-2 border-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xl font-semibold">
                    Upgrade to{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                      {selectedPlan.title}
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    
                    <span className="font-semibold text-gray-900">
                      ₹{selectedPlan.price}
                    </span>
                    <span className="text-gray-500">/mo</span>
                  </div>
                </div>
                <button onClick={onBack} className="text-sm cursor-pointer font-semibold text-gray-700 underline underline-offset-2">
                  Change
                </button>
              </div>
            </div>

            {/* body */}
            <div className="space-y-4 p-5 px-7">
              <Row
                left={
                  <div>
                    <div className="font-medium text-gray-800">
                      {selectedPlan.title} /(mo)
                    </div>
                  </div>
                }
                right={
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">
                      ₹{selectedPlan.price}
                    </div>
                  </div>
                }
              />

              <button
                className="flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                onClick={() => {
                  const code = prompt("Enter promotion code") || "";
                  setPromo(code.trim());
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <FiPercent />
                  </span>
                  Add promotion code
                </span>
                <FiArrowRight />
              </button>

              <Divider />

              <Row left={<span>Subtotal</span>} right={<span> ₹{selectedPlan.price}</span>} />
              <Row left={<span>IGST (18%)</span>} right={<span>₹{(18 / 100) * selectedPlan.price}</span>} />

              <Divider />

              <Row
                left={<span className="font-semibold">Total</span>}
                right={<span className="font-semibold">₹{total}</span>}
              />
              <button
                onClick={pay}
                disabled={!canPay || loading}
                className="mt-2 inline-flex h-12 cursor-pointer w-full items-center justify-center rounded-xl bg-purple-600 font-semibold text-white hover:bg-purple-600/90 disabled:opacity-60"
              >
                {loading ? <FiLoader className="h-5 w-5 animate-spin" /> : "Pay Now"}
              </button>
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
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  LeftIcon?: React.ComponentType<any>;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
          value={value}
          onChange={onChange}
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

function Badge(url) {
  // console.log(url);
  
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full border border-purple-300 bg-white text-[11px] font-bold text-purple-700">
      <img src={url.url} alt="" className="w-full" />
    </span>
  );
}
