"use client";

import ServiceCard from './ServicesComponents/servicecard';
import {
  MonitorSmartphone,
  Layers3,
  Palette,
  DatabaseZap,
  Database
} from 'lucide-react';

const ServiceData = [
  {
    id: '1',
    name: 'Frontend Development',
    description: 'Creating responsive and interactive user interfaces using modern JavaScript frameworks like React, Vue, or Angular.',
    icon: <MonitorSmartphone size={48} />,
  },
  {
    id: '2',
    name: 'Full Stack Development',
    description: 'Developing a complete full stack scalable website with database integration and user friendly interface.',
    icon: <Layers3 size={48} />,
  },
  {
    id: '3',
    name: 'UI/UX Design',
    description: 'Designing user-friendly interfaces and experiences that enhance usability and engagement.',
    icon: <Palette size={48} />,
  },
  {
    id: '4',
    name: 'Database Development',
    description: 'Extracting useful data from websites using tools like BeautifulSoup, Puppeteer, or Selenium.',
    icon: <Database size={48} />,
  },
    {
    id: '5',
    name: 'Web Scraping',
    description: 'Extracting useful data from websites using tools like BeautifulSoup, Puppeteer, or Selenium.',
    icon: <DatabaseZap size={48} />,
  },
];


export default function Services() {
  return (
    <section className="bg-black text-white py-16 px-4">
      <h1 className="text-center text-4xl font-bold mb-12">
        <span className="text-white">What </span>
        <span className="text-yellow-500">Services </span>
        <span className="text-white">I offer </span>
      </h1>
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {ServiceData.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}