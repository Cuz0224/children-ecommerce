'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Package, LogOut, ShieldCheck, CircleDot } from 'lucide-react';
import { useAdminSession } from '@/tools/BackendSession';
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    username,
    token,
    reset
  } = useAdminSession();
  const handleSignOut = () => {
    reset();
    router.push('/adminlogin');
  };
  const navItems = [{
    label: 'Products',
    href: '/productcatalogadmin',
    icon: Package
  }];
  const currentPath = (pathname || '').replace(/\/$/, '') || '/';
  return <aside className="w-60 h-full min-h-0 shrink-0 flex flex-col bg-sidebar text-sidebar-foreground border-r-2 border-sidebar-border select-none">
      {/* Brand Header */}
      <div className="p-4 shrink-0 border-b border-sidebar-border">
        <Link href="/productcatalogadmin" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center border border-border/50 shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
          <div className="min-w-0">
            <div className="font-display font-extrabold text-base text-sidebar-foreground tracking-tight leading-none flex items-center gap-1">
              Toy<span className="text-sidebar-primary">Joy</span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border">
                OPS
              </span>
            </div>
            <div className="text-[11px] font-medium text-muted-foreground truncate leading-tight mt-1">
              Admin Console
            </div>
          </div>
        </Link>

        {/* Console Live Status Indicator */}
        <div className="mt-3.5 px-2.5 py-1.5 rounded-xl bg-secondary/80 border border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <CircleDot className="w-3.5 h-3.5 text-success animate-pulse shrink-0" />
            <span className="text-[11px] font-bold text-foreground truncate">Live Storefront</span>
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground shrink-0">Admin</span>
        </div>
      </div>

      {/* Navigation Menu List */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
          Catalog &amp; Store Management
        </div>
        {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
        if (isActive) {
          return <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground font-bold border border-border/50 shadow-sm transition-all min-w-0">
                <Icon className="w-4 h-4 shrink-0 stroke-2" />
                <span className="text-xs min-w-0 truncate whitespace-nowrap">{item.label}</span>
              </Link>;
        }
        return <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium transition-colors min-w-0 border border-transparent hover:border-sidebar-border">
              <Icon className="w-4 h-4 shrink-0 text-muted-foreground stroke-2" />
              <span className="text-xs min-w-0 truncate whitespace-nowrap">{item.label}</span>
            </Link>;
      })}
      </nav>

      {/* Admin Profile & Session Footer */}
      <div className="p-3 shrink-0 border-t border-sidebar-border bg-sidebar-accent/50 space-y-2">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-sidebar border border-sidebar-border">
          <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xs border border-border/50 shadow-sm shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-sidebar-foreground truncate">
              {username || (token ? 'Administrator' : 'Admin User')}
            </div>
            <div className="text-[10px] font-medium text-muted-foreground truncate">
              Catalog Manager
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-success shrink-0" title="Online" />
        </div>

        <button type="button" onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 border border-border transition-colors cursor-pointer">
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>;
}
