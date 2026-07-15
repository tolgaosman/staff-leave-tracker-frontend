import {
  CalendarDays,
  LayoutDashboard,
  Users,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Personnel List", icon: Users, href: "/personnel" },
  { label: "Leave Requests", icon: CalendarDays, href: "/leave-requests" },
  { label: "Playground", icon: FlaskConical, href: "/playground" },
];
