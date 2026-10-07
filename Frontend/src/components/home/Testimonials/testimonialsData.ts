export interface Testimonial {
  id: number;
  name: string;
  role: string;
  city: string;
  fragrance: string;
  quote: string;
  year: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Elena Vance",
    role: "Creative Director",
    city: "New York",
    fragrance: "Orvella Noir",
    quote: "Orvella Noir stays on my cashmere coat for days. It creates an aura that enters the room before I speak and lingers pleasantly after I depart.",
    year: "Client since 2026",
  },
  {
    id: 2,
    name: "Julian Moreau",
    role: "Architectural Designer",
    city: "Paris",
    fragrance: "Orvella Aurea",
    quote: "Aurea Radiance is liquid sunlight. The saffron and solar woods feel architecturally balanced. Unlike mainstream commercial perfumes, it never turns synthetic.",
    year: "Client since 2026",
  },
  {
    id: 3,
    name: "Claire Sinclair",
    role: "Art Advisor",
    city: "London",
    fragrance: "Orvella Élan",
    quote: "The mood-first approach completely transformed how I choose scent. Élan has become my signature armor for gallery vernissages and client meetings.",
    year: "Client since 2026",
  },
  {
    id: 4,
    name: "Marcus Sterling",
    role: "Industrial Designer",
    city: "Milan",
    fragrance: "Orvella Velour",
    quote: "Velour Santal is tactile intimacy in a crystal flacon. The powdery iris and tonka bean melt directly into the skin with incredible subtlety.",
    year: "Client since 2026",
  },
];
