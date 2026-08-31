"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { ToyOrderItemSnapshot } from "@/frontend/types/OrderHistory";
interface OrderItemRowProps {
  item: ToyOrderItemSnapshot;
  isFirst?: boolean;
}
const CATEGORY_LABELS: Record<string, string> = {
  WOODEN_TOYS: "Wooden Toys",
  STEM_MAKER: "STEM & Science",
  INFANT_PLUSH: "Infant Plush",
  CREATIVE_BUILDING: "Creative Building",
  PRETEND_PLAY: "Pretend Play",
  ART_CRAFT: "Art & Craft",
  LEARNING: "Learning & Montessori",
  OUTDOOR: "Outdoor & Active",
  PLUSH: "Plush & Stuffed"
};
export default function OrderItemRow({
  item
}: OrderItemRowProps) {
  const categoryLabel = CATEGORY_LABELS[item.category] || "Toy";
  return <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 min-w-0" data-api-unique-id='orderitemrow-r0b0b026854317d1c-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
      {/* Product Image & Info */}
      <div className="flex items-start gap-4 min-w-0 flex-1" data-api-unique-id='orderitemrow-re84e48c624b14e36-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
        {/* Toy Image Snapshot */}
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl border border-border/50 overflow-hidden shrink-0 bg-muted" data-api-unique-id='orderitemrow-r93800435b7b99c07-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
          <EditableImg propKey={`toy-order-item-${item.productId}-${item.id}`} src={item.productImage ?? undefined} alt={item.productName} className="w-full h-full object-cover" data-api-unique-id='orderitemrow-rb83868a57eb2001c-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow' />
        </div>

        {/* Text Details */}
        <div className="min-w-0 flex-1 space-y-1.5" data-api-unique-id='orderitemrow-r1154b93bd2e5f9fc-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='orderitemrow-r5039c2e2b3415b4b-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
            <span className="bg-secondary text-secondary-foreground font-semibold text-[11px] px-2.5 py-0.5 rounded-full border border-border shrink-0" data-api-unique-id='orderitemrow-r5a160e897370ea04-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
              {categoryLabel}
            </span>
          </div>

          <h4 className="font-bold text-card-foreground text-sm sm:text-base leading-snug break-words" data-api-unique-id='orderitemrow-r0b1889ad9f6d125e-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
            {item.productName}
          </h4>

          {item.productSubtitle && <p className="text-xs text-muted-foreground line-clamp-1 break-words" data-api-unique-id='orderitemrow-rd80ad4ac7afbfee9-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
              {item.productSubtitle}
            </p>}

          {/* Unit Price Snapshot & Quantity formula */}
          <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5" data-api-unique-id='orderitemrow-r624a2e709dabb454-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
            <span data-api-unique-id='orderitemrow-raf51cfad5f7f0e44-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
              Snapshot Unit:{" "}
              <strong className="text-card-foreground font-semibold" data-api-unique-id='orderitemrow-r2ecf2d51932e9683-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
                ${item.unitPriceSnapshot.toFixed(2)}
              </strong>
            </span>
            <span className="text-border" data-api-unique-id='orderitemrow-rda22191258865331-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>•</span>
            <span data-api-unique-id='orderitemrow-r870e8ad603fc5b5c-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
              Qty:{" "}
              <strong className="text-card-foreground font-semibold" data-api-unique-id='orderitemrow-ra649cdb393efa851-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
                {item.quantity}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Line Subtotal */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-border/60 shrink-0" data-api-unique-id='orderitemrow-r39a934791df6646d-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
        <span className="text-xs text-muted-foreground uppercase font-semibold sm:hidden" data-api-unique-id='orderitemrow-r888df82e6efece95-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
          Line Subtotal
        </span>
        <div className="text-right" data-api-unique-id='orderitemrow-r73d0488b16ce3235-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
          <p className="text-base sm:text-lg font-extrabold font-display text-card-foreground" data-api-unique-id='orderitemrow-rf97bf395f859594a-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
            ${item.lineSubtotal.toFixed(2)}
          </p>
          <span className="text-[10px] text-muted-foreground font-medium hidden sm:inline-block" data-api-unique-id='orderitemrow-r17d4d5f220dabc12-s897429742' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderItemRow'>
            Locked Line Price
          </span>
        </div>
      </div>
    </div>;
}