"use client";

import { CalendarClock, CircleCheckBig, CircleX, Users } from "lucide-react";

import { StatCard, type Stat } from "@/components/dashboard/stat-card";
import { useDashboardStats } from "@/lib/data/store";

export function DashboardStats() {
  const { totalPersonnel, pending, approved, rejected } = useDashboardStats();

  const stats: Stat[] = [
    {
      label: "GLOBAL FORCE",
      value: String(totalPersonnel),
      icon: Users,
      accent: "cyan",
      caption: "Total Personnel",
    },
    {
      label: "AWAITING ACTION",
      value: String(pending),
      icon: CalendarClock,
      accent: "cyan",
      action: "Review Now",
      actionHref: "/leave-requests",
      highlight: true,
    },
    {
      label: "CONFIRMED ABSENCE",
      value: String(approved),
      icon: CircleCheckBig,
      accent: "violet",
      caption: "Currently Approved",
    },
    {
      label: "DECLINED",
      value: String(rejected),
      icon: CircleX,
      accent: "neutral",
      caption: "Rejected Requests",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
