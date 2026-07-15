"use client";

import { Menu } from "@base-ui/react/menu";
import { Popover } from "@base-ui/react/popover";
import { Bell, LogOut, Settings, SlidersHorizontal, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
import { UserMenu } from "@/components/dashboard/user-menu";

type Notification = {
  id: number;
  title: string;
  time: string;
};

const notifications: Notification[] = [
  { id: 1, title: "Ayşe Yılmaz yıllık izin talep etti", time: "2 saat önce" },
  { id: 2, title: "Sistem 3 talebi onayladı", time: "4 saat önce" },
  { id: 3, title: "Mehmet Demir izinden döndü", time: "Dün" },
];

const iconButtonClasses =
  "flex size-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-black/5 hover:text-primary data-[popup-open]:bg-black/5 data-[popup-open]:text-primary";

const popupClasses =
  "glass-panel z-50 rounded-xl p-2 shadow-2xl outline-none transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0";

export function TopNav() {
  const router = useRouter();
  const { logout } = useAuth();

  const settingsItems = [
    { label: "Profil", icon: User, onClick: () => router.push("/profile") },
    { label: "Tercihler", icon: SlidersHorizontal, onClick: () => router.push("/profile") },
    { label: "Çıkış Yap", icon: LogOut, onClick: logout },
  ];

  return (
    <header className="absolute left-64 right-0 top-0 z-30 hidden h-20 items-center justify-between px-10 border-b border-outline-variant/20 bg-transparent md:flex">
      <div />

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
            <Popover.Positioner sideOffset={12} align="end" className="z-50">
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
                          <p className="mt-0.5 font-mono text-xs text-on-surface-variant/70">
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
            <Menu.Positioner sideOffset={12} align="end" className="z-50">
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
