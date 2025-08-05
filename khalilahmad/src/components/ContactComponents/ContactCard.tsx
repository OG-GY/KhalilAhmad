"use client";
import MiniSocialCard from "./MiniSocialCard";
import SocialCard from "./SocialCard";
// import { FaInfoCircle } from "react-icons/fa";

export default function ContactCard() {
  return (
    <section className=" text-white p-6 rounded-2xl shadow-lg w-full border-2 border-yellow-900/20 bg-yellow-800/10">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl cursor-none font-semibold">Contact Information</h1>
        {/* <FaInfoCircle className="text-yellow-500 text-lg" /> */}
      </div>

      <div className="flex flex-col gap-6">
        <SocialCard />
        <hr className="border-yellow-600 mt-8 mb-4" />
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Me</h3>
          <MiniSocialCard />
        </div>
      </div>
    </section>
  );
}
