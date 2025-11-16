import React, { useEffect, useMemo, useState } from "react";
import { FiCreditCard, FiLoader, FiMapPin } from "react-icons/fi";
import Axios from "../../utils/axios";
import useUser from "../../context/userContext";

type Method = "card" | "upi";

type Props = {
  selectedPlan: { title: string; price: number }; // price in INR per month
  onBack: () => void;
};

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function Payment({ selectedPlan, onBack }: Props) {
  const [method, setMethod] = useState<Method>("upi");
  const [loading, setLoading] = useState(false);
  const { showSubscriptionModal } = useUser();

  // Minimal form fields (optional but nice for prefill & invoice)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // +91...
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  // Load Razorpay once
  useEffect(() => {
    if (window.Razorpay) return;
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const igst = useMemo(() => Math.round(selectedPlan.price * 0.18), [selectedPlan.price]);
  const total = useMemo(() => selectedPlan.price + igst, [selectedPlan.price, igst]);

  const canPay =
    name.trim().length > 1 &&
    phone.trim().length >= 8 &&
    country.trim().length > 1 &&
    city.trim().length > 1;

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string;

  const openRazorpay = async (amountINR: number) => {
    try {
      
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
        amount: Math.round(amountINR * 100), // paise
        currency: "INR",
        name: "FUMA",
        description: `${selectedPlan.title} plan`,
        // If you create orders in backend: add order_id here
        prefill: {
          name,
          contact: phone,
        },
        theme: { color: "#7c3aed" },
        handler: async function (response: any) {
          // Razorpay success => store in DB
          try {
            const payload = {
              razorpay: {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id, // may be undefined if you didn’t create server order
                signature: response.razorpay_signature,
              },
              planKey: selectedPlan.title.toUpperCase().replace(/\s+/g, "_"),
              planTitle: selectedPlan.title,
              interval: "MONTHLY", // adjust if you also sell yearly here
              currency: "INR",
              amountSubtotal: Math.round(selectedPlan.price * 100), // paise
              taxAmount: Math.round(igst * 100),                    // paise
              discountAmount: 0,
              amountTotal: Math.round(total * 100),                 // paise
              billingName: name,
              billingPhone: phone,
              billingCountry: country,
              billingCity: city,
            };
  
            await Axios.post("/subscriptions/confirm", payload);
            setMethod("upi")
            setName("")
            setCity("")
            setCountry("")
            setPhone("")
            
          } catch (e) {
            console.error(e);
            alert("Payment failed.");
            showSubscriptionModal(false)
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setLoading(false);
        alert("Payment failed. Please try again.");
      });
      rzp.open();
      
    } catch (error) {
      console.log(error);
      
    }finally {
      setLoading(false)
    }
  };

  const pay = () => {
    if (!canPay) return;
    setLoading(true);
    openRazorpay(total);
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
              <Input
                label="Phone"
                placeholder="+91 0000 000 000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
              />
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

          {/* Payment method */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">Payment Method</h3>
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
                UPI / QR
              </button>
            </div>
          </section>
        </div>

        {/* RIGHT: summary card */}
        <aside className="lg:sticky lg:top-6">
          <div className="rounded-3xl border-[1.5px] border-gray-100 bg-[#fafafa]">
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
                    <span className="font-semibold text-gray-900">₹{selectedPlan.price}</span>
                    <span className="text-gray-500">/mo</span>
                  </div>
                </div>
                <button onClick={onBack} className="text-sm cursor-pointer font-semibold text-gray-700 underline underline-offset-2">
                  Change
                </button>
              </div>
            </div>

            <div className="space-y-4 p-5 px-7">
              <Row left={<span>Plan ({selectedPlan.title})</span>} right={<span>₹{selectedPlan.price}</span>} />
              <Row left={<span>IGST (18%)</span>} right={<span>₹{igst}</span>} />
              <hr className="my-2 border-gray-200" />
              <Row left={<span className="font-semibold">Total</span>} right={<span className="font-semibold">₹{total}</span>} />

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
  type = "text",
}: {
  label: string;
  placeholder?: string;
  LeftIcon?: React.ComponentType<any>;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
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
          className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40 ${LeftIcon ? "pl-9" : ""
            }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
        />
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">{children}</div>;
}

function Row({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between text-sm text-gray-700">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
