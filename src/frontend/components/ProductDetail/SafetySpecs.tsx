"use client";

import React from "react";
import { ToyProduct, CATEGORY_LABELS, AGE_GROUP_LABELS } from "@/frontend/types/ProductDetail";
import { ShieldCheck, Check, FileCheck2, PackageCheck, Layers } from "lucide-react";
interface SafetySpecsProps {
  product: ToyProduct;
}
export default function SafetySpecs({
  product
}: SafetySpecsProps) {
  const specs = [{
    label: "Product SKU",
    value: product.sku
  }, {
    label: "Category",
    value: CATEGORY_LABELS[product.category] || product.category
  }, {
    label: "Target Age",
    value: AGE_GROUP_LABELS[product.ageGroup] || product.ageGroup
  }, {
    label: "Dimensions",
    value: product.dimensions || '14.2" x 9.8" x 3.6"'
  }, {
    label: "Primary Materials",
    value: product.materials || "Non-Toxic ABS & Natural Hardwood"
  }, {
    label: "Certifications",
    value: product.safetyCertification || "ASTM F963, CE Mark, CPC"
  }, {
    label: "Battery Required",
    value: "None (Solar & Hydraulic Powered)"
  }, {
    label: "Care Instructions",
    value: "Wipe clean with damp cloth; do not submerge solar capsule"
  }];
  return <section data-controller-name="Safety & Specifications Panel" className="w-full space-y-8" data-api-unique-id='safetyspecs-r512995c4b7af5fd0-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border pb-4" data-api-unique-id='safetyspecs-r14d43baef7d8ebe2-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
        <div data-api-unique-id='safetyspecs-ra10b0d3cdb6ee3d2-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
          <span className="inline-block rounded-full bg-success text-success-foreground font-bold text-xs px-3 py-1 mb-2 shadow-sm" data-api-unique-id='safetyspecs-rbd9ef46d279cf7f8-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
            Parent Peace of Mind
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display tracking-tight" data-api-unique-id='safetyspecs-r77bb09c5078d06fb-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
            Safety Standards & Box Anatomy
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md" data-api-unique-id='safetyspecs-r70ff4b34b528453a-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
          Every ToyJoy creation undergoes 18 distinct drop, torque, and toxicity lab tests before meeting your family.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-api-unique-id='safetyspecs-r1ad9e28a7f00bb51-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
        {/* Left Column: Physical Safety Stamp & Lab Certification Seal */}
        <div className="lg:col-span-5 flex flex-col gap-6" data-api-unique-id='safetyspecs-r265679b3ded30413-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
          {/* Main Inspection Seal Card */}
          <div className="rounded-2xl border border-border/50 bg-card text-card-foreground p-6 sm:p-7 shadow-md space-y-5 relative overflow-hidden" data-api-unique-id='safetyspecs-rba9d77dadeb30f5d-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
            {/* Top Badge */}
            <div className="flex items-center justify-between" data-api-unique-id='safetyspecs-rafc946506817fa5f-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
              <div className="flex items-center gap-2" data-api-unique-id='safetyspecs-re2139f4996425b61-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success text-success-foreground shadow-sm" data-api-unique-id='safetyspecs-r315ef5b92a5ab75e-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                  <ShieldCheck className="h-5 w-5" data-api-unique-id='safetyspecs-rbfc7ec6770e52ee7-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' />
                </div>
                <div data-api-unique-id='safetyspecs-r5d0391b4203f3d84-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                  <h3 className="text-base font-extrabold text-foreground font-display" data-api-unique-id='safetyspecs-r11e47d55f1ab759a-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                    Certified Child-Safe
                  </h3>
                  <span className="text-[11px] text-muted-foreground font-medium" data-api-unique-id='safetyspecs-rfdfc43a9c64ba62e-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                    100% Non-Toxic Compliance
                  </span>
                </div>
              </div>
              <span className="inline-flex rounded-full bg-secondary text-secondary-foreground text-xs font-mono font-bold px-2.5 py-1 border border-border" data-api-unique-id='safetyspecs-r09fbfab0ef9a28e9-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                PASS: 2025 Lab Test
              </span>
            </div>

            {/* Certification Stamp Details */}
            <div className="rounded-xl border border-dashed border-success/60 bg-success/10 p-4 space-y-3" data-api-unique-id='safetyspecs-r9226dca48c81ea76-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
              <div className="flex items-center gap-2 text-success font-bold text-xs uppercase tracking-wider" data-api-unique-id='safetyspecs-reb899efb1ad2df0c-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                <FileCheck2 className="h-4 w-4" data-api-unique-id='safetyspecs-r2de6010ec2c69855-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' />
                <span data-api-unique-id='safetyspecs-r08dc2c1a1d01bfe8-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>Accredited Safety Compliance</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed" data-api-unique-id='safetyspecs-rfc045026b883bba6-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                Tested against <strong data-api-unique-id='safetyspecs-r84b7d9544cc1dfa1-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>ASTM F963-17</strong>, <strong data-api-unique-id='safetyspecs-r6d039ec5de863c92-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>CPSIA Section 108</strong>, and <strong data-api-unique-id='safetyspecs-ra224dd5959d07039-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>EN71</strong> European standards. Completely free of BPA, phthalates, heavy metals, and lead.
              </p>
            </div>

            {/* Safety Pillars */}
            <div className="space-y-3 pt-2" data-api-unique-id='safetyspecs-r29124f64897a531b-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
              <div className="flex items-start gap-3" data-api-unique-id='safetyspecs-r7d2ad95cb0f2c662-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground" data-api-unique-id='safetyspecs-r091c2bb04373bb4b-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                  <Check className="h-3.5 w-3.5 text-success" data-api-unique-id='safetyspecs-r0b14d64f23040a48-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' />
                </div>
                <div data-api-unique-id='safetyspecs-rc2ff14a845a965da-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                  <p className="text-xs font-bold text-foreground" data-api-unique-id='safetyspecs-r503470b60745b745-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>Anti-Pinch Rounded Radii</p>
                  <p className="text-[11px] text-muted-foreground" data-api-unique-id='safetyspecs-rab33ee5d05126da6-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>Every contour is precision-buffed with zero sharp injection burrs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-api-unique-id='safetyspecs-r3c5e477fddbb585d-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground" data-api-unique-id='safetyspecs-r69aa68978330639f-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                  <Check className="h-3.5 w-3.5 text-success" data-api-unique-id='safetyspecs-rf4dc2e31cadb2d76-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' />
                </div>
                <div data-api-unique-id='safetyspecs-r0001ae6f0521563e-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                  <p className="text-xs font-bold text-foreground" data-api-unique-id='safetyspecs-rc9bf17d78afe57d4-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>Drop-Proof High-Impact Polymers</p>
                  <p className="text-[11px] text-muted-foreground" data-api-unique-id='safetyspecs-rc320beb32b31725d-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>Withstands repeated 2-meter concrete drop impacts without shattering.</p>
                </div>
              </div>

              <div className="flex items-start gap-3" data-api-unique-id='safetyspecs-r83c99deaeefdd84c-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground" data-api-unique-id='safetyspecs-ra4c98775bde4c76c-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                  <Check className="h-3.5 w-3.5 text-success" data-api-unique-id='safetyspecs-r53de1cffc5d56a77-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' />
                </div>
                <div data-api-unique-id='safetyspecs-r9ecefc7f868c5ae8-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                  <p className="text-xs font-bold text-foreground" data-api-unique-id='safetyspecs-r22cd904f766c0995-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>Eco-Friendly Packaging</p>
                  <p className="text-[11px] text-muted-foreground" data-api-unique-id='safetyspecs-rc65cc4497ad546fe-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>Printed with soy-based vegetable inks on 100% recycled unbleached kraft board.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: What's in the Box Checklist & Full Specs Table */}
        <div className="lg:col-span-7 space-y-6" data-api-unique-id='safetyspecs-rb89bff227b1d72e7-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
          {/* Box Contents Checklist Card */}
          <div className="rounded-2xl border border-border/50 bg-card text-card-foreground p-6 sm:p-7 shadow-md space-y-4" data-api-unique-id='safetyspecs-rf1c334a978c4ab93-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
            <div className="flex items-center gap-2" data-api-unique-id='safetyspecs-r4174165f28a0cf3e-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
              <PackageCheck className="h-5 w-5 text-primary" data-api-unique-id='safetyspecs-r8d105253fd15b36a-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' />
              <h3 className="text-lg font-bold text-foreground font-display" data-api-unique-id='safetyspecs-r8a9cdc909849d34c-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                What&apos;s Included in the Box
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1" data-api-unique-id='safetyspecs-r18be38c347d129e5-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
              {(product.boxIncludes || []).map((item, index) => <div key={index} className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/60 p-3" data-api-unique-id='safetyspecs-r523f966700680451-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' data-api-in-loop='1'>
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold mt-0.5 shadow-sm" data-api-unique-id='safetyspecs-r283a06ab423bb528-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' data-api-in-loop='1'>
                    {index + 1}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground leading-snug" data-api-unique-id='safetyspecs-r4b55536b6d781a75-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' data-api-in-loop='1' data-api-bind-info={`list-${index}-$item`} data-api-map-var-name='item'>
                    {item}
                  </span>
                </div>)}
            </div>
          </div>

          {/* Detailed Specifications Data Table */}
          <div className="rounded-2xl border border-border/50 bg-card text-card-foreground p-6 sm:p-7 shadow-md space-y-4" data-api-unique-id='safetyspecs-rf72254e4a6b94f3a-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
            <div className="flex items-center gap-2" data-api-unique-id='safetyspecs-rcdd64828c516f372-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
              <Layers className="h-5 w-5 text-accent" data-api-unique-id='safetyspecs-r339e73eed9564db7-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' />
              <h3 className="text-lg font-bold text-foreground font-display" data-api-unique-id='safetyspecs-r7779e9d813b9e785-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                Complete Technical Specifications
              </h3>
            </div>

            <div className="overflow-x-auto" data-api-unique-id='safetyspecs-rd09156e61e7f59ae-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
              <table className="w-full text-left text-xs sm:text-sm border-collapse" data-api-unique-id='safetyspecs-r3f52c7c46abe3e02-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                <tbody data-api-unique-id='safetyspecs-r5918d8fb9d2c2821-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs'>
                  {specs.map((row, index) => <tr key={index} className="border-b border-border/60 last:border-0 hover:bg-muted/40 transition-colors" data-api-unique-id='safetyspecs-re89a1be3d4c5e264-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' data-api-in-loop='1'>
                      <td className="py-2.5 pr-4 font-bold text-muted-foreground whitespace-nowrap w-1/3" data-api-unique-id='safetyspecs-raf3b1c56d0436dca-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' data-api-in-loop='1' data-api-bind-info={`specs-${index}-label`} data-api-map-var-name='row'>
                        {row.label}
                      </td>
                      <td className="py-2.5 text-foreground font-medium" data-api-unique-id='safetyspecs-r1a5c4cabb5f623fe-s980473468' data-api-unique-page-name='src/frontend/components/ProductDetail/SafetySpecs' data-api-in-loop='1' data-api-bind-info={`specs-${index}-value`} data-api-map-var-name='row'>
                        {row.value}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>;
}