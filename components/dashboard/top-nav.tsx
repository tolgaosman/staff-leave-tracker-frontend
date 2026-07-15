"use client";

import { Menu } from "@base-ui/react/menu";
import { Popover } from "@base-ui/react/popover";
import { Bell, LogOut, Settings, SlidersHorizontal, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { UserMenu } from "@/components/dashboard/user-menu";
import { usePersonnel, useLeaveRequests } from "@/lib/data/store";
import { leaveTypeLabels } from "@/lib/data/types";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Genel Bakış" },
  { href: "/personnel", label: "Personel Listesi" },
  { href: "/leave-requests", label: "İzin Talepleri" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return "";
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(mins, 1)} dk önce`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} saat önce`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Dün" : `${days} gün önce`;
}

const iconButtonClasses =
  "flex size-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-black/5 hover:text-primary data-[popup-open]:bg-black/5 data-[popup-open]:text-primary";

const popupClasses =
  "glass-panel z-50 rounded-xl p-2 shadow-2xl outline-none transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0";

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const requests = useLeaveRequests();
  const personnel = usePersonnel();

  // Notifications = pending leave requests, most recent first.
  const notifications = useMemo(() => {
    const nameById = new Map(personnel.map((p) => [p.id, p.name]));
    return requests
      .filter((r) => r.status === "pending")
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        title: `${nameById.get(r.personnelId) ?? "Personel"} ${leaveTypeLabels[r.type].toLowerCase()} talep etti`,
        time: relativeTime(r.createdAt),
      }));
  }, [requests, personnel]);

  const settingsItems = [
    { label: "Profil", icon: User, onClick: () => router.push("/profile") },
    {
      label: "Tercihler",
      icon: SlidersHorizontal,
      onClick: () => router.push("/profile"),
    },
    { label: "Çıkış Yap", icon: LogOut, onClick: logout },
  ];

  return (
    <header className="absolute left-64 right-0 top-0 z-30 hidden h-20 items-center justify-between px-10 border-b border-outline-variant/20 bg-transparent md:flex">
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "pb-1 font-sans text-base transition-all",
              isActive(pathname, link.href)
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Popover.Root>
          <Popover.Trigger aria-label="Notifications" className={iconButtonClasses}>
            <span className="relative">
              <Bell className="size-5" />
              {notifications.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-destructive" />
              )}
            </span>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner sideOffset={12} align="end">
              <Popover.Popup className={`${popupClasses} w-80`}>
                <div className="border-b border-outline-variant/30 px-3 py-2">
                  <Popover.Title className="text-base font-bold text-on-surface">
                    Bildirimler
                  </Popover.Title>
                </div>
                {notifications.length === 0 ? (
                  <p className="px-3 py-6 text-center text-sm text-on-surface-variant">
                    Bekleyen bildirim yok
                  </p>
                ) : (
                  <ul className="py-1">
                    {notifications.map((n) => (
                      <li key={n.id}>
                        <Link
                          href="/leave-requests"
                          className="block cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-black/5"
                        >
                          <p className="text-sm leading-tight text-on-surface">
                            {n.title}
                          </p>
                          <p className="mt-0.5 font-label-mono text-xs text-on-surface-variant/70">
                            {n.time}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>

        {/* Settings */}
        <Menu.Root>
          <Menu.Trigger aria-label="Settings" className={iconButtonClasses}>
            <Settings className="size-5" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={12} align="end">
              <Menu.Popup className={`${popupClasses} w-52`}>
                {settingsItems.map(({ label, icon: Icon, onClick }) => (
                  <Menu.Item
                    key={label}
                    onClick={onClick}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-base text-on-surface outline-none transition-colors data-[highlighted]:bg-black/5 data-[highlighted]:text-primary"
                  >
                    <Icon className="size-4" />
                    {label}
                  </Menu.Item>
                ))}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>

        <UserMenu />
      </div>
    </header>
  );
}
