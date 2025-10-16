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


        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed">
                To democratize exceptional event planning by connecting people with trusted vendors
                and providing AI-powered tools that turn stress into success. Every celebration
                deserves to be perfect, regardless of budget or experience.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-[rgba(var(--muted),0.6)]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-[rgb(var(--muted-foreground))]  max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {
                values.map((value, index) => (
                  <div key={index} className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm text-center h-full">
                    <div className='flex flex-col space-y-1.5 p-6'>
                      <div className="font-semibold leading-none tracking-tight text-lg">
                        {value.title}
                      </div>
                    </div>
                    <div className='p-6 pt-0'>
                      <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">
                        {value.description}
                      </p>
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