// src/components/Footer.tsx
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* Top grid */}
        <div className="flex justify-between">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to='/' className="text-2xl font-bold">FUMA</Link>
            <h4 className="text-xl font-semibold text-gray-400">
              Dotdazzle product
            </h4>
            <p className="mt-2 text-slate-500">
              Made with <span className="text-gray-400">❤️</span> in India.
            </p>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-slate-700 font-semibold">Company</h5>
            <ul className="mt-3 space-y-3">
              <li><Link to='/about' className="text-slate-700 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">About</Link></li>
              <li><Link to='/pricing' className="text-slate-700 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">Pricing</Link></li>
              <li><a href="mailto:support@dotdazzle.in"  className="text-slate-700 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">Contact Us</a></li>
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
            <Link to="/privacy-policy" className="text-slate-800 underline underline-offset-4 decoration-slate-300 hover:text-slate-900">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
