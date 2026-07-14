import { CalendarClock, CircleCheckBig, Users } from "lucide-react";

import { LeaveDistributionChart } from "@/components/dashboard/leave-distribution-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StatCard, type Stat } from "@/components/dashboard/stat-card";

const stats: Stat[] = [
  {
    label: "Total Personnel",
    value: "124",
    icon: Users,
    accent: "cyan",
    trend: "+12%",
    caption: "vs last month",
  },
  {
    label: "Pending",
    value: "8",
    icon: CalendarClock,
    accent: "cyan",
    action: "Action Required",
    actionHref: "/leave-requests",
    highlight: true,
  },
  {
    label: "Approved",
    value: "45",
    icon: CircleCheckBig,
    accent: "violet",
    caption: "This Week",
  },
];

export default function IzinTakipDashboard() {
  return (
    <>
      {/* Page header */}
      <div className="mb-8">
        <h2 className="mb-2 text-5xl font-bold tracking-tight text-on-surface md:text-6xl">
          Genel Bakış
        </h2>
        <p className="max-w-2xl text-base text-on-surface-variant">
          Personel metrikleri ve bekleyen işlemlerin gerçek zamanlı görünümü.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Chart + activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LeaveDistributionChart />
        </div>
        <RecentActivity />
      </div>
    </>
  );
}
