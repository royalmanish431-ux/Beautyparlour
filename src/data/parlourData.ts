import { Service, Stylist, GalleryItem, Review } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_parlour_interior_1793940413127.jpg';
export const HAIRCUT_IMAGE = '/src/assets/images/nayasha_haircut_style_1793941442939.jpg';
export const MAKEUP_IMAGE = '/src/assets/images/nayasha_party_makeup_1793941442624.jpg';
export const BRIDAL_IMAGE = '/src/assets/images/gallery_bridal_glam_1793940413164.jpg';
export const FACIAL_IMAGE = '/src/assets/images/gallery_facial_spa_1793940413787.jpg';

export interface FeaturedFacility {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  image: string;
  serviceId: string;
  description: string;
  highlights: string[];
}

export const FEATURED_FACILITIES: FeaturedFacility[] = [
  {
    id: 'fac-haircut',
    title: 'Hair Cut & Advanced Styling',
    subtitle: 'Signature Layered, Step, Feather & Curtain Bangs',
    price: '₹499 - ₹1,400',
    duration: '45 - 60 min',
    image: HAIRCUT_IMAGE,
    serviceId: 'hair-cut-style',
    description: 'Precision haircut customized to your facial features and hair density. Includes soothing scalp wash, conditioning, and bouncy blow-dry setting.',
    highlights: ['Face Contouring Haircut', 'Aromatic Scalp Wash', 'Texturizing & Layering', 'Thermal Blowout Finish']
  },
  {
    id: 'fac-makeup',
    title: 'Party & Occasion Makeup',
    subtitle: 'Flawless HD Glow, Cocktail & Festive Makeovers',
    price: '₹2,500 - ₹5,500',
    duration: '60 - 90 min',
    image: MAKEUP_IMAGE,
    serviceId: 'makeup-party-glam',
    description: 'Radiant occasion makeup featuring luminous skin prep, defined smokey or soft gold eyes, winged liner, custom lashes, and long-wear transfer-proof finish.',
    highlights: ['HD Liquid / Baked Base', 'Custom Lash Extensions', 'Sculpted Cheekbones & Glow', 'Lipstick & Hair Styling Touch']
  },
  {
    id: 'fac-bridal',
    title: 'Royal Bridal Makeup',
    subtitle: 'HD & Airbrush Bridal Artistry with Floral Hairdo',
    price: '₹9,999 - ₹18,500',
    duration: '180 - 240 min',
    image: BRIDAL_IMAGE,
    serviceId: 'bridal-royal-signature',
    description: 'Complete luxury bridal makeover package. Long-lasting waterproof airbrush HD makeup, bespoke jewelry placement, designer floral hairdo, and dupatta draping.',
    highlights: ['Pre-Bridal Glow Prep', 'Waterproof 24-Hr Longevity', 'Intricate Floral Hair Braid', 'Dupatta & Saree Draping']
  }
];

