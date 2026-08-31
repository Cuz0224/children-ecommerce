export type ToyCategory =
  | "WOODEN_TOYS"
  | "STEM_MAKER"
  | "INFANT_PLUSH"
  | "CREATIVE_BUILDING"
  | "PRETEND_PLAY"
  | "ART_CRAFT"
  | "LEARNING"
  | "OUTDOOR"
  | "PLUSH";

export type ToyAgeGroup =
  | "AGE_0_2"
  | "AGE_3_5"
  | "AGE_6_8"
  | "AGE_8_PLUS"
  | "AGE_9_PLUS";

export type StorefrontStatus = "HIDDEN" | "LIVE" | "REMOVED";

export interface ToyProductItem {
  id: string; // data-from: ToyProduct-id
  sku: string; // data-from: ToyProduct-sku
  name: string; // data-from: ToyProduct-name
  subtitle: string | null; // data-from: ToyProduct-subtitle
  category: ToyCategory; // data-from: ToyProduct-category
  ageGroup: ToyAgeGroup; // data-from: ToyProduct-ageGroup
  price: number; // data-from: ToyProduct-unitPrice
  originalPrice: number | null; // data-from: ToyProduct-originalPrice
  stock: number; // data-from: ToyProduct-stockCount
  reorderThreshold: number; // data-from: ToyProduct-reorderThreshold
  storefrontStatus: StorefrontStatus; // data-from: ToyProduct-storefrontStatus
  productImage: string | null; // data-from: ToyProduct-productImage data-role: image_url
  badge: string | null; // data-from: ToyProduct-badge
  description: string | null; // data-from: ToyProduct-description
  longDescription: string | null; // data-from: ToyProduct-longDescription
  highlights: string[]; // data-from: ToyProduct-highlights
  materials: string | null; // data-from: ToyProduct-materials
  safetyCertification: string | null; // data-from: ToyProduct-safetyCertification
  dimensions: string | null; // data-from: ToyProduct-dimensions
  boxIncludes: string[]; // data-from: ToyProduct-boxIncludes
  ratingAverage: number | null; // data-from: ToyProduct-ratingAverage
  reviewsCount: number | null; // data-from: ToyProduct-reviewsCount
  monthlySales: number;
  lowStockAlert: boolean;
  createdAt: Date; // data-from: ToyProduct-createdAt
  updatedAt: Date; // data-from: ToyProduct-updatedAt
}

export interface CatalogMetrics {
  totalProducts: number;
  activeStorefront: number;
  hiddenDrafts: number;
  lowStockAlerts: number;
  totalInventoryUnits: number;
  storefrontLiveRate: number;
}

export type SortField = "name" | "price" | "stock" | "sales" | "rating";
export type SortOrder = "asc" | "desc";

export interface FilterState {
  searchQuery: string;
  category: string;
  visibility: "ALL" | "LIVE" | "HIDDEN" | "REMOVED";
  ageGroup: string;
  sortField: SortField;
  sortOrder: SortOrder;
}

export interface CreateToyProductInput {
  sku: string;
  name: string;
  subtitle?: string | null;
  category: ToyCategory;
  ageGroup: ToyAgeGroup;
  unitPrice: number;
  originalPrice?: number | null;
  stockCount: number;
  reorderThreshold: number;
  storefrontStatus?: StorefrontStatus;
  productImage?: string | null;
  badge?: string | null;
  description?: string | null;
  longDescription?: string | null;
  highlights: string[];
  materials?: string | null;
  safetyCertification?: string | null;
  dimensions?: string | null;
  boxIncludes: string[];
  ratingAverage?: number | null;
  reviewsCount?: number | null;
}

export interface UpdateToyProductInput {
  id: string;
  sku: string;
  name: string;
  subtitle?: string | null;
  category: ToyCategory;
  ageGroup: ToyAgeGroup;
  unitPrice: number;
  originalPrice?: number | null;
  stockCount: number;
  reorderThreshold: number;
  storefrontStatus: StorefrontStatus;
  productImage?: string | null;
  badge?: string | null;
  description?: string | null;
  longDescription?: string | null;
  highlights: string[];
  materials?: string | null;
  safetyCertification?: string | null;
  dimensions?: string | null;
  boxIncludes: string[];
  ratingAverage?: number | null;
  reviewsCount?: number | null;
}

