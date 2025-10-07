import { Calendar, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Sparkles, Twitter } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {

  const navigate = useNavigate()

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "/#features" },
        { name: "Vendors", href: "/vendors" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Calendar", href: "/calendar" }
      ]
    },
    {
      title: "Planning Tools",
      links: [
        { name: "Create Event", href: "/create-event" },
        { name: "Analytics", href: "/analytics" },
        { name: "Messages", href: "/messages" },
        { name: "Profile", href: "/profile" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Settings", href: "/settings" },
        { name: "Help Center", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "Community", href: "/community" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/eventbuddy", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/eventbuddy", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/eventbuddy", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/eventbuddy", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-purple-50 border-t">
       {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 border-b border-[rgba(var(--border),1)]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))] border-[rgba(var(--primary),0.2)] inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all">
            <Sparkles className="h-3 w-3 mr-1" />
            Stay Updated
          </div>

          <h3 className="text-2xl md:text-3xl font-bold">
            Get the Latest Event Planning Tips
          </h3>

          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            Subscribe to our newsletter for expert advice, vendor spotlights, 
            and exclusive planning resources delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]" />
            <button className="btn-hero inline-flex items-center justify-center px-6 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[var(--shadow-glow)] hover:scale-105 active:scale-95">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-[rgb(var(--muted-foreground))]">
            No spam, unsubscribe at any time. Read our{" "}
            <Link to="/privacy" className="text-[rgb(var(--primary))] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className='w-full bg-white'>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div onClick={() => {navigate('/'); scrollTo(0,0)}} className="flex items-center gap-x-2 cursor-pointer">
                <div className="p-2 gradient-primary rounded-lg">
                  <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-md sm:text-xl font-bold text-gradient">
                    EventBuddy
                  </h3>
                  <div className="inline-flex rounded-full justify-center items-center px-2 py-0.5 text-[10px] sm:text-xs border-transparent font-semibold bg-[rgb(var(--secondary))] transition-all text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.5)]">
                    Smart Planning
                  </div>
                </div>
              </div>

              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                The smart event planning platform that connects you with trusted vendors 
                and automates your planning process with AI-powered tools.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-[rgb(var(--muted-foreground))]">
                  <Mail className="h-4 w-4 text-[rgb(var(--primary))]" />
                  <span>hello@eventbuddy.com</span>
                </div>
                <div className="flex items-center space-x-2 text-[rgb(var(--muted-foreground))]">
                  <Phone className="h-4 w-4 text-[rgb(var(--primary))]" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-[rgb(var(--muted-foreground))]">
                  <MapPin className="h-4 w-4 text-[rgb(var(--primary))]" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="flex space-x-3">
                {
                  socialLinks.map((social) => (
                    <a key={social.label} href={social.href} className='p-2 bg-[rgb(var(--muted))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] rounded-lg transition-all' aria-label={social.label}>
                      <social.icon className='h-4 w-4' />
                    </a>
                  ))
                }
              </div>
            </div>

            {/* Link Sections */}
            {
              footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="font-semibold">
                    {section.title}
                  </h4>

                  <ul className="space-y-3">
                    {
                      section.links.map((link) => (
                        <li key={link.name}>
                          <Link to={link.href} onClick={() => scrollTo(0,0)} className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-all text-sm">
                            {link.name}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 py-6 border-t border-[rgba(var(--border),1)]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-[rgb(var(--muted-foreground))]">
              <span>© 2024 EventBuddy. All rights reserved.</span>
              <div className="flex space-x-4">
                <Link to="/privacy" className="hover:text-[rgb(var(--primary))] transition-all">
                  Privacy Policy
                </Link>
                <Link to="/terms"  className="hover:text-[rgb(var(--primary))] transition-all">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="hover:text-[rgb(var(--primary))] transition-all">
                  Cookies
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-xs inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-all text-[rgb(var(--foreground))]">
                Eventbuddy ❤️
              </div>
            </div>
          </div>
        </div>
      </div>  
    </footer>
  )
}

export default Footer