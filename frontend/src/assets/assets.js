import { Award, Brain, Calendar, Camera, Car, CreditCard, Heart, MapIcon, MessageCircle, Music, Palette, Search, Shield, Star, Target, Users, Utensils } from 'lucide-react'


export const mockNotifications = [
  {
    id: '1',
    type: 'booking_confirmation',
    message: 'Your booking with Golden Gate Catering has been confirmed',
    read_status: false,
    created_at: new Date().toISOString(),
    user_id: 'user1'
  },
  {
    id: '2',
    type: 'payment_reminder',
    message: 'Payment due for your photography service in 3 days',
    read_status: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    user_id: 'user1'
  },
  {
    id: '3',
    type: 'event_reminder',
    message: 'Your wedding is coming up in 2 weeks!',
    read_status: true,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    user_id: 'user1'
  }
];


export const features = [
  {
    icon: Brain,
    title: "AI-Powered Planning",
    description: "Smart checklists, timeline suggestions, and budget optimization powered by artificial intelligence.",
    color: "text-purple-600 bg-purple-100",
    badge: "Smart"
  },
  {
    icon: Search,
    title: "Vendor Marketplace",
    description: "Discover and book trusted vendors with filters for location, budget, and ratings.",
    color: "text-blue-600 bg-blue-100",
    badge: "Verified"
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Real-time availability tracking and automated booking coordination.",
    color: "text-green-600 bg-green-100",
    badge: "Real-time"
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Integrated payment gateways with PCI-compliant processing and fraud protection.",
    color: "text-orange-600 bg-orange-100",
    badge: "Secure"
  },
  {
    icon: Users,
    title: "Guest Management",
    description: "Effortless RSVP tracking, digital invitations, and guest preference management.",
    color: "text-pink-600 bg-pink-100",
    badge: "Complete"
  },
  {
    icon: MessageCircle,
    title: "Instant Communication",
    description: "One-click messaging, calling, and emailing with vendors directly from the platform.",
    color: "text-indigo-600 bg-indigo-100",
    badge: "Direct"
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description: "Transparent feedback system to help you choose the best vendors for your event.",
    color: "text-yellow-600 bg-yellow-100",
    badge: "Trusted"
  },
  {
    icon: Shield,
    title: "Vendor Dashboard",
    description: "Comprehensive tools for vendors to manage leads, bookings, and performance analytics.",
    color: "text-red-600 bg-red-100",
    badge: "Pro"
  }
];


// export const vendors = [
//   {
//     id: 1,
//     name: "Elegant Events Photography",
//     category: "Photography",
//     rating: 4.9,
//     reviews: 127,
//     location: "New York, NY",
//     price: "$1,200-$3,500",
//     image: "/placeholder.svg",
//     icon: Camera,
//     available: true,
//     verified: true,
//     specialties: ["Wedding", "Corporate", "Portrait"]
//   },
//   {
//     id: 2,
//     name: "Gourmet Catering Co.",
//     category: "Catering",
//     rating: 4.8,
//     reviews: 89,
//     location: "Los Angeles, CA",
//     price: "$35-$85/person",
//     image: "/placeholder.svg",
//     icon: Utensils,
//     available: true,
//     verified: true,
//     specialties: ["Fine Dining", "BBQ", "Vegan"]
//   },
//   {
//     id: 3,
//     name: "Harmony Music Events",
//     category: "Entertainment",
//     rating: 5.0,
//     reviews: 64,
//     location: "Chicago, IL",
//     price: "$800-$2,200",
//     image: "/placeholder.svg",
//     icon: Music,
//     available: false,
//     verified: true,
//     specialties: ["Live Band", "DJ", "Classical"]
//   },
//   {
//     id: 4,
//     name: "Creative Decor Studio",
//     category: "Decoration",
//     rating: 4.7,
//     reviews: 156,
//     location: "Miami, FL",
//     price: "$500-$1,800",
//     image: "/placeholder.svg",
//     icon: Palette,
//     available: true,
//     verified: true,
//     specialties: ["Floral", "Lighting", "Themes"]
//   }
// ];


// about 


export const stats = [
  { number: "10K+", label: "Events Planned", icon: Target },
  { number: "500+", label: "Trusted Vendors", icon: Users },
  { number: "4.9/5", label: "Customer Rating", icon: Award },
  { number: "50+", label: "Cities Served", icon: Heart }
];


export const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former event planner with 15+ years experience in luxury weddings and corporate events."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Tech veteran who believes AI can revolutionize how we plan and execute memorable events."
  },
  {
    name: "Emily Davis",
    role: "Head of Vendor Relations",
    bio: "Builds relationships with vendors worldwide to ensure quality and reliability."
  },
  {
    name: "David Wilson",
    role: "VP of Product",
    bio: "Designs user experiences that make event planning intuitive and delightful."
  }
];


export const values = [
  {
    title: "Reliability",
    description: "We connect you only with verified, trusted vendors who deliver exceptional service."
  },
  {
    title: "Innovation",
    description: "Our AI-powered platform continuously evolves to make event planning smarter and easier."
  },
  {
    title: "Community",
    description: "We foster a supportive ecosystem where planners and vendors grow together."
  },
  {
    title: "Excellence",
    description: "Every event matters. We're committed to helping you create unforgettable experiences."
  }
];


