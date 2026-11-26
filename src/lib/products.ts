export type Size = { value: "250ml" | "50ml"; label: string };

export type Product = {
  id: string;
  name: string;
  productLine: string;
  scent: string;
  category: "oud" | "floral" | "citrus" | "spiced";
  symbol: string;
  inStock: boolean;
  badge: string | null;
  rating: number | null;
  reviewCount: number;
  isFeatured: boolean;
  images: string[];
  story: string;
  description: string;
  keyBenefits: string[];
  tags: string[];
  prices: Record<string, number>;
  glowColor: string;
  accentColor: string;
  cardGradient: string;
  isActive: boolean;
  salesCount: number;
};

export const SIZES: Size[] = [
  { value: "250ml", label: "250ml" },
  { value: "50ml", label: "50ml" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Caramel Nights In Cannes",
    productLine: "C Oud",
    scent: "Sweet Caramel · Coffee · White Florals · Lifted Oud",
    category: "oud",
    symbol: "◈",
    inStock: true,
    badge: null,
    rating: 4.8,
    reviewCount: 112,
    isFeatured: true,
    images: ["/images/products/caramel-cannes.png"],
    story:
      "On a balcony in Cannes, golden caramel slips into the ocean breeze, and laughter drips like honey over crystal glasses.",
    description:
      "On a balcony in Cannes, golden caramel slips into the ocean breeze, and laughter drips like honey over crystal glasses. Oud hums beneath it all — deep, sultry, eternal. Caramel Nights in Cannes is the hour where elegance dissolves into instinct.",
    keyBenefits: ["Rich Caramel Warmth", "Lifted Oud Base", "Long-Lasting Scent"],
    tags: ["Sulphate-Free", "Cruelty-Free", "Vegan", "Luxury Oud"],
    prices: { "250ml": 500, "50ml": 150 },
    glowColor: "rgba(210, 140, 40, 0.45)",
    accentColor: "#d4921e",
    cardGradient: "linear-gradient(135deg, #0e0800 0%, #2e1800 50%, #4a2800 100%)",
    isActive: true,
    salesCount: 189,
  },
  {
    id: "2",
    name: "Velvet Embers In Cairo",
    productLine: "Velvet Oud",
    scent: "Golden Amber · Aged Oud · Musky Undertone",
    category: "oud",
    symbol: "✦",
    inStock: true,
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 201,
    isFeatured: true,
    images: ["/images/products/velvet-cairo.png"],
    story:
      "There are streets in Cairo that hold the scent of stories — lavender clings to carved stone, and oud smolders in the seams of twilight.",
    description:
      "There are streets in Cairo that hold the scent of stories — lavender clings to carved stone, and oud smolders in the seams of twilight. Velvet Embers in Cairo is a memory wrapped in mystery, soft as silk yet strong as shadow.",
    keyBenefits: ["Aged Oud Depth", "Velvety Amber Warmth", "Lingering Musky Finish"],
    tags: ["Sulphate-Free", "Cruelty-Free", "Vegan", "Luxury Oud"],
    prices: { "250ml": 500, "50ml": 150 },
    glowColor: "rgba(180, 100, 20, 0.5)",
    accentColor: "#b8741a",
    cardGradient: "linear-gradient(135deg, #0e0600 0%, #2a1200 50%, #3e1e08 100%)",
    isActive: true,
    salesCount: 312,
  },
  {
    id: "3",
    name: "Evening In Paris",
    productLine: "An Evening In Paris",
    scent: "Damask Rose · White Florals · Sweet Spice · Polished Woods",
    category: "floral",
    symbol: "✿",
    inStock: true,
    badge: null,
    rating: 4.8,
    reviewCount: 93,
    isFeatured: true,
    images: ["/images/products/evening-paris.png"],
    story:
      "An evening in Paris is never quiet — not truly. It hums in wine glasses, sighs through vintage perfume, and lingers in your coat long after the rain.",
    description:
      "An evening in Paris is never quiet — not truly. It hums in wine glasses, sighs through vintage perfume, and lingers in your coat long after the rain. This fragrance is a city that doesn't ask for attention — it holds it.",
    keyBenefits: ["Damask Rose Heart", "Sweet Spice Warmth", "Polished Woody Base"],
    tags: ["Sulphate-Free", "Cruelty-Free", "Vegan", "Floral"],
    prices: { "250ml": 500, "50ml": 150 },
    glowColor: "rgba(180, 50, 80, 0.4)",
    accentColor: "#c97b8a",
    cardGradient: "linear-gradient(135deg, #120408 0%, #2e0e18 50%, #420e20 100%)",
    isActive: true,
    salesCount: 145,
  },
  {
    id: "4",
    name: "Bon Bons In Bahrain",
    productLine: "Arab Café",
    scent: "Dark Coffee · Oud Resin · Silken Musk · Powdered Warmth",
    category: "oud",
    symbol: "∗",
    inStock: true,
    badge: null,
    rating: 4.7,
    reviewCount: 78,
    isFeatured: false,
    images: ["/images/products/bonbons-bahrain.png"],
    story:
      "There's a hush just before sunset in Bahrain — where dates glisten like jewels, and laughter rises like steam from porcelain cups.",
    description:
      "There's a hush just before sunset in Bahrain — where dates glisten like jewels, and laughter rises like steam from porcelain cups. The air is thick with memories of rose, oud, and sugared smoke.",
    keyBenefits: ["Dark Coffee Opening", "Oud Resin Depth", "Powdered Warm Finish"],
    tags: ["Sulphate-Free", "Cruelty-Free", "Vegan", "Oriental"],
    prices: { "250ml": 500, "50ml": 150 },
    glowColor: "rgba(110, 55, 15, 0.5)",
    accentColor: "#a0621e",
    cardGradient: "linear-gradient(135deg, #0a0400 0%, #221000 50%, #341800 100%)",
    isActive: true,
    salesCount: 167,
  },
  {
    id: "5",
    name: "Palm Calm In Jumeirah",
    productLine: "CR7",
    scent: "Citrus Burst · Fresh Fruits · Clean Musk",
    category: "citrus",
    symbol: "◇",
    inStock: true,
    badge: "New",
    rating: null,
    reviewCount: 0,
    isFeatured: false,
    images: ["/images/products/palm-jumeirah.png"],
    story:
      "Jumeirah's palms know how to hush the world. Beneath them, time slows, and peace becomes perfume.",
    description:
      "Jumeirah's palms know how to hush the world. Beneath them, time slows, and peace becomes perfume. Palm Calm is breeze, skin, and surrender. Zuhoor turns this ease into lather, letting your body wear stillness with grace.",
    keyBenefits: ["Fresh Citrus Burst", "Clean Musk Dry-Down", "All-Day Freshness"],
    tags: ["Sulphate-Free", "Cruelty-Free", "Vegan", "Fresh"],
    prices: { "250ml": 500, "50ml": 150 },
    glowColor: "rgba(30, 160, 100, 0.35)",
    accentColor: "#2a9e6e",
    cardGradient: "linear-gradient(135deg, #021008 0%, #083020 50%, #0e4028 100%)",
    isActive: true,
    salesCount: 0,
  },
  {
    id: "6",
    name: "Noor In Northern Lights",
    productLine: "Kamrah",
    scent: "Spiced Cinnamon · Creamy Vanilla · Amber Resin",
    category: "spiced",
    symbol: "·",
    inStock: true,
    badge: "New",
    rating: null,
    reviewCount: 0,
    isFeatured: false,
    images: ["/images/products/noor-northern.png"],
    story:
      "What does light sound like when it dances? Noor in Northern Lights is a fragrance born from that silence — warm, golden, breathless.",
    description:
      "What does light sound like when it dances? Noor in Northern Lights is a fragrance born from that silence — warm, golden, breathless. Spiced cinnamon and creamy vanilla melt into amber resin, warming your skin like candlelight on cold nights.",
    keyBenefits: ["Spiced Cinnamon Warmth", "Creamy Vanilla Heart", "Amber Resin Depth"],
    tags: ["Sulphate-Free", "Cruelty-Free", "Vegan", "Spiced"],
    prices: { "250ml": 500, "50ml": 150 },
    glowColor: "rgba(200, 120, 30, 0.35)",
    accentColor: "#c87820",
    cardGradient: "linear-gradient(135deg, #100800 0%, #2c1800 50%, #3e2408 100%)",
    isActive: true,
    salesCount: 0,
  },
  {
    id: "7",
    name: "Berry Mist In Bruges",
    productLine: "Purple Oud",
    scent: "Ripe Fruits · Blooming Florals · Velvety Musk",
    category: "floral",
    symbol: "°",
    inStock: true,
    badge: "New",
    rating: null,
    reviewCount: 0,
    isFeatured: false,
    images: ["/images/products/berry-mist.png"],
    story:
      "In Bruges, mornings bloom with the quiet drama of berry markets and misted rooftops. Berry Mist feels like a poem scribbled in a letter never sent.",
    description:
      "In Bruges, mornings bloom with the quiet drama of berry markets and misted rooftops. Berry Mist in Bruges feels like a poem scribbled in a letter never sent — juicy, hidden, sincere.",
    keyBenefits: ["Juicy Berry Opening", "Blooming Floral Heart", "Velvety Musk Base"],
    tags: ["Sulphate-Free", "Cruelty-Free", "Vegan", "Fruity Floral"],
    prices: { "250ml": 500, "50ml": 150 },
    glowColor: "rgba(140, 50, 180, 0.35)",
    accentColor: "#9e3ec8",
    cardGradient: "linear-gradient(135deg, #0a0214 0%, #1e0830 50%, #2e0e44 100%)",
    isActive: true,
    salesCount: 0,
  },
  {
    id: "8",
    name: "Savannah's Smoke & Spice",
    productLine: "Safari Oud",
    scent: "Exotic Spices · White Florals · Subtle Leather · Fine Musk · Strong Oud",
    category: "oud",
    symbol: "✦",
    inStock: true,
    badge: "New",
    rating: null,
    reviewCount: 0,
    isFeatured: false,
    images: ["/images/products/savannah.png"],
    story:
      "When the wind races through the savannah, it smells like fire and bark and courage. Savannah's Smoke & Spice is a pulse — untamed and unforgettable.",
    description:
      "When the wind races through the savannah, it smells like fire and bark and courage. Savannah's Smoke & Spice is a pulse — untamed and unforgettable. It doesn't whisper. It declares.",
    keyBenefits: ["Exotic Spice Warmth", "Strong Oud Signature", "Wild Leather Base"],
    tags: ["Sulphate-Free", "Cruelty-Free", "Vegan", "Luxury Oud"],
    prices: { "250ml": 500, "50ml": 150 },
    glowColor: "rgba(160, 80, 20, 0.45)",
    accentColor: "#c06818",
    cardGradient: "linear-gradient(135deg, #0e0600 0%, #2c1200 50%, #401c08 100%)",
    isActive: true,
    salesCount: 0,
  },
  {
    id: "9",
    name: "Snowchild",
    productLine: "Weeknd",
    scent: "Sweet Tangerine · Cedarwood · Honey · Amber · Fine Musk",
    category: "citrus",
    symbol: "✧",
    inStock: true,
    badge: "New",
    rating: null,
    reviewCount: 0,
    isFeatured: false,
    images: ["/images/products/snowchild.png"],
    story:
      "Some fragrances are songs. Snowchild is blue velvet wrapped in frost — cool, haunting, beautiful. For those who crave the silence between notes.",
    description:
      "Some fragrances are songs. Snowchild is blue velvet wrapped in frost — cool, haunting, beautiful. Inspired by The Weeknd's lonely anthem, this scent is for those who crave the silence between notes.",
    keyBenefits: ["Sweet Tangerine Lift", "Honey Amber Heart", "Cool Cedarwood Base"],
    tags: ["Sulphate-Free", "Cruelty-Free", "Vegan", "Fresh"],
    prices: { "250ml": 500, "50ml": 150 },
    glowColor: "rgba(80, 130, 200, 0.3)",
    accentColor: "#4a82c8",
    cardGradient: "linear-gradient(135deg, #04080e 0%, #0c1828 50%, #101e34 100%)",
    isActive: true,
    salesCount: 0,
  },
];

export const IN_STOCK = PRODUCTS.filter((p) => p.inStock);
export const COMING_SOON = PRODUCTS.filter((p) => !p.inStock);

export const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "floral", label: "Floral" },
  { value: "oud", label: "Oud & Amber" },
  { value: "citrus", label: "Citrus" },
  { value: "spiced", label: "Spiced" },
];

export function priceFor(p: { prices?: Record<string, number> }, size: string) {
  return p.prices?.[size] ?? (size === "50ml" ? 150 : 500);
}
