"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/components/dashboard/nav-items";
import { NewRequestDialog } from "@/components/dashboard/new-request-dialog";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/10 bg-surface-1/10 p-6 shadow-[0_0_40px_rgba(0,220,229,0.1)] backdrop-blur-xl md:flex">
      <div className="mb-10 mt-4 flex items-center gap-3 px-4">
        <img
          src="/assets/browserLogo.png"
          alt="İzin Takip Sistemi Logo"
          className="h-9 w-9 object-contain"
        />
        <div>
          <h1 className="text-lg font-bold leading-tight text-on-surface">
            İzin Takip Sistemi
          </h1>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {navItems.map(({ label, icon: Icon, href }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-all active:scale-95",
                active
                  ? "border border-accent-cyan/30 bg-accent-cyan/15 text-accent-cyan shadow-[0_0_15px_rgba(0,220,229,0.2)]"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              )}
            >
              <Icon className="size-5" />
              <span className={cn("text-base", active && "font-bold")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <NewRequestDialog />
      </div>
    </nav>
  );
}
