"use client";

import React, { useState, useEffect, useRef } from "react";
import EditableImg from "@/@base/EditableImg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Image as ImageIcon, Upload, Check } from "lucide-react";
import { toast } from "sonner";
import { TOY_IMAGE_PRESETS, CATEGORY_LABEL_MAP, AGE_GROUP_LABEL_MAP, type ToyProductItem, type ToyCategory, type ToyAgeGroup, type StorefrontStatus } from "@/backend/types/ProductCatalogAdmin";
export interface ProductFormData {
  id?: string;
  sku: string;
  name: string;
  subtitle?: string;
  category: ToyCategory;
  ageGroup: ToyAgeGroup;
  price: number;
  originalPrice?: number;
  stock: number;
  reorderThreshold: number;
  storefrontStatus: StorefrontStatus;
  productImage: string;
  badge?: string;
  description?: string;
  longDescription?: string;
  highlights?: string[];
  materials?: string;
  safetyCertification?: string;
  dimensions?: string;
  boxIncludes?: string[];
  ratingAverage?: number;
  reviewsCount?: number;
}
export interface ProductModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  editingProduct: ToyProductItem | null;
}
export default function ProductModalDrawer({
  isOpen,
  onClose,
  onSave,
  editingProduct
}: ProductModalDrawerProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    sku: "TY-NEW-001",
    name: "",
    subtitle: "",
    category: "WOODEN_TOYS",
    ageGroup: "AGE_3_5",
    price: 29.99,
    originalPrice: 34.99,
    stock: 25,
    reorderThreshold: 10,
    storefrontStatus: "HIDDEN",
    productImage: TOY_IMAGE_PRESETS[0]?.url || "",
    badge: "New Arrival",
    materials: "FSC Certified Beechwood, Non-toxic water-based paint",
    safetyCertification: "ASTM F963 & EN71 certified",
    dimensions: "32cm x 24cm x 8cm",
    highlights: ["Handcrafted organic wood", "Enhances fine motor coordination", "Smooth rounded safety edges"],
    boxIncludes: ["Main toy chassis", "Magnetic accessories", "Activity guide book"],
    ratingAverage: 4.8,
    reviewsCount: 24,
    description: ""
  });
  const [, setCustomImagePreview] = useState<string | null>(null);
  const [highlightsInput, setHighlightsInput] = useState<string>("");
  const [boxIncludesInput, setBoxIncludesInput] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        id: editingProduct.id,
        sku: editingProduct.sku,
        name: editingProduct.name,
        subtitle: editingProduct.subtitle || "",
        category: editingProduct.category,
        ageGroup: editingProduct.ageGroup,
        price: editingProduct.price,
        originalPrice: editingProduct.originalPrice ?? undefined,
        stock: editingProduct.stock,
        reorderThreshold: editingProduct.reorderThreshold,
        storefrontStatus: editingProduct.storefrontStatus,
        productImage: editingProduct.productImage || TOY_IMAGE_PRESETS[0]?.url || "",
        badge: editingProduct.badge || "",
        materials: editingProduct.materials || "",
        safetyCertification: editingProduct.safetyCertification || "",
        dimensions: editingProduct.dimensions || "",
        highlights: editingProduct.highlights || [],
        boxIncludes: editingProduct.boxIncludes || [],
        ratingAverage: editingProduct.ratingAverage ?? 4.5,
        reviewsCount: editingProduct.reviewsCount ?? 0,
        description: editingProduct.description || ""
      });
      setCustomImagePreview(null);
      setHighlightsInput((editingProduct.highlights || []).join(", "));
      setBoxIncludesInput((editingProduct.boxIncludes || []).join(", "));
    } else {
      const randomSkuNum = Math.floor(100 + Math.random() * 900);
      setFormData({
        sku: `TY-GEN-${randomSkuNum}`,
        name: "",
        subtitle: "",
        category: "WOODEN_TOYS",
        ageGroup: "AGE_3_5",
        price: 34.99,
        originalPrice: 39.99,
        stock: 30,
        reorderThreshold: 10,
        storefrontStatus: "HIDDEN",
        productImage: TOY_IMAGE_PRESETS[0]?.url || "",
        badge: "New Arrival",
        materials: "Natural hardwood & organic cotton finishes",
        safetyCertification: "ASTM F963 & EN71 Toy Safety Standards",
        dimensions: "28cm x 18cm x 10cm",
        highlights: ["Tactile sensory exploration", "Eco-friendly non-toxic dyes"],
        boxIncludes: ["Toy assembly set", "Safety manual"],
        ratingAverage: 5.0,
        reviewsCount: 0,
        description: "Handcrafted natural wood toy designed to inspire creative developmental motor skills and spatial imagination."
      });
      setCustomImagePreview(null);
      setHighlightsInput("Tactile sensory exploration, Eco-friendly non-toxic dyes");
      setBoxIncludesInput("Toy assembly set, Safety manual");
    }
  }, [editingProduct, isOpen]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setCustomImagePreview(localUrl);
      setFormData(prev => ({
        ...prev,
        productImage: localUrl
      }));
      toast.success(`Image "${file.name}" loaded for preview`);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a valid toy name");
      return;
    }
    const parsedHighlights = highlightsInput.split(/[,;\n]/).map((s, index) => s.trim()).filter(Boolean);
    const parsedBoxIncludes = boxIncludesInput.split(/[,;\n]/).map((s, index) => s.trim()).filter(Boolean);
    onSave({
      ...formData,
      name: formData.name.trim(),
      sku: formData.sku.trim(),
      subtitle: formData.subtitle?.trim() || undefined,
      badge: formData.badge?.trim() || undefined,
      materials: formData.materials?.trim() || undefined,
      safetyCertification: formData.safetyCertification?.trim() || undefined,
      dimensions: formData.dimensions?.trim() || undefined,
      description: formData.description?.trim() || undefined,
      highlights: parsedHighlights,
      boxIncludes: parsedBoxIncludes
    });
  };
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='productmodaldrawer-r15d4f504dd5732a7-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
      <DialogContent key={editingProduct?.id || "new-toy"} className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-2xl rounded-2xl border border-border/50 shadow-md bg-card text-card-foreground p-6" data-api-unique-id='productmodaldrawer-rabd3c5ae6af8f24f-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
        <DialogHeader className="border-b border-border/70 pb-4" data-api-unique-id='productmodaldrawer-r5937a5fc6082fde2-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
          <div className="flex items-center gap-2.5" data-api-unique-id='productmodaldrawer-ra38f35ce6de8d93d-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <span className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center border border-border/50 shadow-sm" data-api-unique-id='productmodaldrawer-rfab6ee7e1142e36a-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <Sparkles className="w-4 h-4" data-api-unique-id='productmodaldrawer-r8cbe48b64fc35325-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </span>
            <div data-api-unique-id='productmodaldrawer-r8761af1b2db79799-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <DialogTitle className="font-display font-bold text-xl text-card-foreground" data-api-unique-id='productmodaldrawer-r088f4b9589221454-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                {editingProduct ? "Edit Toy Product Record" : "Add New Toy to Catalog"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5" data-api-unique-id='productmodaldrawer-r8536144b512ea7fc-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                {editingProduct ? `Update catalog specifications, pricing and inventory levels for ${editingProduct.sku}` : "Fill out product details to stage or publish a new toy onto the storefront."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 py-2" data-api-unique-id='productmodaldrawer-r9c96bcf3f93a480d-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
          {/* Toy Name & SKU Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" data-api-unique-id='productmodaldrawer-re57a8c80d3347f98-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <div className="sm:col-span-2 flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r352e7ce58c6eaf12-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-rc967ed2fc273ce34-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Toy Product Name <span className="text-destructive" data-api-unique-id='productmodaldrawer-r1b43e322bb6465da-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>*</span>
              </label>
              <input type="text" required placeholder="e.g. Montessori Rainbow Wooden Arch Stacker" value={formData.name} onChange={e => setFormData(prev => ({
              ...prev,
              name: e.target.value
            }))} className="h-10 px-3.5 rounded-xl border border-border/50 bg-background text-foreground text-sm font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r9db698cd03665f3e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>

            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r005015f3b92d2c0e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r157674860d66b4c7-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                SKU Identifier <span className="text-destructive" data-api-unique-id='productmodaldrawer-re61b4e1bac0bf63e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>*</span>
              </label>
              <input type="text" required placeholder="TY-WOD-001" value={formData.sku} onChange={e => setFormData(prev => ({
              ...prev,
              sku: e.target.value
            }))} className="h-10 px-3 rounded-xl border border-border/50 bg-background text-foreground text-sm font-mono font-bold focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r83e76e193343f62e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>
          </div>

          {/* Subtitle & Badge row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-api-unique-id='productmodaldrawer-r771d2ae9ddc5e6ff-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r663cb014790585e9-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r8ab5e984acde1fac-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Marketing Subtitle
              </label>
              <input type="text" placeholder="e.g. 12-Piece Handcrafted Beechwood Rainbow" value={formData.subtitle || ""} onChange={e => setFormData(prev => ({
              ...prev,
              subtitle: e.target.value
            }))} className="h-10 px-3.5 rounded-xl border border-border/50 bg-background text-foreground text-sm font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r3055f0202fa88ecd-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>

            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r9a97fc950d2b038e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r203057b72edf614e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Storefront Badge
              </label>
              <input type="text" placeholder="e.g. Best Seller / Staff Pick" value={formData.badge || ""} onChange={e => setFormData(prev => ({
              ...prev,
              badge: e.target.value
            }))} className="h-10 px-3.5 rounded-xl border border-border/50 bg-background text-foreground text-sm font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r4f152ccd93bbc4e4-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>
          </div>

          {/* Category & Target Age Group row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-api-unique-id='productmodaldrawer-r89cea16ceb301508-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-re79dc2b9ec2505ef-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r4ea14575697d3f33-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Workshop Category
              </label>
              <Select value={formData.category} onValueChange={val => setFormData(prev => ({
              ...prev,
              category: val as ToyCategory
            }))} data-api-unique-id='productmodaldrawer-rc4b818e5cae8445b-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                <SelectTrigger className="h-10 rounded-xl border border-border/50 bg-background text-sm font-medium" data-api-unique-id='productmodaldrawer-recf68f77774957da-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                  <SelectValue placeholder="Select category" data-api-unique-id='productmodaldrawer-rf0730d53511663d6-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                    {CATEGORY_LABEL_MAP[formData.category] || formData.category}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent data-api-unique-id='productmodaldrawer-r6caff4eff2e364f7-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                  {(Object.keys(CATEGORY_LABEL_MAP) as ToyCategory[]).map((cat, index) => <SelectItem key={cat} value={cat} className="text-xs" data-api-unique-id='productmodaldrawer-r0788032b6fa7365e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' data-api-in-loop='1'>
                      {CATEGORY_LABEL_MAP[cat]}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r2b1db8b7b7c0b09c-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r40da00631a12e14b-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Target Age Group
              </label>
              <Select value={formData.ageGroup} onValueChange={val => setFormData(prev => ({
              ...prev,
              ageGroup: val as ToyAgeGroup
            }))} data-api-unique-id='productmodaldrawer-r782dbb29b70a0833-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                <SelectTrigger className="h-10 rounded-xl border border-border/50 bg-background text-sm font-medium" data-api-unique-id='productmodaldrawer-rb1e06f378ac9a465-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                  <SelectValue placeholder="Select age group" data-api-unique-id='productmodaldrawer-rf70e7cc10baa3740-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                    {AGE_GROUP_LABEL_MAP[formData.ageGroup] || formData.ageGroup}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent data-api-unique-id='productmodaldrawer-ree39db7a457654b8-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                  {(Object.keys(AGE_GROUP_LABEL_MAP) as ToyAgeGroup[]).map((age, index) => <SelectItem key={age} value={age} className="text-xs" data-api-unique-id='productmodaldrawer-r9d53fb2e15fe0a3a-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' data-api-in-loop='1'>
                      {AGE_GROUP_LABEL_MAP[age]}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing, Stock & Threshold row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" data-api-unique-id='productmodaldrawer-rddf8a522d5af3596-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            {/* Unit Price */}
            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-rfc401dc085fbcd06-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-rb77be620e06cd76f-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Unit Price ($) <span className="text-destructive" data-api-unique-id='productmodaldrawer-r499d2dfc5139ff18-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>*</span>
              </label>
              <div className="relative" data-api-unique-id='productmodaldrawer-r11e987e084101882-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground" data-api-unique-id='productmodaldrawer-r050d5571dd10939d-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                  $
                </span>
                <input type="number" step="0.01" min="0.99" max="999.99" required value={formData.price} onChange={e => setFormData(prev => ({
                ...prev,
                price: parseFloat(e.target.value) || 0
              }))} className="w-full h-10 pl-7 pr-3 rounded-xl border border-border/50 bg-background text-foreground text-sm font-mono font-bold focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r5006e2adc59c0499-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
              </div>
            </div>

            {/* Original Price */}
            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r583f38cadff9c61f-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r5c04ce8c066a7587-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Original Price ($)
              </label>
              <div className="relative" data-api-unique-id='productmodaldrawer-rc175f289d8993ae5-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground" data-api-unique-id='productmodaldrawer-rf2520955ee5629c6-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                  $
                </span>
                <input type="number" step="0.01" min="0" max="999.99" value={formData.originalPrice ?? ""} onChange={e => setFormData(prev => ({
                ...prev,
                originalPrice: e.target.value ? parseFloat(e.target.value) : undefined
              }))} className="w-full h-10 pl-7 pr-3 rounded-xl border border-border/50 bg-background text-foreground text-sm font-mono font-bold focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r434a73ad5786451f-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
              </div>
            </div>

            {/* Current Stock */}
            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r044566517da7bd6a-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r843b7f4979dbc210-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Current Stock <span className="text-destructive" data-api-unique-id='productmodaldrawer-r54891a73ff842ed3-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>*</span>
              </label>
              <input type="number" min="0" max="9999" required value={formData.stock} onChange={e => setFormData(prev => ({
              ...prev,
              stock: parseInt(e.target.value, 10) || 0
            }))} className="w-full h-10 px-3 rounded-xl border border-border/50 bg-background text-foreground text-sm font-mono font-bold focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r89f0c93571b9425f-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>

            {/* Reorder Threshold */}
            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-raabdf76a1e64a866-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-rc590a99538bdff7c-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Reorder Floor <span className="text-destructive" data-api-unique-id='productmodaldrawer-r7b5db9659a872497-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>*</span>
              </label>
              <input type="number" min="1" max="500" required value={formData.reorderThreshold} onChange={e => setFormData(prev => ({
              ...prev,
              reorderThreshold: parseInt(e.target.value, 10) || 1
            }))} className="w-full h-10 px-3 rounded-xl border border-border/50 bg-background text-foreground text-sm font-mono font-bold focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-ra45b92f144f42d0c-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>
          </div>

          {/* Image Asset Selection (Gallery Presets + File Upload) */}
          <div className="flex flex-col gap-2" data-api-unique-id='productmodaldrawer-r8de7005a9f46c2d8-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <div className="flex items-center justify-between" data-api-unique-id='productmodaldrawer-r8d1fb1d183eacedf-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground flex items-center gap-1.5" data-api-unique-id='productmodaldrawer-r4fd006eaeca1ea83-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                <ImageIcon className="w-3.5 h-3.5 text-primary" data-api-unique-id='productmodaldrawer-r9c5be1536774673a-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
                <span data-api-unique-id='productmodaldrawer-r710d84cbec5df001-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>Product Image Asset Selection</span>
              </label>
              <span className="text-[11px] text-muted-foreground font-normal" data-api-unique-id='productmodaldrawer-r85fdf3592b12ebd4-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Choose preset or upload custom photo
              </span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-2 rounded-xl border border-border/50 bg-muted/40 max-h-[120px] overflow-y-auto" data-api-unique-id='productmodaldrawer-ra12720658bfd5b91-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              {TOY_IMAGE_PRESETS.map((img, index) => {
              const isSelected = formData.productImage === img.url;
              return <button key={img.id} type="button" onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  productImage: img.url
                }));
                setCustomImagePreview(null);
              }} className={`relative rounded-lg overflow-hidden border aspect-square transition-all ${isSelected ? "border-primary shadow-sm scale-[1.03]" : "border-border/80 hover:border-border opacity-75 hover:opacity-100"}`} title={img.label} data-api-unique-id='productmodaldrawer-r3e09d3b6ee298d41-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' data-api-in-loop='1'>
                    <EditableImg propKey={`preset-thumb-${img.id}`} src={img.url} alt={img.label} className="w-full h-full object-cover" data-api-unique-id='productmodaldrawer-r331717f4097ba807-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' data-api-in-loop='1' />
                    {isSelected && <div className="absolute inset-0 bg-primary/25 flex items-center justify-center" data-api-unique-id='productmodaldrawer-rf43c926e89b68e46-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' data-api-in-loop='1'>
                        <Check className="w-3.5 h-3.5 text-primary-foreground stroke-[3]" data-api-unique-id='productmodaldrawer-radf0ae096aecbb8a-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' data-api-in-loop='1' />
                      </div>}
                  </button>;
            })}
            </div>

            {/* Custom file upload dropzone */}
            <div onClick={() => fileInputRef.current?.click()} className="flex items-center justify-between p-3 rounded-xl border border-dashed border-border bg-background hover:bg-muted/40 cursor-pointer transition-all" data-api-unique-id='productmodaldrawer-r49465f77e56767ab-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <div className="flex items-center gap-3 min-w-0" data-api-unique-id='productmodaldrawer-r7a130625a69b0787-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                <div className="w-9 h-9 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 border border-border" data-api-unique-id='productmodaldrawer-r05a689836906280b-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                  <Upload className="w-4 h-4" data-api-unique-id='productmodaldrawer-rfdbe4e087453849d-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
                </div>
                <div className="min-w-0" data-api-unique-id='productmodaldrawer-r89b2713179baa018-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                  <span className="text-xs font-bold text-card-foreground block" data-api-unique-id='productmodaldrawer-r860262af4795a2f3-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                    Upload Local Toy Photograph
                  </span>
                  <span className="text-[11px] text-muted-foreground truncate block" data-api-unique-id='productmodaldrawer-r21e7444611c70072-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                    PNG, JPG, WEBP up to 5MB
                  </span>
                </div>
              </div>
              <button type="button" className="px-3 py-1.5 rounded-full text-xs font-bold bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground border border-border shrink-0" data-api-unique-id='productmodaldrawer-ra4086ac56af60209-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Browse File
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} data-api-unique-id='productmodaldrawer-r6bf274a12b567f1a-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>
          </div>

          {/* Specifications: Materials, Safety, Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" data-api-unique-id='productmodaldrawer-r90c29a6bee1e44c6-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r04550712769cc89e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-refc7fb9bfbd38f72-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Materials
              </label>
              <input type="text" placeholder="Beechwood, Organic Cotton..." value={formData.materials || ""} onChange={e => setFormData(prev => ({
              ...prev,
              materials: e.target.value
            }))} className="h-9 px-3 rounded-xl border border-border/50 bg-background text-foreground text-xs font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r5ce370dbf1737db6-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>

            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-rf5a6f9daf9198512-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r180702402e805264-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Safety Standards
              </label>
              <input type="text" placeholder="ASTM F963 & EN71..." value={formData.safetyCertification || ""} onChange={e => setFormData(prev => ({
              ...prev,
              safetyCertification: e.target.value
            }))} className="h-9 px-3 rounded-xl border border-border/50 bg-background text-foreground text-xs font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-red0ac69d16159c48-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>

            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r6f9bf42739191543-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r7ba2c4c6d970131f-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Dimensions
              </label>
              <input type="text" placeholder="30cm x 20cm x 10cm" value={formData.dimensions || ""} onChange={e => setFormData(prev => ({
              ...prev,
              dimensions: e.target.value
            }))} className="h-9 px-3 rounded-xl border border-border/50 bg-background text-foreground text-xs font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r2d39039e7cb0cab8-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>
          </div>

          {/* Highlights & Box Includes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-api-unique-id='productmodaldrawer-rdf88f1b3f0e504f0-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r814e8771b8250367-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r09d538eb89e5cd8a-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Key Highlights (Comma separated)
              </label>
              <input type="text" placeholder="Tactile exploration, Non-toxic dyes..." value={highlightsInput} onChange={e => setHighlightsInput(e.target.value)} className="h-9 px-3 rounded-xl border border-border/50 bg-background text-foreground text-xs font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r7050ef8a39b61104-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>

            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r5d7d8d47deb43484-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r42b637827688a15f-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Box Includes (Comma separated)
              </label>
              <input type="text" placeholder="Toy chassis, Activity guide..." value={boxIncludesInput} onChange={e => setBoxIncludesInput(e.target.value)} className="h-9 px-3 rounded-xl border border-border/50 bg-background text-foreground text-xs font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-reb99e102ce3db202-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>
          </div>

          {/* Rating Snapshot & Review Count (Admin-maintained storefront snapshots) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-api-unique-id='productmodaldrawer-r27bfc7cd82e21a2e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-rb106179a1d9ffeb5-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r3690217cf288ff1c-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Rating Average Snapshot (0.0 - 5.0)
              </label>
              <input type="number" step="0.1" min="0" max="5.0" placeholder="4.8" value={formData.ratingAverage ?? ""} onChange={e => setFormData(prev => ({
              ...prev,
              ratingAverage: e.target.value ? parseFloat(e.target.value) : undefined
            }))} className="h-9 px-3 rounded-xl border border-border/50 bg-background text-foreground text-xs font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r14c3bc93c4b0447e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>

            <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r8813ee1b25bd9b5e-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r13c3f956d7716198-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Reviews Count Snapshot
              </label>
              <input type="number" min="0" placeholder="24" value={formData.reviewsCount ?? ""} onChange={e => setFormData(prev => ({
              ...prev,
              reviewsCount: e.target.value ? parseInt(e.target.value, 10) : undefined
            }))} className="h-9 px-3 rounded-xl border border-border/50 bg-background text-foreground text-xs font-medium focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r80169c615a85b0e2-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </div>
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-1.5" data-api-unique-id='productmodaldrawer-r03f57b9c6990b1c3-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <label className="text-xs font-bold text-card-foreground" data-api-unique-id='productmodaldrawer-r72f681ddeda01cd0-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              Storefront Description &amp; Safety Note
            </label>
            <textarea rows={2} placeholder="e.g. Tested for baby-safe non-toxic finishes. Recommended for tactile exploration..." value={formData.description || ""} onChange={e => setFormData(prev => ({
            ...prev,
            description: e.target.value
          }))} className="p-3 rounded-xl border border-border/50 bg-background text-foreground text-xs leading-relaxed focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='productmodaldrawer-r0721cce8845a8d19-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
          </div>

          {/* Storefront Visibility Switch */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/50 bg-secondary/50" data-api-unique-id='productmodaldrawer-ra5339024c525241a-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <div className="flex flex-col" data-api-unique-id='productmodaldrawer-refa03c9c472891d8-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <span className="text-xs font-bold text-secondary-foreground" data-api-unique-id='productmodaldrawer-r248418c08f0ced90-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                Publish Immediately to Storefront (LIVE)
              </span>
              <span className="text-[11px] text-muted-foreground" data-api-unique-id='productmodaldrawer-re60d483f8019f8d9-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
                When enabled, toy is visible to shoppers and available for checkout.
              </span>
            </div>
            <button type="button" onClick={() => setFormData(prev => ({
            ...prev,
            storefrontStatus: prev.storefrontStatus === "LIVE" ? "HIDDEN" : "LIVE"
          }))} className={`w-12 h-7 rounded-full p-1 border border-border/50 transition-colors ${formData.storefrontStatus === "LIVE" ? "bg-success" : "bg-muted"}`} data-api-unique-id='productmodaldrawer-r4b880a94757820e7-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              <div className={`w-4 h-4 rounded-full bg-background border border-border/50 shadow-sm transition-transform ${formData.storefrontStatus === "LIVE" ? "translate-x-5" : "translate-x-0"}`} data-api-unique-id='productmodaldrawer-rbffcd52d0e0fb470-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer' />
            </button>
          </div>

          <DialogFooter className="pt-3 border-t border-border/70 flex flex-row items-center justify-end gap-2" data-api-unique-id='productmodaldrawer-rdbeeb19c00fc3d8d-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full text-xs font-bold text-muted-foreground hover:bg-muted hover:text-foreground border border-border transition-all" data-api-unique-id='productmodaldrawer-r1394c536ad5a5f54-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-full text-xs font-bold bg-primary text-primary-foreground border border-border/50 shadow-sm hover:shadow-md transition-all" data-api-unique-id='productmodaldrawer-ra362f0554ff3b0b4-s2981830087' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductModalDrawer'>
              {editingProduct ? "Save Product Changes" : "Confirm & Stage Toy"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>;
}