// vendors 
export const categoryIcons = {
  photography: Camera,
  catering: Utensils,
  entertainment: Music,
  decoration: Palette,
  venue: MapIcon,
  transportation: Car,
};


export const vendors = [
  {
    id: "1",
    business_name: "Elegant Events Decor",
    category: "decoration",
    description:
      "Providing premium wedding and event decoration services with custom themes and designs.",
    location: "Colombo",
    price_range_min: 50000,
    price_range_max: 150000,
    rating: 4.7,
    total_reviews: 120,
    image: "/placeholder.svg",
    portfolio_images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    verified: true,
    available: true,
    contact_email: "contact@elegantevents.com",
    contact_phone: "+94711234567",
    services: ["Wedding Decor", "Corporate Events", "Birthday Parties", "Birthday Parties", "Event Parties"],
    user_id: "U001"
  },
  {
    id: "2",
    business_name: "Sweet Delights Catering",
    category: "catering",
    description:
      "Catering service specializing in traditional Sri Lankan and international cuisine.",
    location: "Kandy",
    price_range_min: 20000,
    price_range_max: 100000,
    rating: 4.5,
    total_reviews: 85,
    image: "/placeholder.svg",
    portfolio_images: ["/placeholder.svg"],
    verified: true,
    available: false,
    contact_email: "info@sweetdelights.lk",
    contact_phone: "+94776543210",
    services: ["Buffet", "Live Stations", "Desserts"],
    user_id: "U001"
  },
  {
    id: "3",
    business_name: "DJ Pulse Entertainment",
    category: "entertainment",
    description:
      "Professional DJ and sound system services for weddings, parties, and corporate events.",
    location: "Galle",
    price_range_min: 15000,
    price_range_max: 75000,
    rating: 4.8,
    total_reviews: 200,
    image: "/placeholder.svg",
    portfolio_images: ["/placeholder.svg"],
    verified: false,
    available: true,
    contact_email: "bookings@djpulse.com",
    contact_phone: "+94778889999",
    services: ["DJ", "Lighting", "Sound System"],
  },
  {
    id: "4",
    business_name: "Elegant Events Photography",
    category: "photography",
    description:
      "Capturing weddings, corporate events, and portraits with premium photography packages.",
    location: "New York, NY",
    price_range_min: 1200,
    price_range_max: 3500,
    rating: 4.9,
    total_reviews: 127,
    image: "/placeholder.svg",
    portfolio_images: ["/placeholder.svg"],
    verified: true,
    available: true,
    contact_email: "info@elegantphotos.com",
    contact_phone: "+12125551234",
    services: ["Wedding", "Corporate", "Portrait"],
    user_id: "U001"
  },
];


// booking list component
export const booking = [
  {
    id: "B001",
    booking_date: "2025-10-15",
    total_amount: 75000,
    status: "Confirmed",
    service_description: "Full wedding decoration package with custom floral theme",
    notes: "Client requested pastel color theme",
    created_at: "2025-09-25T10:30:00Z",
    vendor: {
      id: "1",
      business_name: "Elegant Events Decor",
      category: "decoration",
      location: "Colombo",
      contact_email: "contact@elegantevents.com",
      contact_phone: "+94711234567",
    }
  },
  {
    id: "B002",
    booking_date: "2025-11-05",
    total_amount: 45000,
    status: "Pending",
    service_description: "Buffet catering for 150 guests with dessert table",
    notes: "Need vegetarian options included",
    created_at: "2025-09-26T14:15:00Z",
    vendor: {
      id: "2",
      business_name: "Sweet Delights Catering",
      category: "catering",
      location: "Kandy",
      contact_email: "info@sweetdelights.lk",
      contact_phone: "+94776543210",
    }
  },
  {
    id: "B003",
    booking_date: "2025-12-01",
    total_amount: 30000,
    status: "Cancelled",
    service_description: "DJ with lighting and sound system for birthday party",
    notes: "Cancelled due to rescheduling of event",
    created_at: "2025-09-27T09:45:00Z",
    vendor: {
      id: "3",
      business_name: "DJ Pulse Entertainment",
      category: "entertainment",
      location: "Galle",
      contact_email: "bookings@djpulse.com",
      contact_phone: "+94778889999",
    }
  }
];

// event form component
export const users = [
  {
    id: "U001",
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone: "+94771234567",
    is_vendor: true
  },
  {
    id: "U002",
    full_name: "Sophia Silva",
    email: "sophia.silva@example.com",
    phone: "+94776543210",
    is_vendor: true
  },
  {
    id: "U003",
    full_name: "Michael Perera",
    email: "michael.perera@example.com",
    phone: "+94778889999",
    is_vendor: false
  }
];