export const PARLOUR_SERVICES: Service[] = [
  // 1. Hair Services (Starting with Hair Cut as primary)
  {
    id: 'hair-cut-style',
    name: 'Haute Hair Cut & Volume Blowout',
    category: 'hair',
    categoryLabel: 'Hair Cut & Styling',
    duration: '45 min',
    price: 699,
    originalPrice: 999,
    description: 'Trendy haircut tailored to your face shape (Layer, Step, Feather, Butterfly, or Bob) with botanical wash, deep conditioning mask, and voluminous blowdry.',
    includes: ['Face Structure Consultation', 'Herbal Scalp Wash & Head Massage', 'Precision Hair Cut', 'Signature Bounce Blowdry'],
    popular: true,
    image: HAIRCUT_IMAGE
  },
  {
    id: 'hair-balayage',
    name: 'Sun-Kissed Caramel Balayage & Gloss',
    category: 'hair',
    categoryLabel: 'Hair Cut & Styling',
    duration: '180 min',
    price: 4500,
    originalPrice: 5500,
    description: 'Custom hand-painted multidimensional blonde & caramel balayage with Olaplex bond repair, luxury toner bath, and bouncy blowout.',
    includes: ['Bespoke Color Consultation', 'Olaplex No.1 & No.2 Treatment', 'Custom Toning Bath', 'Silk Moisture Blowdry & Styling'],
    popular: true,
    image: '/src/assets/images/gallery_balayage_hair_1793940413859.jpg'
  },
  {
    id: 'hair-keratin-smoothing',
    name: 'Keratin Diamond Silk Hair Spa & Smoothing',
    category: 'hair',
    categoryLabel: 'Hair Cut & Styling',
    duration: '150 min',
    price: 3800,
    originalPrice: 4500,
    description: 'Eliminates frizz, restores damaged hair cuticles, and delivers glossy mirror-shine lasting up to 4 months.',
    includes: ['Deep Clarifying Cleansing', 'Keratin Protein Seal', 'Thermal Sealing Treatment', 'Post-Care Serum Application'],
    popular: false
  },

  // 2. Party & Occasion Makeup
  {
    id: 'makeup-party-glam',
    name: 'HD Party & Occasion Glam Makeup',
    category: 'bridal',
    categoryLabel: 'Makeup & Makeovers',
    duration: '75 min',
    price: 2800,
    originalPrice: 3500,
    description: 'High-definition radiant makeup for parties, festivals, sangeet, and family functions. Soft smokey or golden eyes with dewy skin and long-lasting lipstick.',
    includes: ['Pore Minimizing Skin Prep', 'HD Foundation Base & Highlighting', 'Smokey / Golden Eye Art', 'False Lashes & Quick Hairstyling'],
    popular: true,
    image: MAKEUP_IMAGE
  },
  {
    id: 'makeup-engagement-cocktail',
    name: 'Engagement & Cocktail Glam Makeover',
    category: 'bridal',
    categoryLabel: 'Makeup & Makeovers',
    duration: '90 min',
    price: 4800,
    originalPrice: 6000,
    description: 'Celebrity-style dewy glass skin makeup with sculpted contouring, metallic eye pigments, customized lashes, and designer hair curls or sleek bun.',
    includes: ['Hydra-Glow Base Primer', 'Precision Facial Contouring', 'Designer Hollywood Hair Waves', 'Waterproof Transfer-Proof Setting'],
    popular: false
  },

  // 3. Bridal Makeup & Artistry
  {
    id: 'bridal-royal-signature',
    name: 'The Grand Royal Bridal Makeover',
    category: 'bridal',
    categoryLabel: 'Bridal Makeup',
    duration: '240 min',
    price: 14500,
    originalPrice: 18000,
    description: 'Our signature bridal package: High-definition 24-hr waterproof bridal makeup, intricate floral braided hairdo, jewelry placement, and designer dupatta draping.',
    includes: ['Pre-Bridal Skin Priming & Hydra Care', 'Waterproof HD Airbrush Makeup', 'Intricate Floral Hair Artistry', 'Dupatta & Saree Draping', 'False Mink Lashes & Touchup Kit'],
    popular: true,
    image: BRIDAL_IMAGE
  },
  {
    id: 'bridal-pre-ritual',
    name: 'Pre-Bridal Radiance Glow Package',
    category: 'bridal',
    categoryLabel: 'Bridal Makeup',
    duration: '180 min',
    price: 8500,
    description: 'Full bridal glow prep: 24K gold facial, whole body herbal ubtan polishing, crystal manicure, rose pedicure, and waxing.',
    includes: ['24K Gold Skin Facial', 'Full Body Ayurvedic Polishing', 'Deluxe Manicure & Pedicure', 'Full Body Organic Sugar Waxing'],
    popular: true
  },

  // 4. Skin & Facials
  {
    id: 'skin-glass-hydro',
    name: 'Korean Glass Skin Hydro-Infusion Facial',
    category: 'skin',
    categoryLabel: 'Skin & Facial Aesthetics',
    duration: '75 min',
    price: 2400,
    originalPrice: 3000,
    description: 'Deep pore hydro-jet cleansing, peptide serum infusion, and cooling cryo-globe massage for immediate glowing radiant skin.',
    includes: ['Ultrasonic Pore Cleansing', 'Hyaluronic Hydro-Infusion', 'LED Collagen Photo-Therapy', 'Cryo-Globe Lymphatic Massage'],
    popular: true,
    image: FACIAL_IMAGE
  },
  {
    id: 'skin-gold-facial',
    name: 'Nayasha 24K Gold Radiance Facial',
    category: 'skin',
    categoryLabel: 'Skin & Facial Aesthetics',
    duration: '60 min',
    price: 1800,
    description: 'Pure 24K gold foil and brightening saffron extracts that remove tan, lighten pigmentation, and restore instant glow.',
    includes: ['Enzyme Micro-Scrub', 'Gold Serum Deep Penetration', 'Gold Peel-Off Mask', 'Chilled Rose Mist'],
    popular: false
  },

  // 5. Nails & Lashes
  {
    id: 'nails-russian-gel',
    name: 'Nail Art, Gel Extensions & Russian Manicure',
    category: 'nails',
    categoryLabel: 'Nails & Hand Care',
    duration: '60 min',
    price: 1200,
    description: 'Meticulous cuticle cleanup, gel nail extensions with customized nail art (glitter, chrome, French, or ombre).',
    includes: ['Precision Cuticle Care', 'Gel Nail Strengthening', 'Custom Nail Art Design', 'Cuticle Elixir Massage'],
    popular: false
  }
];

