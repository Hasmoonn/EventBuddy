import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ArrowRight, Sparkles, Users } from 'lucide-react'
import { stats, team, values } from '../assets/assets.js'
import { Link } from 'react-router-dom'


const About = () => {
  return (
    <div className="min-h-screen gradient-primary">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex py-0.5 px-3 rounded-full border items-center bg-white/10 text-xs font-medium text-white border-white/20 mb-6">
              <Sparkles className="h-3 w-3 mr-1" />
              Our Story
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Event Planning
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Born from the frustration of traditional event planning, EventBuddy combines
              human creativity with AI intelligence to make every celebration perfect.
            </p>
          </div>
        </section>


        <section className="py-16 bg-[rgb(var(--background))]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {
                stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 bg-[rgb(var(--primary),0.1)] rounded-lg mb-4">
                      <stat.icon className="h-6 w-6 text-[rgb(var(--primary))]" />
                    </div>
                    <div className="text-3xl font-bold text-[rgb(var(--foreground))] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-[rgb)var(--muted-foreground))]">
                      {stat.label}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default About