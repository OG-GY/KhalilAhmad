"use client";

import { Service } from '../../models/service';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group transition-all duration-300 p-6 sm:p-8 text-center flex flex-col items-center bg-[#1A1A1A] shadow-lg shadow-black/20 hover:bg-amber-400 hover:text-black hover:shadow-xl rounded-lg border border-gray-800 hover:border-amber-400 min-h-[300px] justify-between">
      
      {/* Icon */}
      <div className="text-4xl sm:text-5xl mb-6 text-amber-400 group-hover:text-black transition-colors duration-300">
        {service.icon}
      </div>
      
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight">
        {service.name}
      </h2>
      
      {/* Divider */}
      <hr className="w-20 sm:w-32 group-hover:bg-black h-0.5 bg-amber-400 border-0 rounded mb-4" />
      
      {/* Description */}
      <p className="text-sm sm:text-base text-gray-300 group-hover:text-gray-800 mb-6 leading-relaxed flex-grow">
        {service.description}
      </p>
      
      {/* CTA Button */}
      <Link 
        href={`/services/${service.slug}`}
        className="font-semibold rounded-lg px-4 py-2 cursor-pointer bg-amber-400 text-black group-hover:bg-black group-hover:text-amber-400 hover:scale-105 transition-all flex items-center gap-2"
      >
        Learn More
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
