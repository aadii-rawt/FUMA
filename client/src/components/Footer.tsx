// src/components/Footer.tsx
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* Top grid */}
        <div className="flex justify-between">
          {/* Brand */}
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold">FUMA</h1>
            <h4 className="text-xl font-semibold text-gray-400">
              Dotdazzle product
            </h4>
            <p className="mt-2 text-slate-500">
              Made with <span className="text-gray-400">❤️</span> in India.
            </p>

            <div className="mt-5 flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow hover:opacity-90 transition"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow hover:opacity-90 transition"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-slate-700 font-semibold">Company</h5>
            <ul className="mt-3 space-y-3">
              <li><a href="#" className="text-slate-700 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">About</a></li>
              <li><a href="#" className="text-slate-700 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">Pricing</a></li>
              <li><a href="#" className="text-slate-700 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">Legal</a></li>
              <li><a href="#" className="text-slate-700 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-slate-200" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500">
            © {year} FUMA. All rights reserved
          </p>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <a href="#" className="text-slate-800 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-800 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">
              Terms of Service
            </a>
            <a href="#" className="text-slate-800 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">
              Cookie Statement
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
