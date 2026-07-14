"use client";

import { Menu } from "@base-ui/react/menu";
import { CheckCheck, Eye, MoreHorizontal } from "lucide-react";

const items = [
  { label: "Tümünü okundu işaretle", icon: CheckCheck },
  { label: "Tüm etkinlikleri gör", icon: Eye },
];

export function CardMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="More options"
        className="text-on-surface-variant outline-none transition-colors hover:text-accent-cyan data-[popup-open]:text-accent-cyan"
      >
        <MoreHorizontal className="size-5" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="end">
          <Menu.Popup className="glass-panel z-50 w-56 rounded-xl p-2 shadow-2xl outline-none transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            {items.map(({ label, icon: Icon }) => (
              <Menu.Item
                key={label}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface outline-none transition-colors data-[highlighted]:bg-white/5 data-[highlighted]:text-accent-cyan"
              >
                <Icon className="size-4" />
                {label}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
