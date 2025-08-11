export interface CustomizationOption {
  id: string
  name: string
  type: "color" | "texture" | "component"
  category: string
  values: {
    id: string
    name: string
    value: string
    price: number
    thumbnail?: string
    color?: string
    layerControls?: {
      show: string[]
      hide: string[]
    }
  }[]
}

export const SAMPLE_PRODUCTS_WITH_CUSTOMIZATION = {
  "shirt-001": [
    {
      id: "fabric-color",
      name: "Fabric Color",
      type: "color" as const,
      category: "fabric",
      values: [
        { id: "white", name: "White", value: "#FFFFFF", price: 0, color: "#FFFFFF" },
        { id: "light-blue", name: "Light Blue", value: "#E3F2FD", price: 0, color: "#E3F2FD" },
        { id: "navy", name: "Navy", value: "#1565C0", price: 5, color: "#1565C0" },
        { id: "charcoal", name: "Charcoal", value: "#424242", price: 5, color: "#424242" },
        { id: "burgundy", name: "Burgundy", value: "#8E24AA", price: 10, color: "#8E24AA" },
        { id: "forest", name: "Forest Green", value: "#2E7D32", price: 10, color: "#2E7D32" },
        { id: "cream", name: "Cream", value: "#FFF8E1", price: 0, color: "#FFF8E1" },
        { id: "pink", name: "Pink", value: "#F8BBD9", price: 5, color: "#F8BBD9" },
      ],
    },
    {
      id: "fabric-type",
      name: "Fabric Type",
      type: "texture" as const,
      category: "fabric",
      values: [
        { id: "cotton", name: "Cotton", value: "cotton", price: 0 },
        { id: "linen", name: "Linen", value: "linen", price: 15 },
        { id: "silk", name: "Silk", value: "silk", price: 50 },
        { id: "wool", name: "Wool", value: "wool", price: 25 },
        { id: "cashmere", name: "Cashmere", value: "cashmere", price: 100 },
      ],
    },
    {
      id: "collar-style",
      name: "Collar Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "spread", name: "Spread Collar", value: "spread", price: 0 },
        { id: "point", name: "Point Collar", value: "point", price: 0 },
        { id: "button-down", name: "Button Down", value: "button-down", price: 5 },
        { id: "cutaway", name: "Cutaway", value: "cutaway", price: 10 },
      ],
    },
    {
      id: "cuff-style",
      name: "Cuff Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "barrel", name: "Barrel Cuff", value: "barrel", price: 0 },
        { id: "french", name: "French Cuff", value: "french", price: 15 },
        { id: "convertible", name: "Convertible", value: "convertible", price: 10 },
      ],
    },
    {
      id: "monogram",
      name: "Embroidered Monogram",
      type: "component" as const,
      category: "personalization",
      values: [
        { id: "none", name: "No Monogram", value: "none", price: 0 },
        { id: "initials", name: "Initials (3 chars)", value: "initials", price: 6.5 },
        { id: "full-name", name: "Full Name (15 chars)", value: "full-name", price: 10 },
      ],
    },
    {
      id: "button-color",
      name: "Button Color",
      type: "color" as const,
      category: "details",
      values: [
        { id: "standard", name: "Standard Matching", value: "standard", price: 0 },
        { id: "gold", name: "Gold", value: "#FFD700", price: 8, color: "#FFD700" },
        { id: "silver", name: "Silver", value: "#C0C0C0", price: 8, color: "#C0C0C0" },
        { id: "copper", name: "Copper", value: "#B87333", price: 8, color: "#B87333" },
        { id: "bronze", name: "Bronze", value: "#CD7F32", price: 8, color: "#CD7F32" },
        { id: "pewter", name: "Pewter", value: "#96A8A1", price: 8, color: "#96A8A1" },
      ],
    },
  ],
  "pants-001": [
    {
      id: "fabric-color",
      name: "Fabric Color",
      type: "color" as const,
      category: "fabric",
      values: [
        { id: "navy", name: "Navy", value: "#1565C0", price: 0, color: "#1565C0" },
        { id: "charcoal", name: "Charcoal", value: "#424242", price: 0, color: "#424242" },
        { id: "black", name: "Black", value: "#000000", price: 5, color: "#000000" },
        { id: "khaki", name: "Khaki", value: "#8D6E63", price: 0, color: "#8D6E63" },
        { id: "olive", name: "Olive", value: "#689F38", price: 5, color: "#689F38" },
        { id: "burgundy", name: "Burgundy", value: "#8E24AA", price: 10, color: "#8E24AA" },
        { id: "stone", name: "Stone", value: "#A1887F", price: 0, color: "#A1887F" },
        { id: "cream", name: "Cream", value: "#FFF8E1", price: 5, color: "#FFF8E1" },
      ],
    },
    {
      id: "fabric-type",
      name: "Fabric Type",
      type: "texture" as const,
      category: "fabric",
      values: [
        { id: "wool", name: "Wool", value: "wool", price: 0 },
        { id: "cotton", name: "Cotton", value: "cotton", price: -10 },
        { id: "linen", name: "Linen", value: "linen", price: 15 },
        { id: "cashmere", name: "Cashmere", value: "cashmere", price: 100 },
        { id: "stretch-wool", name: "Stretch Wool", value: "stretch-wool", price: 25 },
        { id: "corduroy", name: "Corduroy", value: "corduroy", price: 20 },
      ],
    },
    {
      id: "fit-style",
      name: "Fit Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "classic", name: "Classic Fit", value: "classic", price: 0 },
        { id: "slim", name: "Slim Fit", value: "slim", price: 0 },
        { id: "tailored", name: "Tailored Fit", value: "tailored", price: 5 },
        { id: "relaxed", name: "Relaxed Fit", value: "relaxed", price: 0 },
        { id: "athletic", name: "Athletic Fit", value: "athletic", price: 10 },
      ],
    },
    {
      id: "waistband-style",
      name: "Waistband Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "standard", name: "Standard", value: "standard", price: 0 },
        { id: "extended", name: "Extended Tab", value: "extended", price: 10 },
        { id: "side-adjusters", name: "Side Adjusters", value: "side-adjusters", price: 15 },
        { id: "suspender-buttons", name: "Suspender Buttons", value: "suspender-buttons", price: 12 },
      ],
    },
    {
      id: "pocket-style",
      name: "Pocket Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "standard", name: "Standard Pockets", value: "standard", price: 0 },
        { id: "slanted", name: "Slanted Pockets", value: "slanted", price: 5 },
        { id: "coin-pocket", name: "With Coin Pocket", value: "coin-pocket", price: 8 },
        { id: "ticket-pocket", name: "With Ticket Pocket", value: "ticket-pocket", price: 10 },
      ],
    },
    {
      id: "pleat-style",
      name: "Pleat Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "flat-front", name: "Flat Front", value: "flat-front", price: 0 },
        { id: "single-pleat", name: "Single Pleat", value: "single-pleat", price: 5 },
        { id: "double-pleat", name: "Double Pleat", value: "double-pleat", price: 10 },
      ],
    },
    {
      id: "hem-style",
      name: "Hem Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "no-cuff", name: "No Cuff", value: "no-cuff", price: 0 },
        { id: "cuffed", name: "Cuffed", value: "cuffed", price: 5 },
        { id: "turn-up", name: "Turn Up", value: "turn-up", price: 8 },
        { id: "unfinished", name: "Unfinished (Tailor Hem)", value: "unfinished", price: 0 },
      ],
    },
    {
      id: "belt-loops",
      name: "Belt Loops",
      type: "component" as const,
      category: "details",
      values: [
        { id: "standard", name: "Standard Belt Loops", value: "standard", price: 0 },
        { id: "extended", name: "Extended Belt Loops", value: "extended", price: 5 },
        { id: "no-loops", name: "No Belt Loops", value: "no-loops", price: -5 },
      ],
    },
  ],
  "jacket-001": [
    {
      id: "fabric-color",
      name: "Fabric Color",
      type: "color" as const,
      category: "fabric",
      values: [
        { id: "navy", name: "Navy", value: "#1565C0", price: 0, color: "#1565C0" },
        { id: "charcoal", name: "Charcoal", value: "#424242", price: 0, color: "#424242" },
        { id: "black", name: "Black", value: "#000000", price: 10, color: "#000000" },
        { id: "brown", name: "Brown", value: "#5D4037", price: 5, color: "#5D4037" },
        { id: "burgundy", name: "Burgundy", value: "#8E24AA", price: 15, color: "#8E24AA" },
        { id: "forest", name: "Forest Green", value: "#2E7D32", price: 15, color: "#2E7D32" },
        { id: "midnight", name: "Midnight Blue", value: "#0D47A1", price: 10, color: "#0D47A1" },
      ],
    },
    {
      id: "fabric-type",
      name: "Fabric Type",
      type: "texture" as const,
      category: "fabric",
      values: [
        { id: "wool", name: "Wool", value: "wool", price: 0 },
        { id: "cashmere", name: "Cashmere", value: "cashmere", price: 200 },
        { id: "tweed", name: "Tweed", value: "tweed", price: 50 },
        { id: "velvet", name: "Velvet", value: "velvet", price: 75 },
        { id: "linen", name: "Linen", value: "linen", price: 30 },
        { id: "wool-silk", name: "Wool-Silk Blend", value: "wool-silk", price: 100 },
      ],
    },
    {
      id: "jacket-style",
      name: "Jacket Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "single-breasted", name: "Single Breasted", value: "single-breasted", price: 0 },
        { id: "double-breasted", name: "Double Breasted", value: "double-breasted", price: 50 },
        { id: "three-piece", name: "Three Piece (with Vest)", value: "three-piece", price: 150 },
      ],
    },
    {
      id: "lapel-style",
      name: "Lapel Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "notched", name: "Notched Lapel", value: "notched", price: 0 },
        { id: "peak", name: "Peak Lapel", value: "peak", price: 25 },
        { id: "shawl", name: "Shawl Lapel", value: "shawl", price: 30 },
        { id: "wide-peak", name: "Wide Peak Lapel", value: "wide-peak", price: 35 },
      ],
    },
    {
      id: "button-configuration",
      name: "Button Configuration",
      type: "component" as const,
      category: "style",
      values: [
        { id: "two-button", name: "Two Button", value: "two-button", price: 0 },
        { id: "three-button", name: "Three Button", value: "three-button", price: 5 },
        { id: "one-button", name: "One Button", value: "one-button", price: 10 },
        { id: "four-button", name: "Four Button (DB)", value: "four-button", price: 15 },
      ],
    },
    {
      id: "vent-style",
      name: "Vent Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "no-vent", name: "No Vent", value: "no-vent", price: 0 },
        { id: "center-vent", name: "Center Vent", value: "center-vent", price: 5 },
        { id: "side-vents", name: "Side Vents", value: "side-vents", price: 10 },
      ],
    },
    {
      id: "pocket-style",
      name: "Pocket Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "flap-pockets", name: "Flap Pockets", value: "flap-pockets", price: 0 },
        { id: "jetted-pockets", name: "Jetted Pockets", value: "jetted-pockets", price: 10 },
        { id: "patch-pockets", name: "Patch Pockets", value: "patch-pockets", price: 15 },
        { id: "ticket-pocket", name: "With Ticket Pocket", value: "ticket-pocket", price: 12 },
      ],
    },
    {
      id: "shoulder-style",
      name: "Shoulder Style",
      type: "component" as const,
      category: "construction",
      values: [
        { id: "structured", name: "Structured", value: "structured", price: 0 },
        { id: "soft-shoulder", name: "Soft Shoulder", value: "soft-shoulder", price: 15 },
        { id: "neapolitan", name: "Neapolitan", value: "neapolitan", price: 35 },
      ],
    },
    {
      id: "canvas-type",
      name: "Canvas Construction",
      type: "component" as const,
      category: "construction",
      values: [
        { id: "half-canvas", name: "Half Canvas", value: "half-canvas", price: 0 },
        { id: "full-canvas", name: "Full Canvas", value: "full-canvas", price: 100 },
        { id: "fused", name: "Fused", value: "fused", price: -25 },
      ],
    },
    {
      id: "button-material",
      name: "Button Material",
      type: "component" as const,
      category: "details",
      values: [
        { id: "horn", name: "Horn", value: "horn", price: 0 },
        { id: "mother-of-pearl", name: "Mother of Pearl", value: "mother-of-pearl", price: 25 },
        { id: "corozo", name: "Corozo Nut", value: "corozo", price: 15 },
        { id: "metal", name: "Metal", value: "metal", price: 20 },
      ],
    },
    {
      id: "button-style",
      name: "Button Style",
      type: "component" as const,
      category: "details",
      values: [
        { id: "classic-round", name: "Classic Round", value: "classic-round", price: 0, thumbnail: "/images/buttons/classic-round.png" },
        { id: "beveled-edge", name: "Beveled Edge", value: "beveled-edge", price: 5, thumbnail: "/images/buttons/beveled-edge.png" },
        { id: "flat-modern", name: "Flat Modern", value: "flat-modern", price: 8, thumbnail: "/images/buttons/flat-modern.png" },
        { id: "domed", name: "Domed", value: "domed", price: 10, thumbnail: "/images/buttons/domed.png" },
        { id: "vintage-shank", name: "Vintage Shank", value: "vintage-shank", price: 15, thumbnail: "/images/buttons/vintage-shank.png" },
        { id: "square-modern", name: "Square Modern", value: "square-modern", price: 12, thumbnail: "/images/buttons/square-modern.png" },
      ],
    },
    {
      id: "button-color",
      name: "Button Color",
      type: "color" as const,
      category: "details",
      values: [
        { id: "natural", name: "Natural", value: "#F5E6D3", price: 0, color: "#F5E6D3" },
        { id: "dark-brown", name: "Dark Brown", value: "#4A2C2A", price: 5, color: "#4A2C2A" },
        { id: "black", name: "Black", value: "#1A1A1A", price: 5, color: "#1A1A1A" },
        { id: "navy", name: "Navy", value: "#1565C0", price: 5, color: "#1565C0" },
        { id: "gold", name: "Gold", value: "#FFD700", price: 15, color: "#FFD700" },
        { id: "silver", name: "Silver", value: "#C0C0C0", price: 12, color: "#C0C0C0" },
        { id: "bronze", name: "Bronze", value: "#CD7F32", price: 12, color: "#CD7F32" },
        { id: "pearl-white", name: "Pearl White", value: "#F8F8FF", price: 10, color: "#F8F8FF" },
      ],
    },
    {
      id: "embroidered-monogram",
      name: "Embroidered Monogram",
      type: "component" as const,
      category: "personalization",
      values: [
        { id: "no-monogram", name: "No Monogram", value: "none", price: 0 },
        { id: "chest-monogram", name: "Chest Monogram", value: "chest", price: 25 },
        { id: "inside-pocket", name: "Inside Pocket Monogram", value: "inside-pocket", price: 20 },
        { id: "cuff-monogram", name: "Cuff Monogram", value: "cuff", price: 30 },
        { id: "lining-monogram", name: "Lining Monogram", value: "lining", price: 35 },
      ],
    },
    {
      id: "monogram-text",
      name: "Monogram Text",
      type: "component" as const,
      category: "personalization",
      values: [
        { id: "custom-text", name: "Custom Text (1-4 characters)", value: "custom", price: 0 },
      ],
    },
    {
      id: "monogram-style",
      name: "Monogram Style",
      type: "component" as const,
      category: "personalization",
      values: [
        { id: "classic-serif", name: "Classic Serif", value: "classic-serif", price: 0, thumbnail: "/images/monogram/classic-serif.png" },
        { id: "modern-sans", name: "Modern Sans", value: "modern-sans", price: 5, thumbnail: "/images/monogram/modern-sans.png" },
        { id: "script-elegant", name: "Elegant Script", value: "script-elegant", price: 10, thumbnail: "/images/monogram/script-elegant.png" },
        { id: "block-bold", name: "Bold Block", value: "block-bold", price: 5, thumbnail: "/images/monogram/block-bold.png" },
        { id: "vintage-ornate", name: "Vintage Ornate", value: "vintage-ornate", price: 15, thumbnail: "/images/monogram/vintage-ornate.png" },
      ],
    },
    {
      id: "monogram-color",
      name: "Monogram Thread Color",
      type: "color" as const,
      category: "personalization",
      values: [
        { id: "navy", name: "Navy", value: "#1565C0", price: 0, color: "#1565C0" },
        { id: "black", name: "Black", value: "#000000", price: 0, color: "#000000" },
        { id: "white", name: "White", value: "#FFFFFF", price: 0, color: "#FFFFFF" },
        { id: "gold", name: "Gold", value: "#FFD700", price: 10, color: "#FFD700" },
        { id: "silver", name: "Silver", value: "#C0C0C0", price: 8, color: "#C0C0C0" },
        { id: "burgundy", name: "Burgundy", value: "#8E24AA", price: 5, color: "#8E24AA" },
        { id: "forest", name: "Forest Green", value: "#2E7D32", price: 5, color: "#2E7D32" },
        { id: "royal-blue", name: "Royal Blue", value: "#4169E1", price: 5, color: "#4169E1" },
      ],
    },
  ],
  "suit-001": [
    {
      id: "fabric-color",
      name: "Suit Fabric Color",
      type: "color" as const,
      category: "fabric",
      values: [
        { id: "navy", name: "Navy", value: "#1565C0", price: 0, color: "#1565C0" },
        { id: "charcoal", name: "Charcoal", value: "#424242", price: 0, color: "#424242" },
        { id: "black", name: "Black", value: "#000000", price: 15, color: "#000000" },
        { id: "grey", name: "Light Grey", value: "#9E9E9E", price: 10, color: "#9E9E9E" },
        { id: "pinstripe-navy", name: "Navy Pinstripe", value: "#1565C0", price: 50, color: "#1565C0" },
      ],
    },
    {
      id: "fabric-type",
      name: "Suit Fabric",
      type: "texture" as const,
      category: "fabric",
      values: [
        { id: "super-120s", name: "Super 120s Wool", value: "super-120s", price: 0 },
        { id: "super-150s", name: "Super 150s Wool", value: "super-150s", price: 200 },
        { id: "cashmere-blend", name: "Cashmere Blend", value: "cashmere-blend", price: 400 },
        { id: "mohair-blend", name: "Mohair Blend", value: "mohair-blend", price: 150 },
      ],
    },
    {
      id: "suit-style",
      name: "Suit Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "two-piece", name: "Two Piece Suit", value: "two-piece", price: 0 },
        { id: "three-piece", name: "Three Piece Suit", value: "three-piece", price: 200 },
        { id: "tuxedo", name: "Tuxedo", value: "tuxedo", price: 300 },
      ],
    },
  ],
  "blazer-001": [
    {
      id: "fabric-color",
      name: "Blazer Color",
      type: "color" as const,
      category: "fabric",
      values: [
        { id: "navy", name: "Navy Blazer", value: "#1565C0", price: 0, color: "#1565C0" },
        { id: "forest", name: "Forest Green", value: "#2E7D32", price: 10, color: "#2E7D32" },
        { id: "burgundy", name: "Burgundy", value: "#8E24AA", price: 15, color: "#8E24AA" },
        { id: "camel", name: "Camel", value: "#D2691E", price: 20, color: "#D2691E" },
      ],
    },
    {
      id: "blazer-style",
      name: "Blazer Style",
      type: "component" as const,
      category: "style",
      values: [
        { id: "classic", name: "Classic Blazer", value: "classic", price: 0 },
        { id: "sport-coat", name: "Sport Coat", value: "sport-coat", price: 25 },
        { id: "unstructured", name: "Unstructured", value: "unstructured", price: 50 },
      ],
    },
  ],
}
