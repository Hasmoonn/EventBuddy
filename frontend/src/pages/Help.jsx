import React, { useState } from 'react'
import Header from '../components/Header';
import { Book, ChevronDown, Mail, MessageCircle, Phone, Search, Users, Video } from 'lucide-react';
import Footer from '../components/Footer';


const Help = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create my first event?",
      answer: "Navigate to the Dashboard and click 'Create Event'. Fill in your event details including date, location, budget, and guest count. Our AI will help suggest vendors based on your preferences."
    },
    {
      question: "How do I find and book vendors?",
      answer: "Visit the Vendors page to browse by category, location, and ratings. You can filter by budget, availability, and services. Click on any vendor to view their profile and request a booking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through Stripe."
    },
    {
      question: "Can I cancel or reschedule my event?",
      answer: "Yes, you can modify your event details from the Dashboard. Cancellation policies vary by vendor, so please check individual vendor terms before booking."
    },
    {
      question: "How does the AI planning assistant work?",
      answer: "Our AI analyzes your event requirements and suggests suitable vendors, creates timelines, and provides budget recommendations based on similar successful events."
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: "24/7"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@eventbuddy.com",
      action: "Send Email",
      available: "24-48hr response"
    }
  ];
  return (
    <div className="min-h-screen bg-purple-100">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 gradient-primary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How can we help you?
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Find answers, get support, and learn how to make the most of EventBuddy
            </p>

            <div className="max-w-lg mx-auto relative">
              <Search className="hidden sm:inline-block h-5 w-5 absolute left-[10px] top-1/2 transform -translate-y-1/2 text-[rgb(var(--muted-foreground))]" />
              <input placeholder="Search for help..." className="px-4 py-2 border border-[rgb(var(--border))] w-full rounded-lg  focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] pl-10 bg-white text-[rgb(var(--foreground))]" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Quick Links */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-hover cursor-pointer">
                    <div className='flex flex-col space-y-1.5 p-6'>
                      <Book className="h-8 w-8 text-[rgb(var(--primary))] mb-2" />
                      <div className='text-2xl font-semibold leading-none tracking-tight'>Getting Started Guide</div>
                      <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                        Complete walkthrough for new users
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-hover cursor-pointer">
                    <div className='flex flex-col space-y-1.5 p-6'>
                      <Video className="h-8 w-8 text-[rgb(var(--primary))] mb-2" />
                      <div className='text-2xl font-semibold leading-none tracking-tight'>Video Tutorials</div>
                      <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                        Step-by-step video guides
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-hover cursor-pointer">
                    <div className='flex flex-col space-y-1.5 p-6'>
                      <Users className='h-8 w-8 text-[rgb(var(--primary))] mb-2' />
                      <div className='text-2xl font-semibold leading-none tracking-tight'>Vendor Management</div>
                      <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                        How to work with vendors effectively
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-hover cursor-pointer">
                    <div className='flex flex-col space-y-1.5 p-6'>
                      <MessageCircle className="h-8 w-8 text-[rgb(var(--primary))] mb-2" />
                      <div className='text-2xl font-semibold leading-none tracking-tight'>Billing & Payments</div>
                      <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                        Understanding costs and payments
                      </div>
                    </div>
                  </div>
                </div>
              </section>


              {/* FAQ Section */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-purple-300 rounded-lg px-6 shadow-sm">
                      <button onClick={() => toggleAccordion(index)} className="w-full flex justify-between items-center py-4 font-semibold text-left cursor-pointer"  >
                        {faq.question}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
                      </button>
                      {openIndex === index && (
                        <div className="pb-4 text-[rgb(var(--muted-foreground))]">{faq.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>







      <Footer />
    </div>
  )
}

export default Help