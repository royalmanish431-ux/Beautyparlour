export interface Service {
  id: string;
  name: string;
  category: 'hair' | 'bridal' | 'skin' | 'nails' | 'lashes' | 'spa';
  categoryLabel: string;
  duration: string;
  price: number;
  originalPrice?: number;
  description: string;
  includes: string[];
  popular?: boolean;
  image?: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  specialty: string;
  avatar: string;
  bio: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'hair' | 'bridal' | 'skin' | 'nails';
  categoryLabel: string;
  image: string;
  stylistName: string;
  serviceId: string;
  serviceName: string;
  description: string;
  technique: string;
  clientFeedback?: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorCity: string;
  rating: number;
  date: string;
  serviceTitle: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  avatarBg: string;
}

export interface Booking {
  id: string;
  serviceIds: string[];
  serviceNames: string[];
  totalPrice: number;
  stylistId: string;
  stylistName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  specialOccasion?: boolean;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
}