export const PARLOUR_STYLISTS: Stylist[] = [
  {
    id: 'stylist-priya',
    name: 'Priya Sharma',
    role: 'Lead Bridal & Makeup Specialist',
    experience: '11+ Years',
    rating: 4.98,
    reviewsCount: 310,
    specialty: 'Royal Bridal Makeovers & HD Event Makeup',
    avatar: 'PS',
    bio: 'Specialist in authentic Indian bridal makeovers, luminous skin finishes, and intricate traditional & contemporary floral hairdos.'
  },
  {
    id: 'stylist-ananya',
    name: 'Ananya Verma',
    role: 'Senior Hair Stylist & Hair Cut Expert',
    experience: '8+ Years',
    rating: 4.96,
    reviewsCount: 260,
    specialty: 'Trending Hair Cuts, Layering, Balayage & Keratin',
    avatar: 'AV',
    bio: 'Trained in precision hair cutting and modern face-framing styles. Specializes in haircuts that look stunning without daily heavy styling.'
  },
  {
    id: 'stylist-sophia',
    name: 'Sophia Laurent',
    role: 'Skin Aesthetician & Makeup Artist',
    experience: '7 Years',
    rating: 4.94,
    reviewsCount: 195,
    specialty: 'Party Makeup & Glass Skin Facials',
    avatar: 'SL',
    bio: 'Expert in cocktail party makeovers, glowing skin prep, and customized facial therapies for instant party radiance.'
  }
];

