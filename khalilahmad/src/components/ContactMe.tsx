"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralContactForm from "@/components/ContactComponents/GeneralContactForm";
import RequestQuoteForm from "@/components/ContactComponents/RequestQuoteForm";
import ContactCard from "./ContactComponents/ContactCard";

export default function ContactMe() {
  return (
    <section id="contact" className="w-full bg-black">
      <div className="text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16">
            <span className="text-white">Contact </span>
            <span className="text-amber-400">Me</span>
          </h1>

          {/* Contact Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* LEFT: Contact Card */}
            <div className="w-full lg:w-1/2 xl:w-2/5">
              <ContactCard />
            </div>

            {/* RIGHT: Contact Form Tabs */}
            <div className="w-full lg:w-1/2 xl:w-3/5">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-800">
                <Tabs defaultValue="general" className="w-full">
                  
                  <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 bg-gray-800/50 p-1 rounded-lg">
                    <TabsTrigger 
                      className="cursor-pointer data-[state=active]:bg-amber-400 data-[state=active]:text-black text-sm sm:text-base py-2 sm:py-3 transition-all duration-300" 
                      value="general"
                    >
                      General Contact
                    </TabsTrigger>
                    <TabsTrigger 
                      className="cursor-pointer data-[state=active]:bg-amber-400 data-[state=active]:text-black text-sm sm:text-base py-2 sm:py-3 transition-all duration-300" 
                      value="quote"
                    >
                      Request Quote
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-2">
                        Get in Touch
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base mb-4">
                        Have a question or want to work together? I&apos;d love to hear from you.
                      </p>
                      <GeneralContactForm />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="quote" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-2">
                        Project Quote
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base mb-4">
                        Tell me about your project and I&apos;ll provide you with a detailed quote.
                      </p>
                      <RequestQuoteForm />
                    </div>
                  </TabsContent>
                  
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
