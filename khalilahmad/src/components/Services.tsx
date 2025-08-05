"use client";

import ServiceCard from './ServicesComponents/servicecard';
import { services } from '../data/services';


export default function Services() {
  return (
    <section id="services" className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16">
          <span className="text-white">What </span>
          <span className="text-amber-400">Services </span>
          <span className="text-white">I offer</span>
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}