
import whiteFlourImage from "@/assets/white-flour-bakery.jpg";
import wholeWheatImage from "@/assets/whole-wheat-bakery.jpg";
import pastryImage from "@/assets/pastry-golden.jpg";
import wholeBreadImage from "@/assets/bread-wholegrain.jpg";

export type FlourType = "white" | "whole";

export type ProductUnit = "kg" | "10_pieces" | "piece";

export type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  halfPrice?: number;
  category: FlourType;
  unit: ProductUnit;
  image: string;
};

/* =========================
   Unit Labels
========================= */

export const unitLabel: Record<ProductUnit, string> = {
  kg: "كيلو",
  "10_pieces": "10 أرغفة",
  piece: "قطعة",
};

/* =========================
   White Flour Products
========================= */

const whiteProducts = [
  {
    slug: "قرص-طرية-سادة",
    name: "قرص طرية سادة",
    description: "قرص طرية خفيفة وطرية بطعم بيتي بسيط ومحبوب.",
    price: 180,
    halfPrice: 90,
    unit: "kg" as const,
  },
  {
    slug: "قرص-طرية-عجوة",
    name: "قرص طرية عجوة",
    description: "قرص طرية هشة بحشوة عجوة بطعم غني ومميز.",
    price: 220,
    halfPrice: 110,
    unit: "kg" as const,
  },
  {
    slug: "قرص-طرية-جبنة",
    name: "قرص طرية جبنة",
    description: "قرص طرية هشة ومحشية بالجبنة بطعم شهي.",
    price: 220,
    halfPrice: 110,
    unit: "kg" as const,
  },
  {
    slug: "ميني-بيتزا",
    name: "ميني بيتزا",
    description: "ميني بيتزا طرية ولذيذة، مناسبة للوجبات والسناكس.",
    price: 250,
    halfPrice: 125,
    unit: "kg" as const,
  },
  {
    slug: "فينو",
    name: "فينو",
    description: "عيش فينو طري وخفيف، مثالي للسندوتشات اليومية.",
    price: 70,
    unit: "10_pieces" as const,
  },
  {
    slug: "رقاق-طري",
    name: "رقاق طري",
    description: "رقاق طري خفيف بطعم بيتي وقوام مميز.",
    price: 170,
    halfPrice: 85,
    unit: "kg" as const,
  },
  {
    slug: "بوريك-محشي",
    name: "بوريك محشي",
    description: "بوريك هش ومحشي بحشوة لذيذة ومناسبة لكل الأوقات.",
    price: 200,
    halfPrice: 100,
    unit: "kg" as const,
  },
  {
    slug: "عيش-صاج",
    name: "عيش صاج",
    description: "عيش صاج خفيف ومرن، مناسب للسندوتشات والوجبات المختلفة.",
    price: 130,
    halfPrice: 65,
    unit: "kg" as const,
  },
  {
    slug: "سميط-تركي",
    name: "سميط تركي",
    description: "سميط تركي مقرمش من الخارج وطري من الداخل.",
    price: 20,
    unit: "piece" as const,
  },
  {
    slug: "خلية-نحل-كبير",
    name: "خلية نحل كبير",
    description: "خلية نحل كبيرة طرية ولذيذة، مناسبة للمشاركة.",
    price: 150,
    unit: "piece" as const,
  },
  {
    slug: "خلية-نحل-وسط",
    name: "خلية نحل وسط",
    description: "خلية نحل بحجم متوسط، طرية ولذيذة.",
    price: 120,
    unit: "piece" as const,
  },
  {
    slug: "خلية-نحل-صغيرة",
    name: "خلية نحل صغيرة",
    description: "خلية نحل صغيرة مناسبة للسناكس والتقديم الخفيف.",
    price: 100,
    unit: "piece" as const,
  },
];

/* =========================
   Whole Wheat Products
========================= */

