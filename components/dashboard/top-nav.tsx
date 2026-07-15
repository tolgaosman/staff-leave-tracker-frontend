"use client";

import { Menu } from "@base-ui/react/menu";
import { Popover } from "@base-ui/react/popover";
import { Bell, LogOut, Search, Settings, SlidersHorizontal, User } from "lucide-react";
import { useState } from "react";

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

const settingsItems = [
  { label: "Profil", icon: User },
  { label: "Tercihler", icon: SlidersHorizontal },
  { label: "Çıkış Yap", icon: LogOut },
];

const iconButtonClasses =
  "flex size-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/5 hover:text-accent-cyan data-[popup-open]:bg-white/5 data-[popup-open]:text-accent-cyan";

const popupClasses =
  "glass-panel z-50 rounded-xl p-2 shadow-2xl outline-none transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0";

export function TopNav() {
  const [query, setQuery] = useState("");

  return (
    <header className="fixed left-[calc(16rem+24px)] right-6 top-0 z-50 mt-4 hidden items-center justify-between rounded-full border border-white/10 bg-surface-1/10 px-6 py-3 shadow-lg backdrop-blur-md md:flex">
      <label className="flex w-64 items-center rounded-full border border-white/5 bg-surface-2/50 px-4 py-2 transition-colors focus-within:border-accent-cyan/50">
        <Search className="mr-2 size-5 text-on-surface-variant" />
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border-none bg-transparent text-base text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0"
        />
      </label>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Popover.Root>
          <Popover.Trigger aria-label="Notifications" className={iconButtonClasses}>
            <span className="relative">
              <Bell className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent-cyan" />
            </span>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner sideOffset={12} align="end">
              <Popover.Popup className={`${popupClasses} w-80`}>
                <div className="border-b border-white/10 px-3 py-2">
                  <Popover.Title className="text-base font-bold text-on-surface">
                    Bildirimler
                  </Popover.Title>
                </div>
                <ul className="py-1">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                    >
                      <p className="text-sm leading-tight text-on-surface">
                        {n.title}
                      </p>
                      <p className="mt-0.5 font-label-mono text-xs text-on-surface-variant/70">
                        {n.time}
                      </p>
                    </li>
                  ))}
                </ul>
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
                {settingsItems.map(({ label, icon: Icon }) => (
                  <Menu.Item
                    key={label}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-base text-on-surface outline-none transition-colors data-[highlighted]:bg-white/5 data-[highlighted]:text-accent-cyan"
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
