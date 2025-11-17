import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header';
import { 
  Book, 
  ChevronDown, 
  Mail, 
  MessageCircle, 
  Phone, 
  Search, 
  Users, 
  Video, 
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Footer from '../components/Footer';

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const heroRef = useRef(null);
  const quickLinksRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const elements = [heroRef.current, quickLinksRef.current, faqRef.current, contactRef.current];
    elements.forEach(el => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
      available: "24/7",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-500/10"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@eventbuddy.com",
      action: "Send Email",
      available: "24-48hr response",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
    }
  ];

  const quickLinks = [
    {
      icon: Book,
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Vendor Management",
      description: "How to work with vendors effectively",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Billing & Payments",
      description: "Understanding costs and payments",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Header />

      <main className="pt-20">
        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="py-20 relative overflow-hidden bg-gradient-to-br from-purple-100 via-purple-300 to-purple-100">          
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center py-2 px-6 rounded-full border bg-white/10 backdrop-blur-md text-sm font-semibold border-black/20 mb-8 transition-all duration-500 hover:bg-white/20 hover:scale-105">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              We're here to help
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-black via-purple-800 to-black bg-clip-text text-transparent animate-fade-in-up">
              How can we help you?
            </h1>
            
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed opacity-90 mb-12 animate-fade-in-up animation-delay-300">
              Find answers, get support, and learn how to make the most of EventBuddy
            </p>

            <div className="max-w-lg mx-auto relative animate-fade-in-up animation-delay-500">
              <div className={`relative transition-all duration-500 ${isSearchFocused ? 'scale-105' : ''}`}>
                <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <input 
                  placeholder="Search for help..." 
                  className="px-12 py-4 border-0 w-full rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 shadow-2xl text-lg font-medium transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Enhanced Quick Links */}
              <section ref={quickLinksRef}>
                <h2 className="text-3xl md:text-4xl font-black mb-10 bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Popular Topics
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {quickLinks.map((link, index) => (
                    <div 
                      key={index}
                      className="group relative rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className='relative z-10 flex flex-col space-y-4 p-8'>
                        <div className={`inline-flex items-center justify-center h-14 w-14 bg-gradient-to-br ${link.color} rounded-2xl mb-4 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg`}>
                          <link.icon className="h-6 w-6 text-white" />
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                            {link.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {link.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center text-sm font-semibold text-gray-500 group-hover:text-gray-700 transition-colors duration-300 mt-2">
                          Learn more
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Enhanced FAQ Section */}
              <section ref={faqRef}>
                <h2 className="text-3xl md:text-4xl font-black mb-10 bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className={`group rounded-2xl border-2 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${
                        openIndex === index 
                          ? 'border-purple-300 bg-gradient-to-r from-purple-50/50 to-blue-50/50' 
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                    >
                      <button 
                        onClick={() => toggleAccordion(index)} 
                        className="w-full flex justify-between items-center p-8 font-bold text-lg text-gray-800 hover:text-gray-900 text-left cursor-pointer transition-all duration-300 group-hover:bg-white/50"
                      >
                        <span className="pr-8">{faq.question}</span>
                        <ChevronDown 
                          className={`h-5 w-5 text-purple-500 transition-all duration-500 flex-shrink-0 ${
                            openIndex === index ? "rotate-180 scale-110" : "group-hover:scale-110"
                          }`} 
                        />
                      </button>
                      
                      <div 
                        className={`transition-all duration-500 overflow-hidden ${
                          openIndex === index 
                            ? 'max-h-96 opacity-100' 
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-8 pb-8">
                          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"></div>
                          <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-8">
              {/* Enhanced Contact Support */}
              <div ref={contactRef} className="rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                <div className="relative p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                  <h3 className="text-2xl font-black mb-2">Need More Help?</h3>
                  <p className="text-gray-300 text-sm">
                    Our support team is here to assist you
                  </p>
                  <div className="absolute top-4 right-4">
                    <MessageCircle className="h-8 w-8 text-purple-300 opacity-50" />
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {contactMethods.map((method, index) => (
                    <div 
                      key={index} 
                      className={`group p-6 rounded-xl border-2 border-gray-100 hover:border-transparent transition-all duration-500 hover:scale-105 hover:shadow-lg ${method.bgColor} relative overflow-hidden`}
                    >
                      <div className="relative z-10">
                        <div className="flex items-start space-x-4">
                          <div className={`inline-flex items-center justify-center h-12 w-12 bg-gradient-to-br ${method.color} rounded-xl shadow-lg transition-transform duration-500 group-hover:rotate-12`}>
                            <method.icon className="h-5 w-5 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-1">
                              {method.title}
                            </h4>
                            <p className="text-gray-600 text-sm font-medium mb-2">
                              {method.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200 shadow-sm">
                                <Clock className="h-3 w-3 mr-1" />
                                {method.available}
                              </div>
                              
                              <button className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-300 h-10 px-4 rounded-xl bg-gradient-to-br ${method.color} text-white hover:shadow-lg hover:scale-105 active:scale-95 shadow-md`}>
                                {method.action}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Status Card */}
              <div className="rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                <div className="relative p-8 bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                  <h3 className="text-2xl font-black mb-2">System Status</h3>
                  <p className="text-green-100 text-sm">
                    Real-time service monitoring
                  </p>
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-8 w-8 text-white opacity-50" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                    <div className="flex items-center justify-center h-8 w-8 bg-green-500 rounded-full shadow-lg">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-sm">All Systems Operational</div>
                      <div className="text-green-600 text-xs font-medium">Last updated just now</div>
                    </div>
                  </div>
                  
                  <button className="group w-full mt-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 p-2 rounded-lg hover:bg-gray-50">
                    View detailed status page
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Help