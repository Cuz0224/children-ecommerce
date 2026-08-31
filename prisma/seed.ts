import { PrismaClient, Prisma } from "@prisma/client";
import { hashPassword } from "../src/@base/BaseActionFun";
const customerSeedPassword = process.env.SEED_CUSTOMER_PASSWORD || `demo-${Math.random().toString(36).slice(2)}-customer`;
const adminSeedPassword = process.env.SEED_ADMIN_PASSWORD || `demo-${Math.random().toString(36).slice(2)}-admin`;

// SQLite stores the former Prisma enum fields as strings. Keep these constants
// so the seed data remains readable and compatible with the action contracts.
const AccountRole = { CUSTOMER: "CUSTOMER", ADMIN: "ADMIN" } as const;
const CartStatus = { ACTIVE: "ACTIVE", CHECKED_OUT: "CHECKED_OUT" } as const;
const DiscountType = { PERCENT: "PERCENT", FIXED_AMOUNT: "FIXED_AMOUNT" } as const;
const OrderStatus = { COMPLETED: "COMPLETED" } as const;
const StorefrontStatus = { HIDDEN: "HIDDEN", LIVE: "LIVE", REMOVED: "REMOVED" } as const;
const ToyAgeGroup = { AGE_0_2: "AGE_0_2", AGE_3_5: "AGE_3_5", AGE_6_8: "AGE_6_8", AGE_8_PLUS: "AGE_8_PLUS", AGE_9_PLUS: "AGE_9_PLUS" } as const;
const ToyCategory = { WOODEN_TOYS: "WOODEN_TOYS", STEM_MAKER: "STEM_MAKER", INFANT_PLUSH: "INFANT_PLUSH", CREATIVE_BUILDING: "CREATIVE_BUILDING", PRETEND_PLAY: "PRETEND_PLAY", ART_CRAFT: "ART_CRAFT", LEARNING: "LEARNING", OUTDOOR: "OUTDOOR", PLUSH: "PLUSH" } as const;

const prisma = new PrismaClient();
type SeedEntity = Record<string, unknown>;
type RelationBinding = { target_entity_key: string; local_fields: readonly string[]; target_fields: readonly string[] };

const accountUserRecords = [
  { entityKey: "AccountUser:account_user_customer", data: {
      id: "a0953f8a-04c6-42d8-abf0-0235eb9b9085",
      createdAt: new Date("2026-08-01T10:00:00.000Z"),
      passwordHash: hashPassword(customerSeedPassword),
      role: AccountRole.CUSTOMER,
      username: "sarah_toylover"
    }, relations: [] },
  { entityKey: "AccountUser:account_user_admin", data: {
      id: "18b18797-37fc-4313-a8db-3ad8c70b9303",
      createdAt: new Date("2026-07-15T08:00:00.000Z"),
      passwordHash: hashPassword(adminSeedPassword),
      role: AccountRole.ADMIN,
      username: "clara_admin"
    }, relations: [] },
] as const;

