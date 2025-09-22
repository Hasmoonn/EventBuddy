import React from 'react'
import { ArrowRight, Calendar, Sparkles, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-event.jpg'

const Hero = () => {
  return (
    <div className='pt-24 pb-16 gradient-hero relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-[rgba(var(--primary),0.5)] via-transparent to-[rgba(var(--primary-glow),0.1)]'></div>

      <div className='max-w-7xl mx-auto px-4 relative'>
        <div className="grid lg:grid-cols-2 gap-4 justify-center items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center py-0.5 px-3 rounded-lg bg-[rgba(var(--secondary),0.8)] text-[rgb(var(--primary))] border-[rgba(var(--primary),0.2)]">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Event Planning
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Plan Your
                <span className="text-[rgba(var(--secondary),0.6)] block">
                  Perfect Event
                </span>
                Effortlessly
              </h1>

              <p className="text-xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-lg">
                Connect with trusted vendors, automate planning tasks, and create 
                unforgettable experiences with our smart event planning platform.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-purple-700 fill-current" />
                <span className="font-semibold">4.9/5</span>
                <span className="text-[rgb(var(--muted-foreground))]">Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-[rgb(var(--primary))]" />
                <span className="font-semibold">10K+</span>
                <span className="text-[rgb(var(--muted-foreground))]">Events</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-[rgb(var(--primary))]" />
                <span className="font-semibold">500+</span>
                <span className="text-[rgb(var(--muted-foreground))]">Vendors</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <button size="lg" className="btn-hero inline-flex items-center text-sm font-medium transition-all duration-300 h-12 rounded-xl px-8 py-3">
                  Start Planning Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </Link>
              <Link to="/vendors">
                <button size="lg" variant="outline" className="btn-outline-hero inline-flex text-sm font-medium transition-all duration-300 hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[var(--shadow-soft)] px-8 cursor-pointer">
                  Explore Vendors
                </button>
              </Link>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Trusted by event planners worldwide • No credit card required
            </p>
          </div>

          {/* Hero Image */}
          <div className="hidden sm:inline-block relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-glow)]">
              <img src={heroImage}  alt="Beautiful event planning showcase"  className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-lg shadow-[var(--shadow-card)] animate-bounce-in">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Event Created</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">Wedding - June 15</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-[rgb(var(--shadow-card))] animate-bounce-in" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-[rgb(var(--primary))]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Suggestions</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">5 vendors found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero