export interface MoodProfile {
  id: string;
  name: string;
  frenchTitle: string;
  tagline: string;
  identity: string;
  description: string;
  image: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  intensity: string;
  idealMoment: string;
  sillage: string;
}

export const ORVELLA_MOODS: MoodProfile[] = [
  {
    id: "noir",
    name: "Noir",
    frenchTitle: "L'Ombre Mystique",
    tagline: "Dark, smoky, mysterious.",
    identity: "The Enigmatic Presence",
    description: "An intoxicating veil of smoked timber, black cardamom, and raw amber. Designed for those whose quiet confidence commands an entire room.",
    image: "/images/orvella-noir.jpg",
    topNotes: "Smoked Birch, Black Cardamom, Bergamot Peel",
    heartNotes: "Atlas Cedarwood, Guaiac Wood, Incense Resin",
    baseNotes: "Indonesian Patchouli, Ambergris, Bourbon Vanilla",
    intensity: "Extrait (30% Concentration)",
    idealMoment: "Twilight gatherings, winter galas, late-night discourse",
    sillage: "Enveloping & Atmospheric",
  },
  {
    id: "elan",
    name: "Élan",
    frenchTitle: "L'Impulsion Vive",
    tagline: "Energetic, fresh, confident.",
    identity: "The Kinetic Modernist",
    description: "A burst of solar citrus layered with crisp Haitian vetiver and crushed petitgrain. A vibrant surge of vitality that awakens instinct and poise.",
    image: "/images/orvella-elan.jpg",
    topNotes: "Calabrian Bergamot, Bitter Orange, Pink Peppercorn",
    heartNotes: "French Petitgrain, Crisp Neroli, Cypress Needle",
    baseNotes: "Haitian Vetiver, White Amber, Dry Cedar",
    intensity: "Eau de Parfum (22% Concentration)",
    idealMoment: "Sunlit mornings, decisive board meetings, vernissage days",
    sillage: "Crisp & Radiant",
  },
  {
    id: "velour",
    name: "Velour",
    frenchTitle: "La Caresse Sublime",
    tagline: "Warm, sensual, sophisticated.",
    identity: "The Tactile Romancier",
    description: "Like raw silk against skin. Powdery Florentine iris entwined with toasted tonka bean and creamy sandalwood creates an irresistible tactile warmth.",
    image: "/images/orvella-velour.jpg",
    topNotes: "Bergamot Frost, Ambrette Seed, White Peach",
    heartNotes: "Florentine Iris Pallida, Violet Leaf, Heliotrope",
    baseNotes: "Venezuelan Tonka Bean, Mysore Sandalwood, Silk Musk",
    intensity: "Eau de Parfum (24% Concentration)",
    idealMoment: "Intimate dinners, silk attire, lingering conversations",
    sillage: "Sensual & Skin-Close",
  },
  {
    id: "aurea",
    name: "Aurea",
    frenchTitle: "Le Rayon d'Or",
    tagline: "Luminous, elegant, refined.",
    identity: "The Luminous Architect",
    description: "Pure radiance captured in crystal. Precious Persian saffron bathed in golden solar jasmine and dried blonde woods. A gilded signature of pure refinement.",
    image: "/images/orvella-aurea.jpg",
    topNotes: "Persian Saffron, Golden Mandarin, Marigold",
    heartNotes: "Jasmine Sambac, Solar Accord, Golden Mimosa",
    baseNotes: "Blonde Cedar, Amber Resins, Cashmere Wood",
    intensity: "Extrait de Parfum (28% Concentration)",
    idealMoment: "Golden hour celebrations, premier openings, celebratory evenings",
    sillage: "Majestic & Luminescent",
  },
  {
    id: "nuit",
    name: "Nuit",
    frenchTitle: "L'Heure Sombre",
    tagline: "Deep, intimate, evening-oriented.",
    identity: "The Midnight Patron",
    description: "Midnight rose steeped in dark resins and soft smoked leather. An affair of shadows and whispered vows that lingers into the dawn.",
    image: "/images/orvella-nuit.jpg",
    topNotes: "Black Pepper, Damask Plum, Saffron Spark",
    heartNotes: "Black Rose Absolute, Olibanum Tears, Leather Accord",
    baseNotes: "Oud Wood, Smoked Castoreum, Black Amber",
    intensity: "Extrait de Parfum (32% Concentration)",
    idealMoment: "Midnight rendezvous, opera houses, private salon hours",
    sillage: "Deep & Hypnotic",
  },
];

export interface CatalogPerfume {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  gender: string;
  mood: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  scentNotes: string;
  concentration: string;
  maceration: string;
}

export const ORVELLA_CATALOG: CatalogPerfume[] = [
  {
    _id: "orvella-noir-supreme",
    title: "Orvella Noir Supreme",
    imageUrl: "/images/orvella-noir.jpg",
    category: "Extrait de Parfum",
    gender: "Unisex",
    mood: "Noir",
    price: 285,
    shortDescription: "A fragrance that stays after you leave: smoked cedar, black cardamom, and bourbon amber.",
    fullDescription: "Orvella Noir Supreme is the definitive evening statement of the Maison. Blended with wild-harvested Atlas cedar, cracked black cardamom seeds, and deep amber resin, this creation envelops the wearer in a magnetic, shadowy presence.\n\nFormulated with a 30% concentration of pure aromatic essences, Noir Supreme matures over twelve weeks in dark French oak barrels to achieve its signature smoky depth.",
    scentNotes: "Top: Black Cardamom, Birch Wood | Heart: Smoked Cedar, Guaiac Resin | Base: Indonesian Patchouli, Bourbon Amber",
    concentration: "30% Pure Perfume Extrait",
    maceration: "12 Weeks Cold Maceration",
  },
  {
    _id: "orvella-elan-solaire",
    title: "Orvella Élan Solaire",
    imageUrl: "/images/orvella-elan.jpg",
    category: "Eau de Parfum",
    gender: "Unisex",
    mood: "Élan",
    price: 230,
    shortDescription: "Crisp Calabrian bergamot over kinetic Haitian vetiver and crushed neroli leaf.",
    fullDescription: "A vibrant tribute to modern movement and luminous vitality. Élan Solaire opens with high-altitude Calabrian bergamot and bitter green orange rind, settling into an earthy, aristocratic base of Haitian vetiver.\n\nCrafted for individuals who lead with quiet determination, this creation is crisp, invigorating, and unforgettable in warm daylight.",
    scentNotes: "Top: Calabrian Bergamot, Petitgrain | Heart: Neroli Petals, Cypress | Base: Haitian Vetiver, White Amber",
    concentration: "22% Eau de Parfum",
    maceration: "8 Weeks Maceration",
  },
  {
    _id: "orvella-velour-santal",
    title: "Orvella Velour Santal",
    imageUrl: "/images/orvella-velour.jpg",
    category: "Eau de Parfum",
    gender: "Women",
    mood: "Velour",
    price: 245,
    shortDescription: "Florentine iris petals veiled in toasted Venezuelan tonka and silk cashmeran.",
    fullDescription: "Sensual elegance captured in frosted glass. Velour Santal is an intimate composition evoking the delicate touch of raw ivory silk against skin. Its powdery Florentine iris root is enriched with creamy Mysore sandalwood and roasted tonka bean.\n\nIt wears like a whisper of warmth that draws admirers closer without ever shouting.",
    scentNotes: "Top: Ambrette Seed, White Peach | Heart: Florentine Iris Pallida, Heliotrope | Base: Venezuelan Tonka, Mysore Sandalwood",
    concentration: "24% Eau de Parfum",
    maceration: "10 Weeks Maceration",
  },
  {
    _id: "orvella-aurea-radiance",
    title: "Orvella Aurea Radiance",
    imageUrl: "/images/orvella-aurea.jpg",
    category: "Extrait de Parfum",
    gender: "Unisex",
    mood: "Aurea",
    price: 310,
    shortDescription: "Persian saffron threads steeped in solar jasmine sambac and dry blonde cedarwood.",
    fullDescription: "The crown flacon of the collection. Aurea Radiance is liquid gold, constructed around hand-selected Iranian saffron stigmas and morning-plucked jasmine sambac from Grasse.\n\nIts presence is regal and luminous, catching the light like gilded mosaic work and leaving an unmistakable signature of refined luxury.",
    scentNotes: "Top: Persian Saffron, Golden Mandarin | Heart: Jasmine Sambac, Solar Flora | Base: Blonde Cedar, Ambergris Crystals",
    concentration: "28% Extrait de Parfum",
    maceration: "14 Weeks Cellar Aging",
  },
  {
    _id: "orvella-nuit-d-ambre",
    title: "Orvella Nuit d'Ambre",
    imageUrl: "/images/orvella-nuit.jpg",
    category: "Extrait de Parfum",
    gender: "Unisex",
    mood: "Nuit",
    price: 320,
    shortDescription: "Midnight black rose, raw frankincense tears, and worn equestrian leather.",
    fullDescription: "An evocative nocturnal portrait. Nuit d'Ambre was created for moonlit hours and intimate encounters. A dark velvet Damask rose is smoked with Arabian frankincense and smoothed by vintage leather and dark patchouli.\n\nFormulated at an exceptional 32% concentration, one spray endures beyond dawn.",
    scentNotes: "Top: Black Pepper, Damask Plum | Heart: Black Rose Absolute, Incense Tears | Base: Aged Leather, Dark Patchouli, Oud Wood",
    concentration: "32% Grand Extrait",
    maceration: "16 Weeks Oak Cask Maturation",
  },
  {
    _id: "orvella-elan-vetiver",
    title: "Orvella Élan Vert",
    imageUrl: "/images/orvella-elan.jpg",
    category: "Eau de Toilette",
    gender: "Men",
    mood: "Élan",
    price: 195,
    shortDescription: "Highland juniper berries, chilled river stones, and aristocratic green vetiver.",
    fullDescription: "Pure kinetic poise. Orvella Élan Vert captures early mist lifting over alpine forest cedar and wild juniper groves. Clean, razor-sharp, and commanding.",
    scentNotes: "Top: Juniper Berry, Grapefruit Zest | Heart: Green Sage, Pine Needles | Base: Vetiver Bourbon, Mineral Musk",
    concentration: "18% Eau de Toilette Haute",
    maceration: "6 Weeks Maceration",
  },
  {
    _id: "orvella-velour-nude",
    title: "Orvella Velour de Soie",
    imageUrl: "/images/orvella-velour.jpg",
    category: "Attar Oil",
    gender: "Women",
    mood: "Velour",
    price: 260,
    shortDescription: "Alcohol-free pure perfume elixir with white musk, almond blossom, and honeyed vanilla.",
    fullDescription: "An exquisite attar oil formulated without ethanol. Melts seamlessly onto pulse points, releasing a velvety cocoon of warmth, white musk, and delicate almond blossoms throughout the day.",
    scentNotes: "Top: Almond Blossom, Dewy Cyclamen | Heart: White Suede, Honey Comb | Base: Cashmeran, Madagascar Vanilla Pod",
    concentration: "Pure Attar Perfume Oil",
    maceration: "Hand-Blended Oil Elixir",
  },
  {
    _id: "orvella-aurea-prive",
    title: "Orvella Aurea Privée",
    imageUrl: "/images/orvella-hero.jpg",
    category: "Extrait de Parfum",
    gender: "Unisex",
    mood: "Aurea",
    price: 350,
    shortDescription: "Limited vintage batch: solar amber, white truffle accord, and gilded rare osmanthus.",
    fullDescription: "A rare numbered private reserve. Distilled in micro-batches honoring the Maison's founding formulation, Aurea Privée represents the pinnacle of contemporary French perfumery.",
    scentNotes: "Top: Gilded Osmanthus, Mandarin | Heart: Solar Amber, White Truffle | Base: Aged Sandalwood, Raw Benzoin",
    concentration: "35% Pure Perfume Reserve",
    maceration: "20 Weeks Private Cellar",
  },
];
