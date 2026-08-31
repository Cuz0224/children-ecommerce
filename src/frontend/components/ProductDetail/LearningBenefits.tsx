"use client";

import React from "react";
import { ToyProduct } from "@/frontend/types/ProductDetail";
import { Brain, Boxes, Palette, Sparkles, Shield, Heart, CheckCircle2, Lightbulb } from "lucide-react";
interface LearningBenefitsProps {
  product: ToyProduct;
}
export default function LearningBenefits({
  product
}: LearningBenefitsProps) {
  const getIcon = (type?: string) => {
    switch (type) {
      case "brain":
        return <Brain className="h-6 w-6 text-primary" data-api-unique-id='learningbenefits-r6094c8f5ffbfba32-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' />;
      case "blocks":
        return <Boxes className="h-6 w-6 text-accent" data-api-unique-id='learningbenefits-r0cbc2f6b095157bd-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' />;
      case "palette":
        return <Palette className="h-6 w-6 text-primary" data-api-unique-id='learningbenefits-r45f29957db29a1c6-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' />;
      case "sparkles":
        return <Sparkles className="h-6 w-6 text-accent" data-api-unique-id='learningbenefits-r489d294c39f4e697-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' />;
      case "shield":
        return <Shield className="h-6 w-6 text-success" data-api-unique-id='learningbenefits-rb36590519a89c4e7-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' />;
      case "heart":
        return <Heart className="h-6 w-6 text-primary" data-api-unique-id='learningbenefits-ra8cad319673b8b97-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' />;
      default:
        return <Lightbulb className="h-6 w-6 text-accent" data-api-unique-id='learningbenefits-r2f248cf5e64580f3-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' />;
    }
  };
  const skills = product.developmentalSkills && product.developmentalSkills.length > 0 ? product.developmentalSkills : [{
    title: "Spatial Reasoning & Balance",
    description: "Cultivates structural equilibrium, geometric symmetry, and kinematic balance through tactile assembly.",
    iconType: "blocks" as const,
    tag: "Cognitive Mastery"
  }, {
    title: "Fine Motor Precision",
    description: "Refines pinch grip, hand-eye coordination, and finger agility with precision snap-fit components.",
    iconType: "brain" as const,
    tag: "Motor Skills"
  }, {
    title: "Active Problem-Solving",
    description: "Encourages trial, adjustment, and triumph when robotic configurations take their first mechanical steps.",
    iconType: "sparkles" as const,
    tag: "Growth Mindset"
  }, {
    title: "Social & Collaborative Play",
    description: "Fosters team storytelling, shared building missions, and patience with siblings or playmates.",
    iconType: "heart" as const,
    tag: "Social Emotional"
  }];
  const protagonist = skills[0];
  const supportingSkills = skills.slice(1, 4);
  const highlights = Array.isArray(product.highlights) ? product.highlights : [];
  return <section data-controller-name="Play & Learning Benefits" className="w-full space-y-8" data-api-unique-id='learningbenefits-r88eec06993d5051d-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border pb-4" data-api-unique-id='learningbenefits-re72d99c9c33e1196-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
        <div data-api-unique-id='learningbenefits-r90ebf916345c608e-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
          <span className="inline-block rounded-full bg-accent text-accent-foreground font-bold text-xs px-3 py-1 mb-2 shadow-sm" data-api-unique-id='learningbenefits-r729561a077e8a65a-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
            Childhood Development Archive
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display tracking-tight" data-api-unique-id='learningbenefits-r20ccd6f562f490d5-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
            Play & Learning Growth Benefits
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md" data-api-unique-id='learningbenefits-r09da2844494973a7-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
          Curated by early childhood educators to foster curious minds, resilient hands, and joyful imagination.
        </p>
      </div>

      {/* Hero Highlight Row + Surrounding 3 Compact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" data-api-unique-id='learningbenefits-r6ad5317af0b40525-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
        {/* Protagonist Spotlight Feature Card (50-60% width on Desktop) */}
        {protagonist && <div className="lg:col-span-6 rounded-2xl border border-border/50 bg-card text-card-foreground p-6 sm:p-8 shadow-md flex flex-col justify-between relative overflow-hidden" data-api-unique-id='learningbenefits-r3e1e70e7c8def52d-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
            <div className="space-y-4" data-api-unique-id='learningbenefits-r91520cdfbdcaff53-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
              <div className="flex items-center justify-between" data-api-unique-id='learningbenefits-r4f704f8d6a39b1ae-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-secondary shadow-sm" data-api-unique-id='learningbenefits-r792d0deb02ca60ba-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
                  {getIcon(protagonist.iconType)}
                </div>
                <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground text-xs font-black px-3 py-1 shadow-sm" data-api-unique-id='learningbenefits-r60af51e9a248d25b-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
                  {protagonist.tag}
                </span>
              </div>

              <div className="space-y-2" data-api-unique-id='learningbenefits-r4e4ee8289a5a4569-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground font-display" data-api-unique-id='learningbenefits-r10a1afbd71d163f6-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
                  {protagonist.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" data-api-unique-id='learningbenefits-ra3f98c5ccc8efc8a-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
                  {protagonist.description}
                </p>
              </div>

              {/* Deep dive highlights from product data */}
              {highlights.length > 0 && <div className="pt-3 border-t border-border/60 space-y-2.5" data-api-unique-id='learningbenefits-rf9eed612f5eeb6d5-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground" data-api-unique-id='learningbenefits-r8f058c24b42d3be7-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
                    Key Developmental Milestones:
                  </h4>
                  <ul className="space-y-2" data-api-unique-id='learningbenefits-r5ce6db4e2fcd3bb7-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
                    {highlights.slice(0, 3).map((item, index) => <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-foreground" data-api-unique-id='learningbenefits-race0a9beaef9be92-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1'>
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" data-api-unique-id='learningbenefits-r9f382e2dee067fb1-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1' />
                        <span data-api-unique-id='learningbenefits-r69147e09cfab3b1e-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1' data-api-bind-info={`highlights-${index}-$item`} data-api-map-var-name='item'>{item}</span>
                      </li>)}
                  </ul>
                </div>}
            </div>

            <div className="mt-6 rounded-xl border border-border bg-muted p-3.5 text-xs text-muted-foreground flex items-center gap-3" data-api-unique-id='learningbenefits-rd0cbe8bbdb47fe04-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
              <span className="h-2 w-2 rounded-full bg-primary shrink-0" data-api-unique-id='learningbenefits-rd2b499b89885338c-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' />
              <span data-api-unique-id='learningbenefits-r96c283be6ab10d7e-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>Recommended for supervised STEM exploration & independent problem discovery.</span>
            </div>
          </div>}

        {/* 3 Surrounding Compact Milestone Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4" data-api-unique-id='learningbenefits-r29b4737a763c954b-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
          {supportingSkills.map((skill, index) => <div key={index} className="rounded-2xl border border-border/50 bg-card text-card-foreground p-5 shadow-md hover:translate-x-1 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4" data-api-unique-id='learningbenefits-r01756b9fa80ab251-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1'>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-secondary shadow-sm" data-api-unique-id='learningbenefits-r7899d9eefd84df4c-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1'>
                {getIcon(skill.iconType)}
              </div>
              <div className="flex-1 min-w-0 space-y-1" data-api-unique-id='learningbenefits-r8689bf6ca12acfbb-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1'>
                <div className="flex items-center gap-2" data-api-unique-id='learningbenefits-re835d27a4bbcbf5e-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1'>
                  <h4 className="text-base font-bold text-foreground font-display" data-api-unique-id='learningbenefits-r058e4e59dbf898df-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1' data-api-bind-info={`supportingSkills-${index}-title`} data-api-map-var-name='skill'>
                    {skill.title}
                  </h4>
                  <span className="inline-flex rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 border border-border" data-api-unique-id='learningbenefits-r6641b77faef804ff-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1' data-api-bind-info={`supportingSkills-${index}-tag`} data-api-map-var-name='skill'>
                    {skill.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-snug" data-api-unique-id='learningbenefits-r31ec341836f42619-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits' data-api-in-loop='1' data-api-bind-info={`supportingSkills-${index}-description`} data-api-map-var-name='skill'>
                  {skill.description}
                </p>
              </div>
            </div>)}
        </div>
      </div>

      {/* Detailed Description Block */}
      {product.longDescription && <div className="rounded-2xl border border-border/50 bg-muted/50 p-6 sm:p-8 text-foreground space-y-3" data-api-unique-id='learningbenefits-rd872fa40fefa799c-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
          <h3 className="text-lg font-bold font-display text-foreground" data-api-unique-id='learningbenefits-r85f0ae479c335f11-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
            Architect & Educator Design Story
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" data-api-unique-id='learningbenefits-r999580425907ab80-s3004489906' data-api-unique-page-name='src/frontend/components/ProductDetail/LearningBenefits'>
            {product.longDescription}
          </p>
        </div>}
    </section>;
}