export const eventsData = [
  {
    id: "E001",
    title: "John & Sarah's Wedding",
    description: "A grand wedding ceremony with 300 guests at a luxury hotel ballroom.",
    event_type: "Wedding",
    location: "Colombo, Sri Lanka",
    event_date: "2025-11-15T18:00:00Z",
    guest_count: 300,
    budget: 1500000,
    status: "confirmed",
    created_at: "2025-09-20T09:30:00Z",
    updated_at: "2025-09-25T12:00:00Z",
    user_id: "U001"
  },
  {
    id: "E002",
    title: "Tech Innovators Conference 2025",
    description: "Annual conference for startups and entrepreneurs with keynote speakers and workshops.",
    event_type: "Conference",
    location: "Kandy, Sri Lanka",
    event_date: "2025-12-05T09:00:00Z",
    guest_count: 500,
    budget: 2000000,
    status: "planning",
    created_at: "2025-09-22T11:15:00Z",
    updated_at: "2025-09-24T15:45:00Z",
    user_id: "U002"
  },
  {
    id: "E003",
    title: "Emma's 10th Birthday Party",
    description: "A fun-filled birthday party with games, cake, and decorations for kids.",
    event_type: "Birthday Party",
    location: "Galle, Sri Lanka",
    event_date: "2025-10-10T15:30:00Z",
    guest_count: 40,
    budget: 80000,
    status: "draft",
    created_at: "2025-09-23T08:20:00Z",
    updated_at: "2025-09-26T10:10:00Z",
    user_id: "U003"
  }
];

  
export const guestsData = [
  {
    id: "G001",
    name: "Alice Fernando",
    email: "alice.fernando@example.com",
    phone: "+94771234567",
    rsvp_status: "confirmed",
    plus_one: true,
    dietary_restrictions: "Vegetarian",
    event_id: "E001" // John & Sarah's Wedding
  },
  {
    id: "G002",
    name: "David Perera",
    email: "david.perera@example.com",
    phone: "+94776543210",
    rsvp_status: "pending",
    plus_one: false,
    dietary_restrictions: "None",
    event_id: "E002" // Tech Innovators Conference
  },
  {
    id: "G003",
    name: "Emma Silva",
    email: "emma.silva@example.com",
    phone: "+94778889999",
    rsvp_status: "declined",
    plus_one: false,
    dietary_restrictions: "Gluten-free",
    event_id: "E003" // Emma's Birthday Party
  }
];


export const reviewsData = [
  {
    id: "R001",
    rating: 5,
    comment: "Fantastic service! The vendor was very professional and punctual.",
    created_at: "2025-09-20T10:30:00Z",
    user_id: "U001", // John Doe
    profiles: {
      full_name: "John Doe",
      avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
  {
    id: "R002",
    rating: 4,
    comment: "Good experience overall, but there's room for improvement.",
    created_at: "2025-09-21T14:45:00Z",
    user_id: "U002", // Sophia Silva
    profiles: {
      full_name: "Sophia Silva",
      avatar_url: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  },
  {
    id: "R003",
    rating: 3,
    comment: "Average service, expected a bit more for the price.",
    created_at: "2025-09-22T09:15:00Z",
    user_id: "U003", // Michael Perera
    profiles: {
      full_name: "Michael Perera",
      avatar_url: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  },
  {
    id: "R004",
    rating: 5,
    comment: "Absolutely amazing! Highly recommended.",
    created_at: "2025-09-23T18:20:00Z",
    user_id: "U001", // John Doe again
    profiles: {
      full_name: "John Doe",
      avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
  {
    id: "R005",
    rating: 2,
    comment: "Not satisfied. The vendor was late and unprepared.",
    created_at: "2025-09-24T20:10:00Z",
    user_id: "U002", // Sophia Silva again
    profiles: {
      full_name: "Sophia Silva",
      avatar_url: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  },
];


export const upcomingEventsData = [
  {
    id: 1,
    name: "Sarah & John's Wedding",
    date: "June 15, 2024",
    venue: "Grand Hotel Ballroom",
    guests: 150,
    budget: 25000,
    spent: 18500,
    progress: 74,
    status: "On Track"
  },
  {
    id: 2,
    name: "Corporate Annual Gala",
    date: "July 22, 2024",
    venue: "Convention Center",
    guests: 300,
    budget: 45000,
    spent: 12000,
    progress: 27,
    status: "Planning"
  }
];

export const recentActivitiesData = [
  {
    type: "booking",
    title: "Photographer booked",
    vendor: "Elegant Events Photography",
    time: "2 hours ago"
  },
  {
    type: "payment",
    title: "Payment processed",
    amount: "$1,200",
    time: "4 hours ago"
  },
  {
    type: "guest",
    title: "15 new RSVPs received",
    event: "Sarah & John's Wedding",
    time: "6 hours ago"
  },
  {
    type: "reminder",
    title: "Venue final walkthrough",
    date: "Tomorrow at 2:00 PM",
    time: "1 day ago"
  }
];

export const aiSuggestionsData = [
  {
    title: "Book Catering Soon",
    description: "Based on your guest count, book catering 6 weeks before the event.",
    priority: "high"
  },
  {
    title: "Send Save the Dates",
    description: "Send save the dates 3 months before your wedding for better attendance.",
    priority: "medium"
  },
  {
    title: "Backup Vendor Options",
    description: "Consider backup vendors for your top 3 services.",
    priority: "low"
  }
];





