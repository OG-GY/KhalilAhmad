'use client';

import { useParams } from 'next/navigation';
import { getServiceBySlug } from '../../../data/services';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Star, Quote, ArrowRight, Users, Clock, Award } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = getServiceBySlug(slug);
  const [activeTab, setActiveTab] = useState('overview');

  if (!service) {
    notFound();
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/#services" 
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-amber-400 bg-amber-400/10 p-4 rounded-lg">
                  {service.icon}
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                    {service.name}
                  </h1>
                  <p className="text-xl text-amber-400 font-medium">
                    {service.tagline}
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {service.detailedDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#packages" 
                  className="bg-amber-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-300 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Get Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  href="#process" 
                  className="border border-amber-400 text-amber-400 px-8 py-4 rounded-lg font-semibold hover:bg-amber-400 hover:text-black transition-colors inline-flex items-center justify-center gap-2"
                >
                  Learn Process
                </Link>
              </div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-center">Quick Stats</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-amber-400" />
                  <div>
                    <p className="font-semibold">50+ Projects Completed</p>
                    <p className="text-gray-400 text-sm">Satisfied clients worldwide</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-8 w-8 text-amber-400" />
                  <div>
                    <p className="font-semibold">Fast Delivery</p>
                    <p className="text-gray-400 text-sm">On-time project completion</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="h-8 w-8 text-amber-400" />
                  <div>
                    <p className="font-semibold">Premium Quality</p>
                    <p className="text-gray-400 text-sm">Industry best practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-gray-900/30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'process', label: 'Process' },
              { id: 'packages', label: 'Packages' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'faq', label: 'FAQ' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 whitespace-nowrap font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Technologies I Use</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {service.technologies.map((tech, index) => (
                  <div 
                    key={index}
                    className="bg-gray-900/50 p-4 rounded-lg text-center border border-gray-800 hover:border-amber-400 transition-colors"
                  >
                    <span className="font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Process */}
        {activeTab === 'process' && (
          <div id="process">
            <h2 className="text-3xl font-bold mb-8">My Development Process</h2>
            <div className="space-y-8">
              {service.process.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-400 text-black rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{step.step}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packages */}
        {activeTab === 'packages' && (
          <div id="packages">
            <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Package</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {service.packages.map((pkg, index) => (
                <div 
                  key={index}
                  className={`relative bg-gray-900/50 p-8 rounded-xl border-2 ${
                    pkg.popular 
                      ? 'border-amber-400 bg-amber-400/5' 
                      : 'border-gray-800'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-amber-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-3xl font-bold text-amber-400 mb-2">{pkg.price}</p>
                    <p className="text-gray-400">{pkg.timeline}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      pkg.popular
                        ? 'bg-amber-400 text-black hover:bg-amber-300'
                        : 'border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio */}
        {activeTab === 'portfolio' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.portfolio.map((project, index) => (
                <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-amber-400 transition-colors">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-amber-400/10 text-amber-400 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {activeTab === 'testimonials' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">What Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 relative">
                  <Quote className="h-8 w-8 text-amber-400 mb-4" />
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {service.faq.map((item, index) => (
                <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-bold mb-3 text-amber-400">{item.question}</h3>
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-400 to-yellow-500 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-black/80 mb-8">
            Let&apos;s discuss your project and bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#contact" 
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors inline-flex items-center justify-center gap-2"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/#contact" 
              className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors inline-flex items-center justify-center"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
