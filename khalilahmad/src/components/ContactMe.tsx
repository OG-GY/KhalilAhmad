"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralContactForm from "@/components/ContactComponents/GeneralContactForm";
import RequestQuoteForm from "@/components/ContactComponents/RequestQuoteForm";

export default function ContactMe() {
  return (
    <section className="bg-black text-white py-16 h-[100vh] flex items-center flex-col">
      <h1 className="text-center text-4xl font-bold mb-12">
        <span className="text-white">Contact </span>
        <span className="text-yellow-500">Me </span>
      </h1>
      <Tabs
        defaultValue="account"
        className="w-[80%] mx-auto flex flex-col items-center"
      >
        <TabsList className="flex items-center justify-center">
          <TabsTrigger value="account">General Contact</TabsTrigger>
          <TabsTrigger value="password">Request Quote</TabsTrigger>
        </TabsList>
        <div className="w-full flex">
          <TabsContent value="account" className="mt-4">
            <GeneralContactForm />
          </TabsContent>
          <TabsContent value="password">
            <RequestQuoteForm />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
