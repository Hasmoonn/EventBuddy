import React from 'react'
import Hero from '../components/Hero'
import Header from '../components/Header'
import Features from '../components/Features'
import VendorShowcase from '../components/VendorShowcase'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <div className='min-h-screen'>
      <Header />

      <main>
        <Hero />
        <Features />
        <VendorShowcase />
      </main>

      <Footer />
    </div>
  )
}

export default Index