export interface QuickRestockInput {
  productId: string;
  quantity: number;
}

export interface SetProductStatusInput {
  productId: string;
  status: StorefrontStatus;
}

export interface BatchSetStatusInput {
  productIds: string[];
  status: StorefrontStatus;
}

export interface RemoveProductInput {
  productId: string;
}

export interface GetCatalogOverviewOutput {
  products: ToyProductItem[];
  metrics: CatalogMetrics;
}

export const CATEGORY_LABEL_MAP: Record<ToyCategory, string> = {
  WOODEN_TOYS: "Wooden Toys",
  STEM_MAKER: "STEM & Maker",
  INFANT_PLUSH: "Infant & Plush",
  CREATIVE_BUILDING: "Creative Building",
  PRETEND_PLAY: "Pretend Play",
  ART_CRAFT: "Art & Craft",
  LEARNING: "Learning & Brain",
  OUTDOOR: "Outdoor Active",
  PLUSH: "Plush Buddies",
};

export const AGE_GROUP_LABEL_MAP: Record<ToyAgeGroup, string> = {
  AGE_0_2: "0-2Y (0-2 yrs)",
  AGE_3_5: "3-5Y (3-5 yrs)",
  AGE_6_8: "6-8Y (6-8 yrs)",
  AGE_8_PLUS: "8Y+ (8+ yrs)",
  AGE_9_PLUS: "9+ (9+ yrs)",
};

export const TOY_IMAGE_PRESETS: { id: string; label: string; url: string }[] = [
  {
    id: "toy-wooden-train",
    label: "Wooden Train Set",
    url: "https://www.autocoder.cc/background/zaki_dev/generated/d2d76272fce144619444e41aa397968e.png",
  },
  {
    id: "toy-robot-kit",
    label: "Solar Robot Builder",
    url: "https://www.autocoder.cc/background/zaki_pre/generated/252a02fee96b47d6b5216120979d3053.png",
  },
  {
    id: "toy-soft-bunny",
    label: "Plush Bunny Toy",
    url: "https://www.autocoder.cc/background/zaki_pre/generated/f327b47d48ed46c3aa49b1287aeda3f7.png",
  },
  {
    id: "toy-rainbow-stacker",
    label: "Rainbow Arch Stacker",
    url: "https://www.autocoder.cc/background/zaki_pre/generated/e817d4d79ef94c84b60edae60b2926cd.png",
  },
  {
    id: "toy-dino-excavator",
    label: "Dino Excavation Lab",
    url: "https://www.autocoder.cc/background/zaki_pre/generated/282c91533e974c16bf4d0201050967e4.png",
  },
  {
    id: "toy-magnetic-tiles",
    label: "Magnetic 3D Tiles",
    url: "https://www.autocoder.cc/background/zaki_pre/generated/3c6a3c1ad1b847dca684204e75df1655.png",
  },
  {
    id: "toy-play-kitchen",
    label: "Wooden Play Kitchen",
    url: "https://www.autocoder.cc/background/zaki_pre/generated/46d4a3abd5e443228367a9e2bbf7aa39.png",
  },
  {
    id: "toy-astronomy-telescope",
    label: "Kids Telescope",
    url: "https://www.autocoder.cc/background/zaki_pre/generated/d68ee5a290ca4d09bf54fd0d1570ebb6.png",
  },
  {
    id: "toy-plush-dragon",
    label: "Winged Dragon Plush",
    url: "https://www.autocoder.cc/background/zaki_pre/generated/7e750ee205ea40538085a3bbaa554cdb.png",
  },
  {
    id: "toy-origami-craft",
    label: "Origami Animal Kit",
    url: "https://www.autocoder.cc/background/zaki_pre/generated/00917dbf7dc74f68b2d9d2b8b6a4ebe5.png",
  },
];