const toyProductRecords = [
  { entityKey: "ToyProduct:toy-plush-bunny", data: {
      id: "94754ff9-8c05-40b9-a81d-8555b1bc942b",
      ageGroup: ToyAgeGroup.AGE_0_2,
      badge: "Bestseller",
      boxIncludes: ["1x Rainbow Bunny Plush", "1x Adoption Certificate Card"] as Prisma.InputJsonValue,
      category: ToyCategory.PLUSH,
      createdAt: new Date("2026-03-15T08:30:00.000Z"),
      description: "Cloud-soft hypoallergenic organic cotton bunny with floppy ears and pastel rainbow tummy.",
      dimensions: "12 in x 6 in x 4.5 in",
      highlights: ["100% Organic certified hypoallergenic plush velour", "Embroidered facial features with zero choking hazards", "Machine washable with reinforced double-stitched seams"] as Prisma.InputJsonValue,
      longDescription: "Crafted with baby-safe embroidered eyes and super-fluffy organic cotton velour. Perfectly sized for warm hugs, naptime companionship, and nursery styling. Machine washable and rigorously tested for sensitive skin.",
      materials: "Organic Cotton Velour, Recycled Polyfill",
      name: "Huggable Rainbow Pastel Bunny Rabbit Stuffed Animal Plush",
      originalPrice: new Prisma.Decimal("29.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/f327b47d48ed46c3aa49b1287aeda3f7.png",
      ratingAverage: new Prisma.Decimal("4.9"),
      reorderThreshold: 5,
      reviewsCount: 142,
      safetyCertification: "EU EN71 & ASTM F963-23 Certified",
      sku: "TOY-PLUSH-001",
      stockCount: 18,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Ultra-soft premium cotton plush companion",
      unitPrice: new Prisma.Decimal("24.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-stem-robot", data: {
      id: "e8a87451-7e55-4c99-a277-5d6ecb7a08fd",
      ageGroup: ToyAgeGroup.AGE_6_8,
      badge: "Top STEM",
      boxIncludes: ["190x Modular Building Parts", "1x High-efficiency Solar Panel", "1x Illustrated Guidebook"] as Prisma.InputJsonValue,
      category: ToyCategory.STEM_MAKER,
      createdAt: new Date("2026-03-18T10:00:00.000Z"),
      description: "Hands-on engineering kit that transforms into 12 distinct walking, crawling, and rolling solar robots.",
      dimensions: "Box: 11 in x 8 in x 3 in",
      highlights: ["12 alternate robot designs from land crawlers to water floaters", "Real working solar panel gearbox included", "Step-by-step full-color illustrated assembly manual"] as Prisma.InputJsonValue,
      longDescription: "Empower your young scientist with green energy principles! This comprehensive 190-piece STEM kit operates completely on real sunlight or halogen lamp light without requiring disposable batteries. Fosters spatial reasoning and problem-solving.",
      materials: "BPA-Free High Impact ABS Plastic",
      name: "Solar Powered Explorer Robot 12-in-1 STEM Building Kit",
      originalPrice: new Prisma.Decimal("49.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/c5b91d66a1464945a40882068065befa.png",
      ratingAverage: new Prisma.Decimal("4.8"),
      reorderThreshold: 5,
      reviewsCount: 98,
      safetyCertification: "ASTM F963, CPSIA & CE Certified",
      sku: "TOY-STEM-002",
      stockCount: 12,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Eco-friendly solar powered engineering kit",
      unitPrice: new Prisma.Decimal("39.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-wooden-blocks", data: {
      id: "0ffbf2d2-aadb-4ffa-aec2-a5065724d6fd",
      ageGroup: ToyAgeGroup.AGE_3_5,
      badge: "Eco-Friendly",
      boxIncludes: ["16x Carved Wooden Animal & Stone Blocks", "1x Organic Cotton Drawstring Bag"] as Prisma.InputJsonValue,
      category: ToyCategory.LEARNING,
      createdAt: new Date("2026-03-20T11:15:00.000Z"),
      description: "Hand-painted natural beechwood balancing stones and cartoon woodland creature figurines.",
      dimensions: "16 Piece Assorted Sizes (1.5 in to 3.5 in)",
      highlights: ["FSC-Certified sustainably harvested European beechwood", "Non-toxic water-based food-grade vibrant stains", "Develops tactile coordination, balance intuition, and grip strength"] as Prisma.InputJsonValue,
      longDescription: "Inspire patience, fine motor dexterity, and architectural creativity. Each piece is hand-sanded to velvety smoothness and coated with child-safe water-based non-toxic stains. Includes storage canvas tote.",
      materials: "Solid Natural Beechwood, Water-Based Non-toxic Paint",
      name: "Forest Animal Balancing & Stacking Wooden Blocks Set",
      originalPrice: new Prisma.Decimal("34.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/c447fb56f5fb4e0084abe4e87b38d79f.png",
      ratingAverage: new Prisma.Decimal("4.9"),
      reorderThreshold: 6,
      reviewsCount: 76,
      safetyCertification: "EU CE & EN71-3 Safe Paint Testing",
      sku: "TOY-LEARN-003",
      stockCount: 22,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Sustainable beechwood tactile balancing puzzle",
      unitPrice: new Prisma.Decimal("29.5")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-magnetic-tiles", data: {
      id: "ad9d6c61-487e-41a1-a71c-30adee9db312",
      ageGroup: ToyAgeGroup.AGE_3_5,
      badge: "Popular",
      boxIncludes: ["100x Magnetic Geometric Tiles", "1x Idea Booklet", "1x Storage Tote"] as Prisma.InputJsonValue,
      category: ToyCategory.CREATIVE_BUILDING,
      createdAt: new Date("2026-03-22T09:40:00.000Z"),
      description: "Vibrant translucent magnetic tiles for constructing glowing 3D castles, towers, and geometry shapes.",
      dimensions: "Box: 14 in x 10 in x 4 in",
      highlights: ["100 pieces including windows, arches, triangles, and baseplates", "Ultrasonic rivet construction prevents magnet detachment", "Fully compatible with major magnetic tile brands"] as Prisma.InputJsonValue,
      longDescription: "Heavy-duty ultrasonic welded magnetic pieces with rounded corners and strong neodymium magnets. Captures daylight for luminous prism effects while introducing early geometry, spatial structures, and collaborative free play.",
      materials: "Food-Grade ABS Plastic, Nickel-Plated Rare Earth Magnets",
      name: "3D Crystal Geometric Magnetic Building Tiles 100-Piece Set",
      originalPrice: new Prisma.Decimal("58"),
      productImage: "https://www.autocoder.cc/background/zaki_test/generated/17d3eefac353482abb2e1212a2f91a58.png",
      ratingAverage: new Prisma.Decimal("4.9"),
      reorderThreshold: 8,
      reviewsCount: 115,
      safetyCertification: "ASTM F963 & EN71 Magnet Safety Standard",
      sku: "TOY-BUILD-004",
      stockCount: 35,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Translucent magnetic architecture discovery pack",
      unitPrice: new Prisma.Decimal("48")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-sensory-dino", data: {
      id: "4cbfbdde-7d85-408c-aa2f-31374b2884e7",
      ageGroup: ToyAgeGroup.AGE_0_2,
      badge: "Low Stock",
      boxIncludes: ["1x Sensory Dino Nightlight", "1x USB-C Charging Cable", "1x Teething Care Guide"] as Prisma.InputJsonValue,
      category: ToyCategory.INFANT_PLUSH,
      createdAt: new Date("2026-03-25T14:20:00.000Z"),
      description: "Squishy textured silicone baby dinosaur nightlight with gentle color transitions and gum-soothing ridges.",
      dimensions: "5.5 in x 4.2 in x 3.8 in",
      highlights: ["100% Food/Medical Grade BPA-free Silicone", "USB-C rechargeable 12-hour soothing glow battery", "Dishwasher and steam sterilizer safe outer sleeve"] as Prisma.InputJsonValue,
      longDescription: "Made with 100% medical-grade BPA-free silicone. Tap to toggle between warm calming nursery glow and soothing color shifts. Textured ridges provide oral relief during teething stages while offering stimulating tactile exploration.",
      materials: "Medical Grade Silicone, ABS Core",
      name: "Soft Silicone Glowing Sensory Dinosaur & Teether",
      originalPrice: new Prisma.Decimal("24.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/7e750ee205ea40538085a3bbaa554cdb.png",
      ratingAverage: new Prisma.Decimal("4.7"),
      reorderThreshold: 5,
      reviewsCount: 63,
      safetyCertification: "FDA & CPSIA Infant Chew Toy Approved",
      sku: "TOY-INFANT-005",
      stockCount: 4,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Multisensory tactile soothe and nightlight toy",
      unitPrice: new Prisma.Decimal("19.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-outdoor-scooter", data: {
      id: "b8eb27c5-d421-4615-a612-7302674f1cfb",
      ageGroup: ToyAgeGroup.AGE_3_5,
      badge: "Hot Outdoor",
      boxIncludes: ["1x Foldable 3-Wheel Scooter", "1x Allen Key Tool", "1x Safety Instruction Booklet"] as Prisma.InputJsonValue,
      category: ToyCategory.OUTDOOR,
      createdAt: new Date("2026-04-01T12:00:00.000Z"),
      description: "Sturdy triangular stance kick scooter featuring kinetic flashing LED wheels and 4-level height handlebar.",
      dimensions: "23 in x 11.5 in x 33 in (Max Height)",
      highlights: ["Battery-free kinetic magnetic LED light-up polyurethane wheels", "Reinforced aluminum T-bar with 4 adjustable height positions", "Wide rear step-on friction brake for instant stops"] as Prisma.InputJsonValue,
      longDescription: "Engineered with intuitive lean-to-steer physics that helps young children master balance, agility, and motor control naturally. Extra-wide non-slip deck supports up to 110 lbs and folds flat with a single button for family excursions.",
      materials: "Aviation-Grade Aluminum, High-Density Polypropylene, PU Wheels",
      name: "Lean-to-Steer 3-Wheel Light-Up Kick Scooter",
      originalPrice: new Prisma.Decimal("69.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/00e1c970a9ef48feb286c01b97a8550c.png",
      ratingAverage: new Prisma.Decimal("4.8"),
      reorderThreshold: 5,
      reviewsCount: 88,
      safetyCertification: "ASTM F2264 & EN71-1 Scooter Safety Standards",
      sku: "TOY-OUTDOOR-006",
      stockCount: 16,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Smooth-glide adjustable height toddler scooter",
      unitPrice: new Prisma.Decimal("54.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-art-easel", data: {
      id: "837d12c9-28f4-448a-a472-682ead452dd2",
      ageGroup: ToyAgeGroup.AGE_3_5,
      badge: "Best Art Toy",
      boxIncludes: ["1x Wooden Easel Frame", "1x 15m Paper Roll", "4x Spill-Proof Paint Cups", "1x Box Dustless Chalk", "1x Whiteboard Marker & Eraser"] as Prisma.InputJsonValue,
      category: ToyCategory.ART_CRAFT,
      createdAt: new Date("2026-04-05T15:30:00.000Z"),
      description: "Dual-sided easel with magnetic dry-erase whiteboard, classic chalkboard, and top-mounted paper roll feeder.",
      dimensions: "44 in x 21 in x 20 in",
      highlights: ["3-in-1 magnetic whiteboard, blackboard, and paper roll dispenser", "Includes 15-meter paper roll, non-dust chalks, and eraser", "Folds flat for compact closet storage in seconds"] as Prisma.InputJsonValue,
      longDescription: "Transform any playroom corner into an inspired art studio. Features two spill-proof paint cup holders, a spacious bottom storage shelf for art supplies, and quick-clamp wooden locks to adjust height as your child grows.",
      materials: "Solid Pine Wood, Magnetic Chalk & Dry Erase Boards",
      name: "Double-Sided Standing Wooden Art Easel & Chalkboard",
      originalPrice: new Prisma.Decimal("79.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/aa9682d787cf4a028d44d2d3ff9c2655.png",
      ratingAverage: new Prisma.Decimal("4.9"),
      reorderThreshold: 4,
      reviewsCount: 52,
      safetyCertification: "ASTM D-4236 & CE Art Materials Non-Toxic Certified",
      sku: "TOY-ART-007",
      stockCount: 8,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Adjustable height 3-in-1 creative art station",
      unitPrice: new Prisma.Decimal("65")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-music-keyboard", data: {
      id: "05701b52-3af6-4788-a87b-cc11f75f0f03",
      ageGroup: ToyAgeGroup.AGE_0_2,
      badge: null,
      boxIncludes: ["1x Safari Keyboard", "3x AA Batteries Installed", "1x Color-Coded Song Sheet"] as Prisma.InputJsonValue,
      category: ToyCategory.LEARNING,
      createdAt: new Date("2026-04-10T16:45:00.000Z"),
      description: "Light-up musical keyboard with 24 piano keys, 8 animal voice modes, and playful tempo rhythms.",
      dimensions: "15 in x 9.5 in x 2.5 in",
      highlights: ["24 touch-sensitive illuminated piano keys", "8 animal sounds, 6 instrument tones, and 10 demo songs", "Parent-friendly two-level volume limit switch"] as Prisma.InputJsonValue,
      longDescription: "Introduce rhythm, pitch recognition, and cause-and-effect with responsive piano keys and engaging animal voice overlays. Built-in volume control ensures peaceful listening while recording feature lets little maestros playback their own tunes.",
      materials: "High-Grade Shatterproof ABS Resin",
      name: "Interactive Safari Animal Electronic Keyboard & Piano",
      originalPrice: null,
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/8276db2b923041c398f98d4ba519179e.png",
      ratingAverage: new Prisma.Decimal("4.6"),
      reorderThreshold: 5,
      reviewsCount: 41,
      safetyCertification: "FCC & EN62115 Electronic Toy Safety",
      sku: "TOY-LEARN-008",
      stockCount: 20,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Melodic musical discovery center for toddlers",
      unitPrice: new Prisma.Decimal("32.5")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-wooden-train", data: {
      id: "cb2357d4-a9ef-4d90-a963-0730073ebe7c",
      ageGroup: ToyAgeGroup.AGE_3_5,
      badge: "Classic",
      boxIncludes: ["3x Magnetic Train Cars", "28x Wooden Track Sections", "1x Suspension Bridge", "18x Scenery Figures & Signs"] as Prisma.InputJsonValue,
      category: ToyCategory.WOODEN_TOYS,
      createdAt: new Date("2026-04-12T11:00:00.000Z"),
      description: "Deluxe magnetic train cars, suspension bridge, traffic signs, and expansion wooden tracks.",
      dimensions: "Layout: 38 in x 26 in (Oval Layout)",
      highlights: ["50 precision-milled hardwood track pieces and accessories", "Magnetic front and rear couplings on all train cars", "Universally compatible with Brio and major wooden track systems"] as Prisma.InputJsonValue,
      longDescription: "Precision carved interlocking tracks allow limitless circular and figure-eight track configurations. Magnetic couplers connect locomotives effortlessly, stimulating storytelling, spatial planning, and mechanical coordination.",
      materials: "Hardwood Beech, Zinc Magnets, Non-Toxic Stains",
      name: "Classic Magnetic Wooden Railway Engine & Track 50-Piece Set",
      originalPrice: new Prisma.Decimal("52"),
      productImage: "https://www.autocoder.cc/background/zaki_dev/generated/d2d76272fce144619444e41aa397968e.png",
      ratingAverage: new Prisma.Decimal("4.9"),
      reorderThreshold: 5,
      reviewsCount: 110,
      safetyCertification: "ASTM F963 & EN71 Wooden Toy Certified",
      sku: "TOY-WOOD-009",
      stockCount: 14,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Solid beechwood interlocking track system",
      unitPrice: new Prisma.Decimal("42.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-play-kitchen", data: {
      id: "033cda66-5e0d-480b-a99a-4e65d9166a20",
      ageGroup: ToyAgeGroup.AGE_3_5,
      badge: "Low Stock",
      boxIncludes: ["12x Sliceable Pastries", "1x Wooden Baking Tray", "1x Rolling Pin", "1x Wooden Chef Knife", "1x Chef Hat & Apron"] as Prisma.InputJsonValue,
      category: ToyCategory.PRETEND_PLAY,
      createdAt: new Date("2026-04-18T13:10:00.000Z"),
      description: "Solid wood sliceable cakes, cookies, chef utensils, and baking pan with satisfying velcro crunches.",
      dimensions: "Box: 12 in x 9 in x 3.5 in",
      highlights: ["Sliceable food pieces with realistic crunch feedback", "Includes child-safe wooden knife and chef apron", "Encourages social cooperation and conversational roleplay"] as Prisma.InputJsonValue,
      longDescription: "Delight aspiring culinary artists with self-stick velcro sliceable baked treats, stainless steel mixing bowl, wooden rolling pin, and chef hat. Encourages imaginative role-play, sharing, and fraction concepts.",
      materials: "Sustainable Rubberwood, Organic Cotton, Stainless Steel",
      name: "Master Chef Wooden Pretend Bakery & Cookware 24-Piece Set",
      originalPrice: new Prisma.Decimal("45"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/46d4a3abd5e443228367a9e2bbf7aa39.png",
      ratingAverage: new Prisma.Decimal("4.8"),
      reorderThreshold: 5,
      reviewsCount: 39,
      safetyCertification: "ASTM F963-23 & CPSIA Food Pretend Safe",
      sku: "TOY-PRETEND-010",
      stockCount: 2,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Interactive sliceable pantry & pastry set",
      unitPrice: new Prisma.Decimal("36")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-astronomy-telescope", data: {
      id: "72e3dce5-c700-4527-a659-f8eaae9575bc",
      ageGroup: ToyAgeGroup.AGE_8_PLUS,
      badge: "Draft - Coming Soon",
      boxIncludes: ["1x Refractor Telescope Tube", "1x Adjustable Aluminum Tripod", "2x Eyepieces (H6mm & H20mm)", "1x Smartphone Mount", "1x Constellation Guide"] as Prisma.InputJsonValue,
      category: ToyCategory.STEM_MAKER,
      createdAt: new Date("2026-05-02T10:30:00.000Z"),
      description: "70mm aperture optical glass refractor telescope with adjustable tripod and smartphone moon adapter.",
      dimensions: "Telescope Tube: 16 in, Tripod: 18 in to 38 in",
      highlights: ["70mm optical glass refractor lens with 400mm focal length", "Smartphone photo adapter and height-adjustable aluminum tripod", "Moon filter and star constellation map poster included"] as Prisma.InputJsonValue,
      longDescription: "Prepare for night sky expeditions! Multi-coated high-transmission optical glass lenses provide crisp lunar crater and planetary views. Includes finder scope, two interchangeable eyepieces (20x and 66x), and smartphone photography mount for capturing celestial wonders.",
      materials: "Optical Glass, Aluminum Alloy, ABS Housing",
      name: "Explorer HD Stargazer Astronomical Telescope STEM Kit",
      originalPrice: new Prisma.Decimal("95"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/d68ee5a290ca4d09bf54fd0d1570ebb6.png",
      ratingAverage: new Prisma.Decimal("4.7"),
      reorderThreshold: 4,
      reviewsCount: 18,
      safetyCertification: "ISO Optical Standards & ASTM F963 Certified",
      sku: "TOY-STEM-011",
      stockCount: 10,
      storefrontStatus: StorefrontStatus.HIDDEN,
      subtitle: "Precision optical magnification science kit",
      unitPrice: new Prisma.Decimal("79.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-origami-craft", data: {
      id: "1a85ffdf-89cb-46ca-ab26-553ef8a99366",
      ageGroup: ToyAgeGroup.AGE_9_PLUS,
      badge: "Archived",
      boxIncludes: ["24x Pre-Scored Cardstock Sheets", "2x Precision Craft Glue Pens", "1x Folding Bone Tool", "1x Guidebook"] as Prisma.InputJsonValue,
      category: ToyCategory.ART_CRAFT,
      createdAt: new Date("2026-02-10T09:00:00.000Z"),
      description: "Pre-scored heavy cardstock sheets for constructing large geometric 3D safari animal models.",
      dimensions: "Package: 12.5 in x 9.5 in x 1 in",
      highlights: ["Includes 12 large 3D safari animal templates", "Quick-drying non-toxic papercraft craft glue pen", "Illustrated fold-by-number instructional guide"] as Prisma.InputJsonValue,
      longDescription: "No scissors needed! Pre-cut and numbered scoring lines make folding impressive polygon lions, elephants, and giraffes clean and satisfying. Ideal for developing patience, fine precision, and contemporary bedroom decor.",
      materials: "FSC-Certified 250gsm Recycled Art Cardstock",
      name: "Giant 3D Papercraft Origami Safari Animals Studio Kit",
      originalPrice: new Prisma.Decimal("28"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/00917dbf7dc74f68b2d9d2b8b6a4ebe5.png",
      ratingAverage: new Prisma.Decimal("4.5"),
      reorderThreshold: 5,
      reviewsCount: 27,
      safetyCertification: "ASTM D-4236 & EN71-3 Safe Glue Tested",
      sku: "TOY-ART-012",
      stockCount: 0,
      storefrontStatus: StorefrontStatus.REMOVED,
      subtitle: "Pre-cut folding paper sculpture kit",
      unitPrice: new Prisma.Decimal("22")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-ocean-sensory", data: {
      id: "5b8d8f7c-3b9a-4e2c-b3e1-7b0c1b4b1f01",
      ageGroup: ToyAgeGroup.AGE_0_2,
      badge: "New Arrival",
      boxIncludes: ["1x Ocean Sensory Cube", "6x Texture Panels", "1x Parent Activity Guide"] as Prisma.InputJsonValue,
      category: ToyCategory.INFANT_PLUSH,
      createdAt: new Date("2026-05-10T09:30:00.000Z"),
      description: "A soft activity cube with crinkle fabric, peek-a-boo flaps, ribbons, and a gentle rattle for curious little hands.",
      dimensions: "6 in x 6 in x 6 in",
      highlights: ["Six tactile textures for early sensory discovery", "Hidden squeaker and rattle for cause-and-effect play", "Machine washable outer panels with reinforced loops"] as Prisma.InputJsonValue,
      longDescription: "Inspired by tide pools and shoreline creatures, this compact activity cube gives babies a safe collection of textures and sounds to explore during tummy time and stroller rides.",
      materials: "Organic Cotton, Recycled Polyester Fill, Food-Safe Silicone",
      name: "Tide Pool Baby Sensory Activity Cube",
      originalPrice: new Prisma.Decimal("28.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/7e750ee205ea40538085a3bbaa554cdb.png",
      ratingAverage: new Prisma.Decimal("4.8"),
      reorderThreshold: 5,
      reviewsCount: 34,
      safetyCertification: "ASTM F963 & CPSIA Infant Toy Certified",
      sku: "TOY-INFANT-013",
      stockCount: 24,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Tactile ocean-inspired discovery cube",
      unitPrice: new Prisma.Decimal("22.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-marble-run", data: {
      id: "5b8d8f7c-3b9a-4e2c-b3e1-7b0c1b4b1f02",
      ageGroup: ToyAgeGroup.AGE_6_8,
      badge: "Brain Builder",
      boxIncludes: ["122x Marble Run Pieces", "20x Glass Marbles", "1x Challenge Card Deck", "1x Storage Case"] as Prisma.InputJsonValue,
      category: ToyCategory.STEM_MAKER,
      createdAt: new Date("2026-05-12T11:00:00.000Z"),
      description: "A colorful modular marble run that turns gravity, momentum, and problem-solving into hands-on play.",
      dimensions: "Box: 15 in x 11 in x 4 in",
      highlights: ["Build 30 guided tracks or invent your own", "Includes transparent funnels, switches, and spiral drops", "Challenge cards grow from beginner to advanced"] as Prisma.InputJsonValue,
      longDescription: "Children experiment with speed, balance, and cause-and-effect while building ever-changing marble courses. The open-ended pieces reward patience and invite collaborative engineering sessions.",
      materials: "BPA-Free ABS Plastic, Borosilicate Glass Marbles",
      name: "Gravity Lab Marble Run Engineering Set",
      originalPrice: new Prisma.Decimal("54.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/c5b91d66a1464945a40882068065befa.png",
      ratingAverage: new Prisma.Decimal("4.8"),
      reorderThreshold: 6,
      reviewsCount: 57,
      safetyCertification: "ASTM F963 & CE Toy Safety Certified",
      sku: "TOY-STEM-014",
      stockCount: 19,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Open-ended physics and problem-solving kit",
      unitPrice: new Prisma.Decimal("44.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-dollhouse", data: {
      id: "5b8d8f7c-3b9a-4e2c-b3e1-7b0c1b4b1f03",
      ageGroup: ToyAgeGroup.AGE_3_5,
      badge: "Story Starter",
      boxIncludes: ["1x Three-Story Dollhouse", "15x Wooden Furniture Pieces", "2x Family Figures", "1x Assembly Tool"] as Prisma.InputJsonValue,
      category: ToyCategory.PRETEND_PLAY,
      createdAt: new Date("2026-05-15T13:20:00.000Z"),
      description: "A bright three-story wooden home with movable furniture, a lift-up roof, and room for big family stories.",
      dimensions: "28 in x 13 in x 26 in",
      highlights: ["Open-back design makes shared play easy", "15 furniture pieces spark room-by-room storytelling", "Smooth rounded edges and water-based finishes"] as Prisma.InputJsonValue,
      longDescription: "From breakfast in the kitchen to bedtime upstairs, this sturdy dollhouse gives children a welcoming stage for imaginative stories and social-emotional play.",
      materials: "FSC-Certified Birch Plywood, Rubberwood, Water-Based Paint",
      name: "Sunshine Street Wooden Dollhouse & Furniture Set",
      originalPrice: new Prisma.Decimal("89.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/46d4a3abd5e443228367a9e2bbf7aa39.png",
      ratingAverage: new Prisma.Decimal("4.9"),
      reorderThreshold: 4,
      reviewsCount: 46,
      safetyCertification: "EN71 & ASTM F963 Wooden Toy Certified",
      sku: "TOY-PRETEND-015",
      stockCount: 11,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Three-story open-ended family play home",
      unitPrice: new Prisma.Decimal("74.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-watercolor", data: {
      id: "5b8d8f7c-3b9a-4e2c-b3e1-7b0c1b4b1f04",
      ageGroup: ToyAgeGroup.AGE_6_8,
      badge: "Creative Pick",
      boxIncludes: ["24x Washable Watercolor Pans", "3x Ergonomic Brushes", "20x Cold-Press Paper Sheets", "1x Mixing Palette"] as Prisma.InputJsonValue,
      category: ToyCategory.ART_CRAFT,
      createdAt: new Date("2026-05-18T10:15:00.000Z"),
      description: "A ready-to-gift watercolor studio with vibrant washable paints, heavyweight paper, and beginner-friendly prompts.",
      dimensions: "Case: 10 in x 8 in x 1.5 in",
      highlights: ["24 richly pigmented, washable color pans", "20 sheets of heavyweight cold-press paper", "Prompt cards teach blending, layering, and texture"] as Prisma.InputJsonValue,
      longDescription: "Young artists can follow the prompt cards or paint freely, learning color mixing and brush control with materials sized for small hands and easy cleanup.",
      materials: "Non-Toxic Watercolor Pigments, FSC Paper, Birchwood Case",
      name: "Little Colorist Washable Watercolor Studio",
      originalPrice: new Prisma.Decimal("36.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/aa9682d787cf4a028d44d2d3ff9c2655.png",
      ratingAverage: new Prisma.Decimal("4.7"),
      reorderThreshold: 7,
      reviewsCount: 29,
      safetyCertification: "ASTM D-4236 & EN71-3 Non-Toxic Art Certified",
      sku: "TOY-ART-016",
      stockCount: 27,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Washable paint set for confident beginners",
      unitPrice: new Prisma.Decimal("29.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-garden-kit", data: {
      id: "5b8d8f7c-3b9a-4e2c-b3e1-7b0c1b4b1f05",
      ageGroup: ToyAgeGroup.AGE_3_5,
      badge: "Outdoor Favorite",
      boxIncludes: ["1x Child-Size Watering Can", "1x Hand Trowel", "1x Rake", "6x Plant Markers", "1x Canvas Tote"] as Prisma.InputJsonValue,
      category: ToyCategory.OUTDOOR,
      createdAt: new Date("2026-05-20T12:45:00.000Z"),
      description: "A child-size gardening set for digging, watering, and discovering how plants grow from seed to sprout.",
      dimensions: "Tote: 11 in x 8 in x 8 in",
      highlights: ["Lightweight tools sized for preschool hands", "Rounded metal-free edges for safe garden play", "Plant markers make every growing project personal"] as Prisma.InputJsonValue,
      longDescription: "Bring little helpers outside with a durable canvas tote filled with practical tools. Gardening builds patience, responsibility, and a lasting connection to the natural world.",
      materials: "Beechwood, Powder-Coated Aluminum, Organic Cotton Canvas",
      name: "Backyard Sprout Kids Gardening Tool Set",
      originalPrice: new Prisma.Decimal("31.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/00e1c970a9ef48feb286c01b97a8550c.png",
      ratingAverage: new Prisma.Decimal("4.8"),
      reorderThreshold: 5,
      reviewsCount: 38,
      safetyCertification: "ASTM F963 & EN71 Outdoor Toy Certified",
      sku: "TOY-OUTDOOR-017",
      stockCount: 15,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Hands-on nature discovery for little gardeners",
      unitPrice: new Prisma.Decimal("26.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-puzzle-map", data: {
      id: "5b8d8f7c-3b9a-4e2c-b3e1-7b0c1b4b1f06",
      ageGroup: ToyAgeGroup.AGE_6_8,
      badge: "Family Pick",
      boxIncludes: ["1x Illustrated World Map Board", "100x Wooden Country Pieces", "1x Landmark Guide", "1x Cotton Storage Bag"] as Prisma.InputJsonValue,
      category: ToyCategory.LEARNING,
      createdAt: new Date("2026-05-22T09:00:00.000Z"),
      description: "A colorful wooden world map puzzle that turns geography practice into a hands-on travel adventure.",
      dimensions: "Board: 22 in x 16 in x 0.5 in",
      highlights: ["100 chunky wooden country and landmark pieces", "Color-coded regions support independent matching", "Fact guide introduces animals, food, and cultures"] as Prisma.InputJsonValue,
      longDescription: "Children build a global picture one piece at a time, then use the illustrated guide to discover new places, animals, and stories beyond their own neighborhood.",
      materials: "FSC-Certified Birchwood, Water-Based Ink",
      name: "Around the World Wooden Geography Puzzle",
      originalPrice: new Prisma.Decimal("42.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/c447fb56f5fb4e0084abe4e87b38d79f.png",
      ratingAverage: new Prisma.Decimal("4.9"),
      reorderThreshold: 5,
      reviewsCount: 64,
      safetyCertification: "EN71-1 & ASTM F963 Educational Toy Certified",
      sku: "TOY-LEARN-018",
      stockCount: 21,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Hands-on geography and discovery puzzle",
      unitPrice: new Prisma.Decimal("34.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-micro-robots", data: {
      id: "5b8d8f7c-3b9a-4e2c-b3e1-7b0c1b4b1f07",
      ageGroup: ToyAgeGroup.AGE_8_PLUS,
      badge: "Maker Lab",
      boxIncludes: ["1x Programmable Control Hub", "2x Micro Robot Chassis", "1x Sensor Pack", "1x Project Workbook"] as Prisma.InputJsonValue,
      category: ToyCategory.CREATIVE_BUILDING,
      createdAt: new Date("2026-05-25T14:00:00.000Z"),
      description: "Build and code two tiny robots with beginner-friendly sensors, snap-fit parts, and screen-free challenge cards.",
      dimensions: "Box: 13 in x 9 in x 3 in",
      highlights: ["Two buildable robots with interchangeable parts", "Line, light, and obstacle sensors included", "Visual coding cards require no prior programming"] as Prisma.InputJsonValue,
      longDescription: "A welcoming first robotics lab where young makers test ideas, troubleshoot designs, and celebrate working code through playful engineering challenges.",
      materials: "ABS Plastic, Aluminum Gear Motors, Recyclable Cardboard",
      name: "Code Critters Micro Robotics Starter Lab",
      originalPrice: new Prisma.Decimal("84.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/d68ee5a290ca4d09bf54fd0d1570ebb6.png",
      ratingAverage: new Prisma.Decimal("4.8"),
      reorderThreshold: 4,
      reviewsCount: 22,
      safetyCertification: "ASTM F963, CPSIA & CE Electronics Certified",
      sku: "TOY-BUILD-019",
      stockCount: 9,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Screen-free first robotics and coding lab",
      unitPrice: new Prisma.Decimal("69.99")
    }, relations: [] },
  { entityKey: "ToyProduct:toy-puppet-theater", data: {
      id: "5b8d8f7c-3b9a-4e2c-b3e1-7b0c1b4b1f08",
      ageGroup: ToyAgeGroup.AGE_3_5,
      badge: "Play Together",
      boxIncludes: ["1x Foldable Puppet Theater", "4x Felt Hand Puppets", "1x Story Prompt Deck", "1x Carry Handle"] as Prisma.InputJsonValue,
      category: ToyCategory.PRETEND_PLAY,
      createdAt: new Date("2026-05-28T10:30:00.000Z"),
      description: "A fold-flat tabletop puppet theater with friendly felt characters for family shows, storytelling, and silly voices.",
      dimensions: "Open: 31 in x 10 in x 25 in",
      highlights: ["Sets up in under a minute with no tools", "Four soft felt puppets with movable mouths", "Prompt deck makes first stories easy to start"] as Prisma.InputJsonValue,
      longDescription: "Invite children to take turns directing, performing, and making up endings. Puppet play builds confidence, vocabulary, listening skills, and joyful family rituals.",
      materials: "FSC Plywood, Cotton Canvas, Recycled Felt",
      name: "Storytime Pop-Up Puppet Theater Set",
      originalPrice: new Prisma.Decimal("49.99"),
      productImage: "https://www.autocoder.cc/background/zaki_pre/generated/46d4a3abd5e443228367a9e2bbf7aa39.png",
      ratingAverage: new Prisma.Decimal("4.9"),
      reorderThreshold: 5,
      reviewsCount: 31,
      safetyCertification: "ASTM F963 & EN71 Pretend Play Certified",
      sku: "TOY-PRETEND-020",
      stockCount: 17,
      storefrontStatus: StorefrontStatus.LIVE,
      subtitle: "Fold-flat theater for family storytelling",
      unitPrice: new Prisma.Decimal("39.99")
    }, relations: [] },
] as const;

const promoCodeRecords = [
  { entityKey: "PromoCode:promo-joy10", data: {
      id: "2ed4912a-97e6-4026-a534-e5eec54e8f48",
      code: "JOY10",
      createdAt: new Date("2026-08-01T08:00:00.000Z"),
      discountType: DiscountType.PERCENT,
      discountValue: new Prisma.Decimal("10"),
      freeShippingThreshold: new Prisma.Decimal("45"),
      isActive: true,
      minSubtotal: new Prisma.Decimal("20")
    }, relations: [] },
  { entityKey: "PromoCode:promo-save15", data: {
      id: "7bf366a1-d17b-4c29-ad38-16322c97678e",
      code: "SAVE15",
      createdAt: new Date("2026-08-05T09:30:00.000Z"),
      discountType: DiscountType.PERCENT,
      discountValue: new Prisma.Decimal("15"),
      freeShippingThreshold: new Prisma.Decimal("45"),
      isActive: true,
      minSubtotal: new Prisma.Decimal("35")
    }, relations: [] },
  { entityKey: "PromoCode:promo-freeship", data: {
      id: "5f88ee72-2a41-4dfb-acb4-0d4837f29f9c",
      code: "FREESHIP",
      createdAt: new Date("2026-08-10T11:00:00.000Z"),
      discountType: DiscountType.FIXED_AMOUNT,
      discountValue: new Prisma.Decimal("0"),
      freeShippingThreshold: new Prisma.Decimal("0"),
      isActive: true,
      minSubtotal: new Prisma.Decimal("25")
    }, relations: [] },
] as const;

const shoppingCartRecords = [
  { entityKey: "ShoppingCart:cart_active_customer", data: {
      id: "8c80d5d2-8ab0-4762-a40e-adbf113be9e0",
      cartStatus: CartStatus.ACTIVE,
      createdAt: new Date("2026-08-25T14:30:00.000Z")
    }, relations: [{"target_entity_key": "AccountUser:account_user_customer", "local_fields": ["customerId"], "target_fields": ["id"]}, {"target_entity_key": "PromoCode:promo-joy10", "local_fields": ["appliedPromoId"], "target_fields": ["id"]}] },
] as const;

const salesOrderRecords = [
  { entityKey: "SalesOrder:sales_order_1001", data: {
      id: "2855eea2-6fdb-45c0-ae89-9d5033e7dd94",
      appliedPromoCode: "PLAYMAGIC15",
      createdAt: new Date("2026-08-15T14:32:00.000Z"),
      discountAmount: new Prisma.Decimal("15"),
      orderStatus: OrderStatus.COMPLETED,
      shippingFee: new Prisma.Decimal("0"),
      subtotal: new Prisma.Decimal("109.97"),
      totalAmount: new Prisma.Decimal("94.97")
    }, relations: [{"target_entity_key": "AccountUser:account_user_customer", "local_fields": ["customerId"], "target_fields": ["id"]}, {"target_entity_key": "ShoppingCart:cart_active_customer", "local_fields": ["sourceCartId"], "target_fields": ["id"]}] },
  { entityKey: "SalesOrder:sales_order_1002", data: {
      id: "86cabdd9-4e2b-4b19-a27a-4cc71ce90af1",
      appliedPromoCode: "SPRINGJOY",
      createdAt: new Date("2026-08-20T10:15:00.000Z"),
      discountAmount: new Prisma.Decimal("10"),
      orderStatus: OrderStatus.COMPLETED,
      shippingFee: new Prisma.Decimal("5.99"),
      subtotal: new Prisma.Decimal("79.98"),
      totalAmount: new Prisma.Decimal("75.97")
    }, relations: [{"target_entity_key": "AccountUser:account_user_customer", "local_fields": ["customerId"], "target_fields": ["id"]}, {"target_entity_key": "ShoppingCart:cart_active_customer", "local_fields": ["sourceCartId"], "target_fields": ["id"]}] },
] as const;

function requireEntity(entities: Map<string, SeedEntity>, entityKey: string): SeedEntity {
  const entity = entities.get(entityKey);
  if (!entity) throw new Error(`seed relation target was not created: ${entityKey}`);
  return entity;
}

async function main() {
  await prisma.$transaction(async (tx) => {
    const entities = new Map<string, SeedEntity>();
    await tx.shoppingCart.updateMany({ data: { appliedPromoId: null } });

    await tx.salesOrderItem.deleteMany({});
    await tx.salesOrder.deleteMany({});
    await tx.cartItem.deleteMany({});
    await tx.shoppingCart.deleteMany({});
    await tx.promoCode.deleteMany({});
    await tx.toyProduct.deleteMany({});
    await tx.accountUser.deleteMany({});

    for (const record of accountUserRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.accountUser.create({ data: data as unknown as Prisma.AccountUserUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of toyProductRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.toyProduct.create({ data: data as unknown as Prisma.ToyProductUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of promoCodeRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.promoCode.create({ data: data as unknown as Prisma.PromoCodeUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of shoppingCartRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.shoppingCart.create({ data: data as unknown as Prisma.ShoppingCartUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
    for (const record of salesOrderRecords) {
      const data: Record<string, unknown> = { ...record.data };
      for (const relation of record.relations as readonly RelationBinding[]) {
        const target = requireEntity(entities, relation.target_entity_key);
        relation.local_fields.forEach((field, index) => { data[field] = target[relation.target_fields[index]]; });
      }
      const created = await tx.salesOrder.create({ data: data as unknown as Prisma.SalesOrderUncheckedCreateInput });
      entities.set(record.entityKey, created as unknown as SeedEntity);
    }
  }, { maxWait: 30_000, timeout: 300_000 });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