const wholeProducts = [
  {
    slug: "عيش-اسمر",
    name: "العيش الأسمر",
    description: "عيش أسمر غني بطعم القمح، مناسب للاختيار اليومي.",
    price: 120,
    halfPrice: 60,
    unit: "kg" as const,
  },
  {
    slug: "قرص-طرية-سادة-كاملة",
    name: "قرص طرية سادة",
    description: "قرص طرية من الحبة الكاملة، خفيفة ومشبعة بطعم القمح.",
    price: 200,
    halfPrice: 100,
    unit: "kg" as const,
  },
  {
    slug: "قرص-طرية-عجوة-جبنة-كاملة",
    name: "قرص طرية عجوة - جبنة",
    description: "قرص طرية من الحبة الكاملة بحشوة عجوة وجبنة.",
    price: 220,
    halfPrice: 110,
    unit: "kg" as const,
  },
  {
    slug: "ميني-بيتزا-كاملة",
    name: "ميني بيتزا",
    description: "ميني بيتزا من الحبة الكاملة بطعم غني ومميز.",
    price: 300,
    halfPrice: 150,
    unit: "kg" as const,
  },
  {
    slug: "فينو-كامل",
    name: "فينو",
    description: "عيش فينو خفيف وطري مناسب للسندوتشات اليومية.",
    price: 70,
    unit: "10_pieces" as const,
  },
  {
    slug: "بوريك-محشي-كامل",
    name: "بوريك محشي",
    description: "بوريك من الحبة الكاملة بحشوة لذيذة وقوام هش.",
    price: 280,
    halfPrice: 140,
    unit: "kg" as const,
  },
  {
    slug: "تورتيلا-قمح",
    name: "تورتيلا قمح",
    description: "تورتيلا قمح مرنة وخفيفة، مناسبة للسندوتشات والوجبات.",
    price: 130,
    halfPrice: 65,
    unit: "kg" as const,
  },
  {
    slug: "تورتيلا-قمح-بالشوفان",
    name: "تورتيلا قمح بالشوفان",
    description: "تورتيلا قمح بالشوفان بطعم غني وقوام خفيف.",
    price: 150,
    halfPrice: 75,
    unit: "kg" as const,
  },
  {
    slug: "رقاق-طري-كامل",
    name: "رقاق طري",
    description: "رقاق طري من الحبة الكاملة بطعم القمح المميز.",
    price: 170,
    halfPrice: 85,
    unit: "kg" as const,
  },
  {
    slug: "بسكويت-كلاسيك",
    name: "بسكويت كلاسيك",
    description: "بسكويت كلاسيك مقرمش بطعم بسيط ومحبوب.",
    price: 200,
    halfPrice: 100,
    unit: "kg" as const,
  },
  {
    slug: "كوكيز-بالشوفان-والزبيب",
    name: "كوكيز بالشوفان والزبيب",
    description: "كوكيز بالشوفان والزبيب بطعم غني وقوام مميز.",
    price: 280,
    halfPrice: 140,
    unit: "kg" as const,
  },
  {
    slug: "مقرمشات-بالشوفان-والفلفل-المشوي",
    name: "مقرمشات بالشوفان والفلفل المشوي",
    description: "مقرمشات مالحة بالشوفان والفلفل المشوي بنكهة مميزة.",
    price: 250,
    halfPrice: 125,
    unit: "kg" as const,
  },
  {
    slug: "قراقيش-سادة",
    name: "قراقيش سادة",
    description: "قراقيش مقرمشة بطعم بيتي بسيط ومحبوب.",
    price: 200,
    halfPrice: 100,
    unit: "kg" as const,
  },
  {
    slug: "قراقيش-عجوة",
    name: "قراقيش عجوة",
    description: "قراقيش مقرمشة بحشوة عجوة بطعم غني ومميز.",
    price: 250,
    halfPrice: 125,
    unit: "kg" as const,
  },
  {
    slug: "كحك",
    name: "كحك",
    description: "كحك بطعم بيتي وقوام ناعم ومميز.",
    price: 450,
    halfPrice: 225,
    unit: "kg" as const,
  },
  {
    slug: "فطير-مشلتت",
    name: "فطير مشلتت",
    description: "فطير مشلتت مورّق بطبقات هشة وطعم بيتي أصيل.",
    price: 130,
    unit: "piece" as const,
  },
  {
    slug: "ميني-كرواسون-باتيه",
    name: "ميني كرواسون - باتيه",
    description: "ميني كرواسون وباتيه بطبقات هشة وطعم غني.",
    price: 300,
    halfPrice: 150,
    unit: "kg" as const,
  },
];

/* =========================
   All Products
========================= */

export const products: Product[] = [
  ...whiteProducts.map((product, index) => ({
    ...product,
    category: "white" as const,
    image:
      index === 1 ||
      index === 2 ||
      index === 3 ||
      index === 6 ||
      index === 8 ||
      index === 9 ||
      index === 10 ||
      index === 11
        ? pastryImage
        : whiteFlourImage,
  })),

  ...wholeProducts.map((product, index) => ({
    ...product,
    category: "whole" as const,
    image:
      index === 0 ||
      index === 1 ||
      index === 4 ||
      index === 8
        ? wholeBreadImage
        : index === 2 ||
            index === 3 ||
            index === 5 ||
            index === 10 ||
            index === 11 ||
            index === 12 ||
            index === 13 ||
            index === 14 ||
            index === 15 ||
            index === 16
          ? pastryImage
          : wholeWheatImage,
  })),
];

/* =========================
   Category Labels
========================= */

export const categoryLabel: Record<FlourType, string> = {
  white: "دقيق أبيض",
  whole: "دقيق حبة كاملة",
};

/* =========================
   WhatsApp
========================= */

export const WHATSAPP_NUMBER = "201026016100";

export function makeWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;
}

