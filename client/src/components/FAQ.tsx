// src/components/FaqSection.tsx
import React, { useId, useState } from "react";

type FaqItem = { question: string; answer: string };

const faqs: FaqItem[] = [
  {
    question: "Is FUMA Meta Verified?",
    answer:
      "Yes, FUMA is Meta Verified. This means our brand has been authenticated by Meta and meets their standards for trust, transparency, and authenticity on platforms like Instagram.",
  },
  { question: "Is FUMA free?", answer: "We offer both free and paid plans tailored to your needs." },
  { question: "Can I get a GST invoice?", answer: "Yes, GST-compliant invoices are available on paid plans." },
  { question: "Is FUMA cheaper than Manychat?", answer: "Our pricing is designed to be competitive for Indian businesses." },
  { question: "Is FUMA an Indian company?", answer: "Yes, we are incorporated and operate in India." },
  { question: "What is the FUMA Partner Program?", answer: "A revenue-sharing program for agencies and affiliates." },
  { question: "Do I get referral income on renewals as well?", answer: "Yes, referral earnings apply to eligible renewals." },
  { question: "Is FUMA an AI company?", answer: "We use AI to enhance automation, insights, and messaging workflows." },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 flex-none transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FaqCard({
  item,
  index,
  openIndex,
  setOpenIndex,
}: {
  item: FaqItem;
  index: number;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  const isOpen = openIndex === index;
  const baseId = useId();
  const btnId = `${baseId}-btn`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="rounded-2xl  border border-transparent bg-[#f4f2ff] shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <button
        id={btnId}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full cursor-pointer text-left px-3 py-3 flex items-center gap-4"
      >
        <span className="text-lg font-medium text-[#0e1a2b] flex-1">
          {item.question}
        </span>
        <div className="text-[#0e1a2b]/70">
          <Chevron open={isOpen} />
        </div>
      </button>

      {/* Animated content: grid rows trick for auto-height */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-5 text-[15px] leading-6 text-[#233247]/80">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(); // open first by default

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-16">
      {/* Top left badge + heading */}
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="order-2 md:order-1">
          <span className="inline-flex select-none items-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#0e1a2b]">
            FAQ
          </span>
          <h2 className="mt-6 text-5xl leading-[1.05] font-bold tracking-tight text-[#0e1a2b]">
            Common questions
            <br />
            about FUMA
          </h2>
        </div>

        {/* Accordion list */}
        <div className="order-1 md:order-2 flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FaqCard key={i} item={item} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
