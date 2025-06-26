"use client";

import { Service } from '../../models/service';
import { ArrowRight } from 'lucide-react';

type ServiceCardProps = {
  service: Service;
};


export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div
      className={`group transition-all duration-300 p-0 w-100 text-center flex flex-col items-center
      bg-[#1A1A1A] shadow-lg shadow-black/20
      hover:bg-yellow-500 hover:text-black hover:shadow-xl`}
    >
      <div className="text-5xl mb-8 mt-8">{service.icon}</div>
      <h2 className="text-2xl font-bold mb-0">{service.name}</h2>
      <hr className="w-40 group-hover:bg-gray-800 h-1 bg-yellow-500 border-0 rounded my-4" />
      <button
        className={`mt-4 mb-8 font-semibold rounded-md px-4 py-2 cursor-pointer
        bg-yellow-500 text-black
        group-hover:bg-black group-hover:text-yellow-500
        hover:scale-105 transition-all`}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
