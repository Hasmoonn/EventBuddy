import React from 'react'
import { categoryIcons, vendors } from '../assets/assets.js'
import { Calendar, Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import {} from '../assets/assets.js'

const VendorShowcase = () => {

  const getIconForCategory = (category) => {
    if (!category) 
      return Star
    const catLower = category.toLowerCase()

    const key = Object.keys(categoryIcons).find((k) =>
      catLower.includes(k.toLowerCase())
    )
    
    return categoryIcons[key] || Star
  }

  return (
    <section id="vendors" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <div className="inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))] border-[rgba(var(--primary),0.2)]">
            Vendor Marketplace
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            Discover
            <span className="text-gradient"> Trusted Vendors</span>
          </h2>
          
          <p className="text-base sm:text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto">
            Browse our curated network of verified vendors. From photographers to caterers, 
            find the perfect match for your event.
          </p>
        </div>

        {/* Vendor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {
            vendors.slice(0,4).map((vendor, index) => {

              const IconComponent = getIconForCategory(vendor.category)

              return (
                <Link to={`/vendors/${vendor.id}`} key={vendor.id} className="card-vendor animate-fade-in rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className='flex flex-col space-y-1.5 p-6 pb-3'>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
                          <img src={vendor.image} className='aspect-square h-full w-full object-cover' alt={vendor.business_name} />
                          <div className='flex h-full w-full items-center justify-center rounded-full bg-[rgb(var(--muted))]'>
                            <IconComponent className="h-6 w-6 text-[rgb(var(--primary))]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent ${vendor.verified ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]' : 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'}`} >
                              {vendor.verified ? "Verified" : "New"}
                            </div>

                            <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent ${vendor.available ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]' : 'bg-[rgb(var(--destructive))] text-[rgb(var(--destructive-foreground))] hover:bg-[rgb(var(--destructive),0.8)]'}`} >
                              {vendor.available ? "Available" : "Booked"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="font-semibold tracking-tight text-lg leading-tight">
                      {vendor.business_name}
                    </div>

                    <div className="flex items-center space-x-1 text-sm text-[rgb(var(--muted-foreground))]">
                      <MapPin className="h-3 w-3" />
                      <span>{vendor.location}</span>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-4">
                  {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{vendor.rating}</span>
                        <span className="text-sm text-[rgb(var(--muted-foreground))]">
                          ({vendor.total_reviews})
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[rgb(var(--primary))]">
                        ${vendor.price_range_min} - ${vendor.price_range_max}
                      </span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1">
                      {vendor.services.slice(0, 3).map((service) => (
                        <div key={service} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all text-[rgb(var(--foreground))]">
                          {service}
                        </div>
                      ))}
                      {vendor.services.length > 3 && (
                        <div variant="outline" className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all text-[rgb(var(--foreground))]">
                          +{vendor.services.length - 3} more
                        </div>
                      )}
                    </div>


                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <button className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 text-xs border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[var(--shadow-soft)] hover:scale-105 active:scale-95 h-9 rounded-lg px-4 py-2 cursor-pointer">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </button>
                        <button className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 text-xs border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[var(--shadow-soft)] hover:scale-105 active:scale-95 h-9 rounded-lg px-4 py-2 cursor-pointer">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </button>
                        <button className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 text-xs border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[var(--shadow-soft)] hover:scale-105 active:scale-95 h-9 rounded-lg px-4 py-2 cursor-pointer">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </button>
                      </div>

                      <hr className='mb-3 border border-gray-300'/>

                      <button size="sm" className="w-full btn-hero text-xs inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-300 h-9 px-4 py-2" disabled={!vendor.available}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        {vendor.available ? "Check Availability" : "Not Available"}
                      </button>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/vendors">
            <button size="lg" className="btn-hero inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 h-12 rounded-xl px-8 py-3">
              Browse All Vendors
            </button>
          </Link>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-2">
            500+ verified vendors across all categories
          </p>
        </div>
      </div>
    </section>
  )
}

export default VendorShowcase