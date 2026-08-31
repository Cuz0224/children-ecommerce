import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Truck, RotateCcw, HeartHandshake, Award } from 'lucide-react';
export function Footer() {
  const customerCareLinks = [{
    label: 'Storefront',
    href: '/'
  }, {
    label: 'Cart & Checkout',
    href: '/checkout'
  }, {
    label: 'Order History',
    href: '/orderhistory'
  }, {
    label: 'Customer Sign In',
    href: '/customerlogin'
  }, {
    label: 'Customer Registration',
    href: '/customerregister'
  }];
  return <footer className="bg-card border-t border-border mt-auto">
      {/* Commitment Banner */}
      <div className="border-b border-border bg-secondary/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-success text-success-foreground flex items-center justify-center shrink-0 border border-border/50 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground truncate">100% Certified Safe</div>
                <div className="text-xs text-muted-foreground truncate">BPA-free &amp; non-toxic</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 border border-border/50 shadow-sm">
                <Truck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground truncate">Speedy Toy Express</div>
                <div className="text-xs text-muted-foreground truncate">Free shipping over $45</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shrink-0 border border-border/50 shadow-sm">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground truncate">Happy Play Guarantee</div>
                <div className="text-xs text-muted-foreground truncate">30-day hassle-free returns</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-info text-info-foreground flex items-center justify-center shrink-0 border border-border/50 shadow-sm">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground truncate">Play With Purpose</div>
                <div className="text-xs text-muted-foreground truncate">1% donated to children's play</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center border border-border/50 shadow-sm">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-foreground">
                Toy<span className="text-primary">Joy</span>
              </span>
            </Link>
            <p className="text-sm font-body text-muted-foreground leading-relaxed max-w-sm">
              Sparking curiosity, joyful laughter, and tactile creativity. We design and curate award-winning toys tested by real kids and certified by leading safety laboratories.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border text-xs font-semibold">
              <Award className="w-4 h-4 text-accent" />
              <span>National Parenting Toy Awards Winner 2024</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <div className="text-sm font-bold font-header text-foreground uppercase tracking-wide">
              Quick Navigation
            </div>
            <ul className="space-y-2">
              {customerCareLinks.map((item, index) => <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block">
                    {item.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Experience Notice */}
          <div className="space-y-3">
            <div className="text-sm font-bold font-header text-foreground uppercase tracking-wide">
              Storefront Experience
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ToyJoy is a simulated toy store shopping platform designed for educational play, high-quality wooden toys, and family entertainment.
            </p>
            <div className="p-3 rounded-xl bg-muted/60 border border-border text-xs text-muted-foreground">
              Safe checkout simulation with real-time stock and promo management.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-medium">
          <div>
            © {new Date().getFullYear()} ToyJoy Playworks Inc. All playful rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/" className="hover:text-foreground transition-colors">Terms of Play</Link>
            <span>•</span>
            <Link href="/" className="hover:text-foreground transition-colors">Safety Protocol</Link>
          </div>
        </div>
      </div>
    </footer>;
}
