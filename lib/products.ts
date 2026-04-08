export type ProductVariant = {
  id: string;
  flavor: string;
  size: string;
  stock: number;
  priceArs: number;
};

export type Product = {
  id: string;
  name: string;
  category: "proteina" | "creatina" | "preworkout" | "combo";
  description: string;
  variants: ProductVariant[];
};

export const products: Product[] = [
  {
    id: "whey-100",
    name: "Whey Protein 100%",
    category: "proteina",
    description: "Proteína concentrada para recuperación y ganancia muscular.",
    variants: [
      { id: "whey-vainilla-1kg", flavor: "Vainilla", size: "1kg", stock: 25, priceArs: 52999 },
      { id: "whey-choco-3kg", flavor: "Chocolate", size: "3kg", stock: 12, priceArs: 118499 }
    ]
  },
  {
    id: "creatina-mono",
    name: "Creatina Monohidratada",
    category: "creatina",
    description: "Mejora fuerza y rendimiento en entrenamientos intensos.",
    variants: [
      { id: "creatina-300", flavor: "Sin sabor", size: "300g", stock: 40, priceArs: 32499 }
    ]
  },
  {
    id: "preworkout-rush",
    name: "Pre-Workout Rush",
    category: "preworkout",
    description: "Energía y enfoque para tus sesiones más exigentes.",
    variants: [
      { id: "rush-frutos-450", flavor: "Frutos rojos", size: "450g", stock: 19, priceArs: 41999 }
    ]
  },
  {
    id: "combo-volumen",
    name: "Combo Volumen",
    category: "combo",
    description: "Whey + Creatina para fase de volumen.",
    variants: [
      { id: "combo-volumen-unico", flavor: "Mix", size: "Pack", stock: 10, priceArs: 79999 }
    ]
  }
];
