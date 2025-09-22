import React from 'react'
import { features } from '../assets/assets.js'
import aiPlanningImage from "../assets/ai-planning.jpg";
import vendorShowcaseImage from "../assets/vendor-showcase.jpg";
import { Sparkles } from 'lucide-react';

const Features = () => {
  return (
    <section id='features' className='py-20 gradient-secondary'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <div className="inline-flex items-center py-1 px-3 rounded-lg bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))] border-[rgba(var(--primary),0.2)]">
            <Sparkles className="h-3 w-3 mr-1" />
            Platform Features
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            Everything You Need for
            <span className="text-gradient block">Perfect Events</span>
          </h2>
          
          <p className="text-sm sm:text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto">
            From AI-powered planning to secure payments, EventBuddy provides all the tools 
            you need to create memorable events effortlessly.
          </p>
        </div>

        {/* Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl font-bold text-gradient">
              Intelligent Event Planning
            </h3>
            <p className="text-lg text-[rgb(var(--muted-foreground))]">
              Our AI analyzes your preferences, budget, and timeline to create personalized 
              recommendations and automate routine planning tasks.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-[rgb(var(--primary))] rounded-full"></div>
                <span className="text-sm">Personalized vendor recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-[rgb(var(--primary))] rounded-full"></div>
                <span className="text-sm">Dynamic budget optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-[rgb(var(--primary))] rounded-full"></div>
                <span className="text-sm">Automated timeline generation</span>
              </div>
            </div>
          </div>

          <div className="relative animate-bounce-in">
            <img src={aiPlanningImage} alt="AI-powered planning interface" className="w-full h-80 object-cover rounded-2xl shadow-[var(--shadow-card)]" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="order-2 lg:order-1 relative animate-bounce-in">
            <img src={vendorShowcaseImage} alt="Vendor marketplace showcase" className="w-full h-80 object-cover rounded-2xl shadow-[var(--shadow-card)]" />
          </div>

          <div className="order-1 lg:order-2 space-y-6 animate-slide-up">
            <h3 className="text-2xl font-display font-bold text-gradient">
              Trusted Vendor Network
            </h3>
            <p className="text-lg text-[rgb(var(--muted-foreground))] ">
              Access hundreds of verified vendors across all categories. Read reviews, 
              compare prices, and book with confidence.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-[rgb(var(--primary))] rounded-full"></div>
                <span className="text-sm">500+ verified vendors</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-[rgb(var(--primary))] rounded-full"></div>
                <span className="text-sm">Real-time availability tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-[rgb(var(--primary))] rounded-full"></div>
                <span className="text-sm">Instant communication tools</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            features.map((feature, index) => (
              <div key={index} className='card-elegant animate-fade-in rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))]' style={{ animationDelay: `${index * 0.1}s` }}>
                <div className='flex flex-col space-y-1.5 p-6 pb-3'>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="text-xs rounded-full border px-2.5 py-0.5 font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]">
                      {feature.badge}
                    </div>
                  </div>

                  <div className="font-semibold leading-none tracking-tight text-lg">
                    {feature.title}
                  </div>
                </div>

                <div className='p-6 pt-0'>
                  <div className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </section>
  )
}

export default Features