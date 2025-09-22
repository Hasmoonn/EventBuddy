import { Brain, Calendar, Camera, CreditCard, MessageCircle, Music, Palette, Search, Shield, Star, Users, Utensils } from 'lucide-react'


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


export const vendors = [
  {
    id: 1,
    name: "Elegant Events Photography",
    category: "Photography",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    price: "$1,200-$3,500",
    image: "/placeholder.svg",
    icon: Camera,
    available: true,
    verified: true,
    specialties: ["Wedding", "Corporate", "Portrait"]
  },
  {
    id: 2,
    name: "Gourmet Catering Co.",
    category: "Catering",
    rating: 4.8,
    reviews: 89,
    location: "Los Angeles, CA",
    price: "$35-$85/person",
    image: "/placeholder.svg",
    icon: Utensils,
    available: true,
    verified: true,
    specialties: ["Fine Dining", "BBQ", "Vegan"]
  },
  {
    id: 3,
    name: "Harmony Music Events",
    category: "Entertainment",
    rating: 5.0,
    reviews: 64,
    location: "Chicago, IL",
    price: "$800-$2,200",
    image: "/placeholder.svg",
    icon: Music,
    available: false,
    verified: true,
    specialties: ["Live Band", "DJ", "Classical"]
  },
  {
    id: 4,
    name: "Creative Decor Studio",
    category: "Decoration",
    rating: 4.7,
    reviews: 156,
    location: "Miami, FL",
    price: "$500-$1,800",
    image: "/placeholder.svg",
    icon: Palette,
    available: true,
    verified: true,
    specialties: ["Floral", "Lighting", "Themes"]
  }
];