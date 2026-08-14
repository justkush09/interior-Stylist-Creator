"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  Sparkles,
  ArrowLeft,
  DollarSign,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Leads Directory", href: "/admin/leads", icon: Users },
    { name: "Paid Consultations", href: "/admin/consultations", icon: Calendar },
    { name: "Settings & Pricing", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface/60 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-earth text-white p-6 flex flex-col justify-between border-r border-earth-muted/30 shrink-0">
        <div className="space-y-8">
          {/* Admin Header */}
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-primary-light hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Studio Site</span>
            </Link>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary-light">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-serif text-lg font-medium text-surface">Stylist Admin</h1>
                <p className="text-[10px] text-surface/60 uppercase tracking-widest">Management System</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-surface/70 hover:bg-earth-muted/30 hover:text-white"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-earth-muted/30 text-[11px] text-surface/50">
          <p>Indian Minimalist CRM v1.0</p>
          <p className="pt-1">Logged in as Lead Interior Stylist</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