export const RECENT_STYLES_GALLERY: GalleryItem[] = [
  {
    id: 'look-bridal-grand',
    title: 'Royal Heritage Bridal Makeover',
    category: 'bridal',
    categoryLabel: 'Bridal Makeup',
    image: BRIDAL_IMAGE,
    stylistName: 'Priya Sharma',
    serviceId: 'bridal-royal-signature',
    serviceName: 'The Grand Royal Bridal Makeover',
    description: 'Celebrated bridal transformation: dewy golden glow, winged liner, rose petal lips, and an exquisite floral decorated braid with gold mathapatti.',
    technique: 'Airbrush HD base, baked mineral finish, and floral woven braid technique.',
    clientFeedback: '"Priya at Nayasha made me look like a queen on my wedding day! The makeup stayed perfect all through the night."'
  },
  {
    id: 'look-party-glam',
    title: 'Stunning HD Party & Cocktail Makeup',
    category: 'bridal',
    categoryLabel: 'Party Makeup',
    image: MAKEUP_IMAGE,
    stylistName: 'Sophia Laurent',
    serviceId: 'makeup-party-glam',
    serviceName: 'HD Party & Occasion Glam Makeup',
    description: 'High-glam evening look with sculpted cheekbones, champagne shimmer eyelids, velvet lips, and cascading Hollywood waves.',
    technique: 'Hydra base, champagne chrome pigment, contour sculpting.',
    clientFeedback: '"Received so many compliments at my sister’s sangeet! Flawless makeup that did not look cakey at all."'
  },
  {
    id: 'look-haircut-layers',
    title: 'Precision Face-Framing Layer Hair Cut',
    category: 'hair',
    categoryLabel: 'Hair Cut & Styling',
    image: HAIRCUT_IMAGE,
    stylistName: 'Ananya Verma',
    serviceId: 'hair-cut-style',
    serviceName: 'Haute Hair Cut & Volume Blowout',
    description: 'Chic modern haircut with soft curtain bangs and textured layers that add instant volume, bounce, and movement.',
    technique: 'Slide-cutting technique tailored to face shape + round-brush blowout.',
    clientFeedback: '"Best hair cut in town! Ananya knew exactly what would suit my face. Hair feels so light and healthy."'
  },
  {
    id: 'look-caramel-balayage',
    title: 'Caramel & Honey Balayage Waves',
    category: 'hair',
    categoryLabel: 'Hair Cut & Styling',
    image: '/src/assets/images/gallery_balayage_hair_1793940413859.jpg',
    stylistName: 'Ananya Verma',
    serviceId: 'hair-balayage',
    serviceName: 'Sun-Kissed Caramel Balayage & Gloss',
    description: 'Hand-painted warm caramel and honey ribbons with deep glossy shine and protective Olaplex bond infusion.',
    technique: 'Freehand balayage clay lightener + Olaplex + gloss toner.',
    clientFeedback: '"The color blend is so seamless! Even after washing, it still looks fresh and salon-styled."'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Sunita Mehra',
    authorCity: 'Civil Lines',
    rating: 5,
    date: '2 days ago',
    serviceTitle: 'The Grand Royal Bridal Makeover',
    comment: 'Booked Nayasha for my bridal makeup through their WhatsApp number 8630976072. The booking process was super fast. Priya did magic with my bridal look—the makeup was waterproof, lightweight, and looked breathtaking in photos. Highly recommend Nayasha!',
    verified: true,
    helpfulCount: 34,
    avatarBg: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'rev-2',
    authorName: 'Ritika Sharma',
    authorCity: 'Model Town',
    rating: 5,
    date: '4 days ago',
    serviceTitle: 'Haute Hair Cut & Volume Blowout',
    comment: 'Got my layered haircut with curtain bangs done here. Ananya was so patient and gave me the exact Pinterest hairstyle I wanted. Total value for money and very hygienic parlour.',
    verified: true,
    helpfulCount: 22,
    avatarBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'rev-3',
    authorName: 'Neha Aggarwal',
    authorCity: 'Sector 14',
    rating: 5,
    date: '1 week ago',
    serviceTitle: 'HD Party & Occasion Glam Makeup',
    comment: 'I had to attend a wedding reception and called 8630976072 for an urgent slot. They accommodated me immediately. The party makeup was radiant and stayed put for 8+ hours without creasing!',
    verified: true,
    helpfulCount: 18,
    avatarBg: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'rev-4',
    authorName: 'Pooja Verma',
    authorCity: 'Green Park',
    rating: 5,
    date: '2 weeks ago',
    serviceTitle: 'Korean Glass Skin Hydro-Infusion Facial',
    comment: 'Nayasha parlour has a very peaceful and clean atmosphere. The facial glow stayed for more than 10 days. Will definitely book again!',
    verified: true,
    helpfulCount: 15,
    avatarBg: 'bg-purple-100 text-purple-800'
  }
];

export const AVAILABLE_TIME_SLOTS = [
  '10:00 AM',
  '11:15 AM',
  '12:30 PM',
  '02:00 PM',
  '03:15 PM',
  '04:30 PM',
  '05:45 PM',
  '07:00 PM'
];

export const PARLOUR_INFO = {
  name: 'Nayasha',
  fullName: 'Nayasha Beauty Parlour & Makeover Studio',
  tagline: 'Hair Cut · Party Makeup · Bridal Makeovers',
  phone: '8630976072',
  phoneDisplay: '+91 8630976072',
  whatsapp: '918630976072',
  whatsappLink: 'https://wa.me/918630976072?text=Hello%20Nayasha%20Beauty%20Parlour,%20I%20want%20to%20book%20an%20appointment%20for%20Hair%20Cut%20/%20Makeup%20/%20Bridal',
  callLink: 'tel:8630976072',
  address: 'Main Market Road, Near Central Plaza',
  city: 'Opposite City Center',
  email: 'nayashabeauty@gmail.com',
  hours: {
    weekdays: '10:00 AM – 8:30 PM',
    weekends: '09:30 AM – 9:00 PM'
  },
  features: [
    'Specialist in Bridal Makeovers & HD Party Makeup',
    'Customized Layer, Feather & Step Hair Cuts',
    'Instant Booking & Confirmation on 8630976072',
    '100% Sanitized Equipment & Premium Cosmetics'
  ]
};
