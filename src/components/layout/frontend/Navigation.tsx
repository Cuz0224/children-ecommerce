'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, ShoppingBag, User, LogOut, Menu, X, Package, MoreHorizontal, Store } from 'lucide-react';
import { useUserSession } from '@/tools/FrontendSession';
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  requireAuth?: boolean;
}
export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    username,
    token,
    role,
    reset
  } = useUserSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navTrackRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const isCustomer = Boolean(token && role === 'CUSTOMER');
  const allNavItems: NavItem[] = [{
    id: 'home',
    label: 'Storefront',
    href: '/',
    icon: Store
  }, {
    id: 'cart',
    label: 'Cart',
    href: '/checkout',
    icon: ShoppingBag
  }, ...(isCustomer ? [{
    id: 'orders',
    label: 'Orders',
    href: '/orderhistory',
    icon: Package,
    requireAuth: true
  }] : [])];
  const [visibleCount, setVisibleCount] = useState<number>(allNavItems.length);

  // ResizeObserver for dynamic More menu calculation
  useEffect(() => {
    const handleMeasure = () => {
      if (!navTrackRef.current) return;
      const trackWidth = navTrackRef.current.offsetWidth;
      // Estimate 110px per tab plus 60px for more button
      const estimatedItemWidth = 120;
      const maxDirect = Math.max(1, Math.floor((trackWidth - 60) / estimatedItemWidth));
      if (allNavItems.length > maxDirect && maxDirect > 0) {
        setVisibleCount(Math.min(allNavItems.length, maxDirect));
      } else {
        setVisibleCount(allNavItems.length);
      }
    };
    handleMeasure();
    const observer = new ResizeObserver(handleMeasure);
    if (navTrackRef.current) {
      observer.observe(navTrackRef.current);
    }
    return () => observer.disconnect();
  }, [allNavItems.length]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userDropdownRef.current && !userDropdownRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(target)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSignOut = () => {
    reset();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/');
  };
  const currentPath = (pathname || '').replace(/\/$/, '') || '/';
  const visibleItems = allNavItems.slice(0, visibleCount);
  const overflowItems = allNavItems.slice(visibleCount);
  return <header className="sticky top-0 z-50 bg-background border-b border-border transition-all">
      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl py-1 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center border border-border/50 shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-transform duration-200">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-foreground flex items-center leading-none">
            Toy<span className="text-primary">Joy</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div ref={navTrackRef} className="hidden md:flex flex-1 min-w-0 items-center gap-2 px-2 overflow-visible">
          {visibleItems.map((item, index) => {
          const isActive = currentPath === item.href || item.href !== '/' && currentPath.startsWith(item.href);
          const Icon = item.icon;
          return <Link key={item.id} href={item.href} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all shrink-0 whitespace-nowrap ${isActive ? 'bg-primary text-primary-foreground border border-border/50 shadow-sm' : 'text-foreground hover:text-primary hover:bg-secondary/70 border border-transparent'}`}>
                <Icon className="w-4 h-4 stroke-2" />
                <span>{item.label}</span>
              </Link>;
        })}

          {overflowItems.length > 0 && <div ref={moreDropdownRef} className="relative shrink-0">
              <button type="button" onClick={() => setMoreMenuOpen(!moreMenuOpen)} aria-expanded={moreMenuOpen} aria-haspopup="true" className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${overflowItems.some(item => currentPath === item.href) ? 'bg-primary text-primary-foreground border-border/50 shadow-sm' : 'text-foreground hover:bg-secondary/70 border-transparent hover:border-border'}`}>
                <span>More</span>
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {moreMenuOpen && <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-card border border-border/50 shadow-md py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {overflowItems.map((item, index) => {
              const isActive = currentPath === item.href;
              const Icon = item.icon;
              return <Link key={item.id} href={item.href} onClick={() => setMoreMenuOpen(false)} className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold transition-colors ${isActive ? 'bg-secondary text-primary' : 'text-foreground hover:bg-secondary/60'}`}>
                        <Icon className="w-4 h-4 stroke-2" />
                        <span>{item.label}</span>
                      </Link>;
            })}
                </div>}
            </div>}
        </div>

        {/* Account & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Cart Action Button */}
          <Link href="/checkout" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm border border-border/50 shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0" aria-label="Shopping Cart">
            <ShoppingBag className="w-4 h-4 stroke-2" />
            <span className="text-xs hidden sm:inline">Cart</span>
          </Link>

          {isCustomer ? <div ref={userDropdownRef} className="relative">
              <button type="button" onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary text-secondary-foreground border border-border/50 hover:border-border transition-all cursor-pointer shadow-sm" aria-expanded={userDropdownOpen} aria-haspopup="true">
                <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xs border border-border/50">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold truncate max-w-[90px] hidden md:inline">
                  {username || 'Customer'}
                </span>
              </button>

              {userDropdownOpen && <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border/50 shadow-md p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <div className="text-xs font-bold text-foreground truncate">{username || 'Customer Account'}</div>
                    <div className="text-[10px] text-muted-foreground font-medium">ToyJoy Member</div>
                  </div>
                  <Link href="/orderhistory" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-foreground hover:bg-secondary transition-colors">
                    <Package className="w-4 h-4 text-primary" />
                    <span>My Orders</span>
                  </Link>
                  <button type="button" onClick={handleSignOut} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer text-left mt-1">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>}
            </div> : <div className="flex items-center gap-2">
              <Link href="/customerlogin" className="px-3.5 py-2 rounded-xl text-xs font-bold text-foreground hover:text-primary hover:bg-secondary/70 border border-border/50 transition-all whitespace-nowrap">
                Sign In
              </Link>
              <Link href="/customerregister" className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-bold bg-secondary text-secondary-foreground hover:bg-muted border border-border/50 hover:border-border transition-all whitespace-nowrap">
                Register
              </Link>
            </div>}

          {/* Mobile Menu Toggle Button */}
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border/50 hover:border-border text-foreground transition-all cursor-pointer" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && <div className="md:hidden border-t border-border bg-background p-4 animate-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto space-y-2">
            {allNavItems.map((item, index) => {
          const isActive = currentPath === item.href;
          const Icon = item.icon;
          return <Link key={item.id} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between px-4 py-2.5 rounded-xl border font-bold text-sm transition-all ${isActive ? 'bg-primary text-primary-foreground border-border/50 shadow-sm' : 'bg-card border-border text-foreground hover:border-border'}`}>
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <Sparkles className="w-4 h-4 opacity-50" />
                </Link>;
        })}

            {!isCustomer && <div className="pt-2 grid grid-cols-2 gap-2 border-t border-border mt-2">
                <Link href="/customerlogin" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center py-2.5 rounded-xl bg-card border border-border/50 font-bold text-xs text-foreground">
                  Sign In
                </Link>
                <Link href="/customerregister" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center py-2.5 rounded-xl bg-secondary border border-border/50 font-bold text-xs text-foreground">
                  Register
                </Link>
              </div>}
          </div>
        </div>}
    </header>;
}
