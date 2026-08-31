-- Database snapshot: PROJ_1cd476cd_snap_20260831_021440_707
-- Created at: 2026-08-31 03:21:32.807588
-- Include structure: True
-- Include data: True

SET FOREIGN_KEY_CHECKS = 0;

-- Table structure for `_prisma_migrations`
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `_prisma_migrations`
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('63264f9e-4338-4b72-b3a4-baeada479549', 'ae22b760ff71c0996ae629beeb58a53c28412b4d0a300ee2367608b93ab4a8bd', '2026-08-31 02:14:56', '20260831021453_init', '', NULL, '2026-08-31 02:14:56', 0);

-- Table structure for `accountuser`
DROP TABLE IF EXISTS `accountuser`;
CREATE TABLE `accountuser` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('CUSTOMER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AccountUser_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `accountuser`
INSERT INTO `accountuser` (`id`, `username`, `passwordHash`, `role`, `createdAt`, `updatedAt`) VALUES
('18b18797-37fc-4313-a8db-3ad8c70b9303', 'clara_admin', 'bcaf993833b701360eb99006eea01a391f7a55366247b743880609c7ac04028f', 'ADMIN', '2026-07-15 08:00:00', '2026-08-31 02:18:40'),
('a0953f8a-04c6-42d8-abf0-0235eb9b9085', 'sarah_toylover', '63bda52254ed365ab78f7f8004eae855ac1bf9fa3bd03ac47a771583c8a2368e', 'CUSTOMER', '2026-08-01 10:00:00', '2026-08-31 02:18:40');

-- Table structure for `cartitem`
DROP TABLE IF EXISTS `cartitem`;
CREATE TABLE `cartitem` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cartId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `customerId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CartItem_cartId_fkey` (`cartId`),
  KEY `CartItem_productId_fkey` (`productId`),
  KEY `CartItem_customerId_fkey` (`customerId`),
  CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `shoppingcart` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `CartItem_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `accountuser` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `toyproduct` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `cartitem`
-- Table structure for `promocode`
DROP TABLE IF EXISTS `promocode`;
CREATE TABLE `promocode` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discountType` enum('PERCENT','FIXED_AMOUNT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `discountValue` decimal(10,2) NOT NULL,
  `minSubtotal` decimal(10,2) DEFAULT NULL,
  `freeShippingThreshold` decimal(10,2) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PromoCode_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `promocode`
INSERT INTO `promocode` (`id`, `code`, `discountType`, `discountValue`, `minSubtotal`, `freeShippingThreshold`, `isActive`, `createdAt`, `updatedAt`) VALUES
('2ed4912a-97e6-4026-a534-e5eec54e8f48', 'JOY10', 'PERCENT', '10.00', '20.00', '45.00', 1, '2026-08-01 08:00:00', '2026-08-31 02:18:40'),
('5f88ee72-2a41-4dfb-acb4-0d4837f29f9c', 'FREESHIP', 'FIXED_AMOUNT', '0.00', '25.00', '0.00', 1, '2026-08-10 11:00:00', '2026-08-31 02:18:40'),
('7bf366a1-d17b-4c29-ad38-16322c97678e', 'SAVE15', 'PERCENT', '15.00', '35.00', '45.00', 1, '2026-08-05 09:30:00', '2026-08-31 02:18:40');

-- Table structure for `salesorder`
DROP TABLE IF EXISTS `salesorder`;
CREATE TABLE `salesorder` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sourceCartId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderStatus` enum('COMPLETED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `discountAmount` decimal(10,2) NOT NULL,
  `shippingFee` decimal(10,2) NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `appliedPromoCode` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SalesOrder_customerId_fkey` (`customerId`),
  KEY `SalesOrder_sourceCartId_fkey` (`sourceCartId`),
  CONSTRAINT `SalesOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `accountuser` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `SalesOrder_sourceCartId_fkey` FOREIGN KEY (`sourceCartId`) REFERENCES `shoppingcart` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `salesorder`
INSERT INTO `salesorder` (`id`, `customerId`, `sourceCartId`, `orderStatus`, `subtotal`, `discountAmount`, `shippingFee`, `totalAmount`, `appliedPromoCode`, `createdAt`, `updatedAt`) VALUES
('2855eea2-6fdb-45c0-ae89-9d5033e7dd94', 'a0953f8a-04c6-42d8-abf0-0235eb9b9085', '8c80d5d2-8ab0-4762-a40e-adbf113be9e0', 'COMPLETED', '109.97', '15.00', '0.00', '94.97', 'PLAYMAGIC15', '2026-08-15 14:32:00', '2026-08-31 02:18:40'),
('86cabdd9-4e2b-4b19-a27a-4cc71ce90af1', 'a0953f8a-04c6-42d8-abf0-0235eb9b9085', '8c80d5d2-8ab0-4762-a40e-adbf113be9e0', 'COMPLETED', '79.98', '10.00', '5.99', '75.97', 'SPRINGJOY', '2026-08-20 10:15:00', '2026-08-31 02:18:40');

-- Table structure for `salesorderitem`
DROP TABLE IF EXISTS `salesorderitem`;
CREATE TABLE `salesorderitem` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `unitPriceSnapshot` decimal(10,2) NOT NULL,
  `lineSubtotal` decimal(10,2) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SalesOrderItem_orderId_fkey` (`orderId`),
  KEY `SalesOrderItem_productId_fkey` (`productId`),
  CONSTRAINT `SalesOrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `salesorder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `SalesOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `toyproduct` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `salesorderitem`
-- Table structure for `shoppingcart`
DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cartStatus` enum('ACTIVE','CHECKED_OUT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `appliedPromoId` varchar(72) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ShoppingCart_customerId_fkey` (`customerId`),
  KEY `ShoppingCart_appliedPromoId_fkey` (`appliedPromoId`),
  CONSTRAINT `ShoppingCart_appliedPromoId_fkey` FOREIGN KEY (`appliedPromoId`) REFERENCES `promocode` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ShoppingCart_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `accountuser` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `shoppingcart`
INSERT INTO `shoppingcart` (`id`, `customerId`, `cartStatus`, `appliedPromoId`, `createdAt`, `updatedAt`) VALUES
('8c80d5d2-8ab0-4762-a40e-adbf113be9e0', 'a0953f8a-04c6-42d8-abf0-0235eb9b9085', 'ACTIVE', '2ed4912a-97e6-4026-a534-e5eec54e8f48', '2026-08-25 14:30:00', '2026-08-31 02:18:40');

-- Table structure for `toyproduct`
DROP TABLE IF EXISTS `toyproduct`;
CREATE TABLE `toyproduct` (
  `id` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('WOODEN_TOYS','STEM_MAKER','INFANT_PLUSH','CREATIVE_BUILDING','PRETEND_PLAY','ART_CRAFT','LEARNING','OUTDOOR','PLUSH') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ageGroup` enum('AGE_0_2','AGE_3_5','AGE_6_8','AGE_8_PLUS','AGE_9_PLUS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `unitPrice` decimal(10,2) NOT NULL,
  `originalPrice` decimal(10,2) DEFAULT NULL,
  `stockCount` int NOT NULL,
  `reorderThreshold` int NOT NULL,
  `storefrontStatus` enum('HIDDEN','LIVE','REMOVED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `productImage` varchar(700) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `badge` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `longDescription` text COLLATE utf8mb4_unicode_ci,
  `highlights` json NOT NULL,
  `materials` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `safetyCertification` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dimensions` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `boxIncludes` json NOT NULL,
  `ratingAverage` decimal(3,2) DEFAULT NULL,
  `reviewsCount` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ToyProduct_sku_key` (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `toyproduct`
INSERT INTO `toyproduct` (`id`, `sku`, `category`, `ageGroup`, `unitPrice`, `originalPrice`, `stockCount`, `reorderThreshold`, `storefrontStatus`, `productImage`, `badge`, `name`, `subtitle`, `description`, `longDescription`, `highlights`, `materials`, `safetyCertification`, `dimensions`, `boxIncludes`, `ratingAverage`, `reviewsCount`, `createdAt`, `updatedAt`) VALUES
('033cda66-5e0d-480b-a99a-4e65d9166a20', 'TOY-PRETEND-010', 'PRETEND_PLAY', 'AGE_3_5', '36.00', '45.00', 2, 5, 'LIVE', 'https://www.autocoder.cc/background/zaki_pre/generated/46d4a3abd5e443228367a9e2bbf7aa39.png', 'Low Stock', 'Master Chef Wooden Pretend Bakery & Cookware 24-Piece Set', 'Interactive sliceable pantry & pastry set', 'Solid wood sliceable cakes, cookies, chef utensils, and baking pan with satisfying velcro crunches.', 'Delight aspiring culinary artists with self-stick velcro sliceable baked treats, stainless steel mixing bowl, wooden rolling pin, and chef hat. Encourages imaginative role-play, sharing, and fraction concepts.', '["Sliceable food pieces with realistic crunch feedback", "Includes child-safe wooden knife and chef apron", "Encourages social cooperation and conversational roleplay"]', 'Sustainable Rubberwood, Organic Cotton, Stainless Steel', 'ASTM F963-23 & CPSIA Food Pretend Safe', 'Box: 12 in x 9 in x 3.5 in', '["12x Sliceable Pastries", "1x Wooden Baking Tray", "1x Rolling Pin", "1x Wooden Chef Knife", "1x Chef Hat & Apron"]', '4.80', 39, '2026-04-18 13:10:00', '2026-08-31 02:18:40'),
('05701b52-3af6-4788-a87b-cc11f75f0f03', 'TOY-LEARN-008', 'LEARNING', 'AGE_0_2', '32.50', NULL, 20, 5, 'LIVE', 'https://www.autocoder.cc/background/zaki_pre/generated/8276db2b923041c398f98d4ba519179e.png', NULL, 'Interactive Safari Animal Electronic Keyboard & Piano', 'Melodic musical discovery center for toddlers', 'Light-up musical keyboard with 24 piano keys, 8 animal voice modes, and playful tempo rhythms.', 'Introduce rhythm, pitch recognition, and cause-and-effect with responsive piano keys and engaging animal voice overlays. Built-in volume control ensures peaceful listening while recording feature lets little maestros playback their own tunes.', '["24 touch-sensitive illuminated piano keys", "8 animal sounds, 6 instrument tones, and 10 demo songs", "Parent-friendly two-level volume limit switch"]', 'High-Grade Shatterproof ABS Resin', 'FCC & EN62115 Electronic Toy Safety', '15 in x 9.5 in x 2.5 in', '["1x Safari Keyboard", "3x AA Batteries Installed", "1x Color-Coded Song Sheet"]', '4.60', 41, '2026-04-10 16:45:00', '2026-08-31 02:18:40'),
('0ffbf2d2-aadb-4ffa-aec2-a5065724d6fd', 'TOY-LEARN-003', 'LEARNING', 'AGE_3_5', '29.50', '34.99', 22, 6, 'LIVE', 'https://www.autocoder.cc/background/zaki_pre/generated/c447fb56f5fb4e0084abe4e87b38d79f.png', 'Eco-Friendly', 'Forest Animal Balancing & Stacking Wooden Blocks Set', 'Sustainable beechwood tactile balancing puzzle', 'Hand-painted natural beechwood balancing stones and cartoon woodland creature figurines.', 'Inspire patience, fine motor dexterity, and architectural creativity. Each piece is hand-sanded to velvety smoothness and coated with child-safe water-based non-toxic stains. Includes storage canvas tote.', '["FSC-Certified sustainably harvested European beechwood", "Non-toxic water-based food-grade vibrant stains", "Develops tactile coordination, balance intuition, and grip strength"]', 'Solid Natural Beechwood, Water-Based Non-toxic Paint', 'EU CE & EN71-3 Safe Paint Testing', '16 Piece Assorted Sizes (1.5 in to 3.5 in)', '["16x Carved Wooden Animal & Stone Blocks", "1x Organic Cotton Drawstring Bag"]', '4.90', 76, '2026-03-20 11:15:00', '2026-08-31 02:18:40'),
('1a85ffdf-89cb-46ca-ab26-553ef8a99366', 'TOY-ART-012', 'ART_CRAFT', 'AGE_9_PLUS', '22.00', '28.00', 0, 5, 'REMOVED', 'https://www.autocoder.cc/background/zaki_pre/generated/00917dbf7dc74f68b2d9d2b8b6a4ebe5.png', 'Archived', 'Giant 3D Papercraft Origami Safari Animals Studio Kit', 'Pre-cut folding paper sculpture kit', 'Pre-scored heavy cardstock sheets for constructing large geometric 3D safari animal models.', 'No scissors needed! Pre-cut and numbered scoring lines make folding impressive polygon lions, elephants, and giraffes clean and satisfying. Ideal for developing patience, fine precision, and contemporary bedroom decor.', '["Includes 12 large 3D safari animal templates", "Quick-drying non-toxic papercraft craft glue pen", "Illustrated fold-by-number instructional guide"]', 'FSC-Certified 250gsm Recycled Art Cardstock', 'ASTM D-4236 & EN71-3 Safe Glue Tested', 'Package: 12.5 in x 9.5 in x 1 in', '["24x Pre-Scored Cardstock Sheets", "2x Precision Craft Glue Pens", "1x Folding Bone Tool", "1x Guidebook"]', '4.50', 27, '2026-02-10 09:00:00', '2026-08-31 02:18:40'),
('4cbfbdde-7d85-408c-aa2f-31374b2884e7', 'TOY-INFANT-005', 'INFANT_PLUSH', 'AGE_0_2', '19.99', '24.99', 4, 5, 'LIVE', 'https://www.autocoder.cc/background/zaki_pre/generated/7e750ee205ea40538085a3bbaa554cdb.png', 'Low Stock', 'Soft Silicone Glowing Sensory Dinosaur & Teether', 'Multisensory tactile soothe and nightlight toy', 'Squishy textured silicone baby dinosaur nightlight with gentle color transitions and gum-soothing ridges.', 'Made with 100% medical-grade BPA-free silicone. Tap to toggle between warm calming nursery glow and soothing color shifts. Textured ridges provide oral relief during teething stages while offering stimulating tactile exploration.', '["100% Food/Medical Grade BPA-free Silicone", "USB-C rechargeable 12-hour soothing glow battery", "Dishwasher and steam sterilizer safe outer sleeve"]', 'Medical Grade Silicone, ABS Core', 'FDA & CPSIA Infant Chew Toy Approved', '5.5 in x 4.2 in x 3.8 in', '["1x Sensory Dino Nightlight", "1x USB-C Charging Cable", "1x Teething Care Guide"]', '4.70', 63, '2026-03-25 14:20:00', '2026-08-31 02:18:40'),
('72e3dce5-c700-4527-a659-f8eaae9575bc', 'TOY-STEM-011', 'STEM_MAKER', 'AGE_8_PLUS', '79.99', '95.00', 10, 4, 'HIDDEN', 'https://www.autocoder.cc/background/zaki_pre/generated/d68ee5a290ca4d09bf54fd0d1570ebb6.png', 'Draft - Coming Soon', 'Explorer HD Stargazer Astronomical Telescope STEM Kit', 'Precision optical magnification science kit', '70mm aperture optical glass refractor telescope with adjustable tripod and smartphone moon adapter.', 'Prepare for night sky expeditions! Multi-coated high-transmission optical glass lenses provide crisp lunar crater and planetary views. Includes finder scope, two interchangeable eyepieces (20x and 66x), and smartphone photography mount for capturing celestial wonders.', '["70mm optical glass refractor lens with 400mm focal length", "Smartphone photo adapter and height-adjustable aluminum tripod", "Moon filter and star constellation map poster included"]', 'Optical Glass, Aluminum Alloy, ABS Housing', 'ISO Optical Standards & ASTM F963 Certified', 'Telescope Tube: 16 in, Tripod: 18 in to 38 in', '["1x Refractor Telescope Tube", "1x Adjustable Aluminum Tripod", "2x Eyepieces (H6mm & H20mm)", "1x Smartphone Mount", "1x Constellation Guide"]', '4.70', 18, '2026-05-02 10:30:00', '2026-08-31 02:18:40'),
('837d12c9-28f4-448a-a472-682ead452dd2', 'TOY-ART-007', 'ART_CRAFT', 'AGE_3_5', '65.00', '79.99', 8, 4, 'LIVE', 'https://www.autocoder.cc/background/zaki_pre/generated/aa9682d787cf4a028d44d2d3ff9c2655.png', 'Best Art Toy', 'Double-Sided Standing Wooden Art Easel & Chalkboard', 'Adjustable height 3-in-1 creative art station', 'Dual-sided easel with magnetic dry-erase whiteboard, classic chalkboard, and top-mounted paper roll feeder.', 'Transform any playroom corner into an inspired art studio. Features two spill-proof paint cup holders, a spacious bottom storage shelf for art supplies, and quick-clamp wooden locks to adjust height as your child grows.', '["3-in-1 magnetic whiteboard, blackboard, and paper roll dispenser", "Includes 15-meter paper roll, non-dust chalks, and eraser", "Folds flat for compact closet storage in seconds"]', 'Solid Pine Wood, Magnetic Chalk & Dry Erase Boards', 'ASTM D-4236 & CE Art Materials Non-Toxic Certified', '44 in x 21 in x 20 in', '["1x Wooden Easel Frame", "1x 15m Paper Roll", "4x Spill-Proof Paint Cups", "1x Box Dustless Chalk", "1x Whiteboard Marker & Eraser"]', '4.90', 52, '2026-04-05 15:30:00', '2026-08-31 02:18:40'),
('94754ff9-8c05-40b9-a81d-8555b1bc942b', 'TOY-PLUSH-001', 'PLUSH', 'AGE_0_2', '24.99', '29.99', 18, 5, 'LIVE', 'https://www.autocoder.cc/background/zaki_pre/generated/f327b47d48ed46c3aa49b1287aeda3f7.png', 'Bestseller', 'Huggable Rainbow Pastel Bunny Rabbit Stuffed Animal Plush', 'Ultra-soft premium cotton plush companion', 'Cloud-soft hypoallergenic organic cotton bunny with floppy ears and pastel rainbow tummy.', 'Crafted with baby-safe embroidered eyes and super-fluffy organic cotton velour. Perfectly sized for warm hugs, naptime companionship, and nursery styling. Machine washable and rigorously tested for sensitive skin.', '["100% Organic certified hypoallergenic plush velour", "Embroidered facial features with zero choking hazards", "Machine washable with reinforced double-stitched seams"]', 'Organic Cotton Velour, Recycled Polyfill', 'EU EN71 & ASTM F963-23 Certified', '12 in x 6 in x 4.5 in', '["1x Rainbow Bunny Plush", "1x Adoption Certificate Card"]', '4.90', 142, '2026-03-15 08:30:00', '2026-08-31 02:18:40'),
('ad9d6c61-487e-41a1-a71c-30adee9db312', 'TOY-BUILD-004', 'CREATIVE_BUILDING', 'AGE_3_5', '48.00', '58.00', 35, 8, 'LIVE', 'https://www.autocoder.cc/background/zaki_test/generated/17d3eefac353482abb2e1212a2f91a58.png', 'Popular', '3D Crystal Geometric Magnetic Building Tiles 100-Piece Set', 'Translucent magnetic architecture discovery pack', 'Vibrant translucent magnetic tiles for constructing glowing 3D castles, towers, and geometry shapes.', 'Heavy-duty ultrasonic welded magnetic pieces with rounded corners and strong neodymium magnets. Captures daylight for luminous prism effects while introducing early geometry, spatial structures, and collaborative free play.', '["100 pieces including windows, arches, triangles, and baseplates", "Ultrasonic rivet construction prevents magnet detachment", "Fully compatible with major magnetic tile brands"]', 'Food-Grade ABS Plastic, Nickel-Plated Rare Earth Magnets', 'ASTM F963 & EN71 Magnet Safety Standard', 'Box: 14 in x 10 in x 4 in', '["100x Magnetic Geometric Tiles", "1x Idea Booklet", "1x Storage Tote"]', '4.90', 115, '2026-03-22 09:40:00', '2026-08-31 02:18:40'),
('b8eb27c5-d421-4615-a612-7302674f1cfb', 'TOY-OUTDOOR-006', 'OUTDOOR', 'AGE_3_5', '54.99', '69.99', 16, 5, 'LIVE', 'https://www.autocoder.cc/background/zaki_pre/generated/00e1c970a9ef48feb286c01b97a8550c.png', 'Hot Outdoor', 'Lean-to-Steer 3-Wheel Light-Up Kick Scooter', 'Smooth-glide adjustable height toddler scooter', 'Sturdy triangular stance kick scooter featuring kinetic flashing LED wheels and 4-level height handlebar.', 'Engineered with intuitive lean-to-steer physics that helps young children master balance, agility, and motor control naturally. Extra-wide non-slip deck supports up to 110 lbs and folds flat with a single button for family excursions.', '["Battery-free kinetic magnetic LED light-up polyurethane wheels", "Reinforced aluminum T-bar with 4 adjustable height positions", "Wide rear step-on friction brake for instant stops"]', 'Aviation-Grade Aluminum, High-Density Polypropylene, PU Wheels', 'ASTM F2264 & EN71-1 Scooter Safety Standards', '23 in x 11.5 in x 33 in (Max Height)', '["1x Foldable 3-Wheel Scooter", "1x Allen Key Tool", "1x Safety Instruction Booklet"]', '4.80', 88, '2026-04-01 12:00:00', '2026-08-31 02:18:40'),
('cb2357d4-a9ef-4d90-a963-0730073ebe7c', 'TOY-WOOD-009', 'WOODEN_TOYS', 'AGE_3_5', '42.99', '52.00', 14, 5, 'LIVE', 'https://www.autocoder.cc/background/zaki_dev/generated/d2d76272fce144619444e41aa397968e.png', 'Classic', 'Classic Magnetic Wooden Railway Engine & Track 50-Piece Set', 'Solid beechwood interlocking track system', 'Deluxe magnetic train cars, suspension bridge, traffic signs, and expansion wooden tracks.', 'Precision carved interlocking tracks allow limitless circular and figure-eight track configurations. Magnetic couplers connect locomotives effortlessly, stimulating storytelling, spatial planning, and mechanical coordination.', '["50 precision-milled hardwood track pieces and accessories", "Magnetic front and rear couplings on all train cars", "Universally compatible with Brio and major wooden track systems"]', 'Hardwood Beech, Zinc Magnets, Non-Toxic Stains', 'ASTM F963 & EN71 Wooden Toy Certified', 'Layout: 38 in x 26 in (Oval Layout)', '["3x Magnetic Train Cars", "28x Wooden Track Sections", "1x Suspension Bridge", "18x Scenery Figures & Signs"]', '4.90', 110, '2026-04-12 11:00:00', '2026-08-31 02:18:40'),
('e8a87451-7e55-4c99-a277-5d6ecb7a08fd', 'TOY-STEM-002', 'STEM_MAKER', 'AGE_6_8', '39.99', '49.99', 12, 5, 'LIVE', 'https://www.autocoder.cc/background/zaki_pre/generated/c5b91d66a1464945a40882068065befa.png', 'Top STEM', 'Solar Powered Explorer Robot 12-in-1 STEM Building Kit', 'Eco-friendly solar powered engineering kit', 'Hands-on engineering kit that transforms into 12 distinct walking, crawling, and rolling solar robots.', 'Empower your young scientist with green energy principles! This comprehensive 190-piece STEM kit operates completely on real sunlight or halogen lamp light without requiring disposable batteries. Fosters spatial reasoning and problem-solving.', '["12 alternate robot designs from land crawlers to water floaters", "Real working solar panel gearbox included", "Step-by-step full-color illustrated assembly manual"]', 'BPA-Free High Impact ABS Plastic', 'ASTM F963, CPSIA & CE Certified', 'Box: 11 in x 8 in x 3 in', '["190x Modular Building Parts", "1x High-efficiency Solar Panel", "1x Illustrated Guidebook"]', '4.80', 98, '2026-03-18 10:00:00', '2026-08-31 02:18:40');

SET FOREIGN_KEY_CHECKS = 1;
