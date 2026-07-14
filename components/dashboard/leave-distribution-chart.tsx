"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type ChartBar = {
  month: string;
  value: number;
  color: "cyan" | "violet";
};

type Dataset = "annual" | "sick";

const AXIS_MAX = 40;
const AXIS_TICKS = [40, 30, 20, 10, 0];

const datasets: Record<Dataset, ChartBar[]> = {
  annual: [
    { month: "Jan", value: 12, color: "cyan" },
    { month: "Feb", value: 18, color: "violet" },
    { month: "Mar", value: 8, color: "cyan" },
    { month: "Apr", value: 24, color: "cyan" },
    { month: "May", value: 34, color: "violet" },
    { month: "Jun", value: 20, color: "cyan" },
  ],
  sick: [
    { month: "Jan", value: 6, color: "violet" },
    { month: "Feb", value: 9, color: "cyan" },
    { month: "Mar", value: 14, color: "violet" },
    { month: "Apr", value: 7, color: "cyan" },
    { month: "May", value: 11, color: "violet" },
    { month: "Jun", value: 16, color: "cyan" },
  ],
};

export function LeaveDistributionChart() {
  const [active, setActive] = useState<Dataset>("annual");
  const bars = datasets[active];

  return (
    <div className="glass-panel flex h-[400px] flex-col rounded-xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-on-surface">
            Leave Distribution
          </h3>
          <p className="font-label-mono text-xs text-on-surface-variant/70">
            Aylık izin kullanım dağılımı
          </p>
        </div>
        <div className="flex gap-2">
          {(["annual", "sick"] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={active === key}
              onClick={() => setActive(key)}
              className={cn(
                "rounded-full border px-3 py-1 font-label-mono text-xs capitalize transition-colors",
                active === key
                  ? "border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan"
                  : "border-white/10 bg-surface-2 text-on-surface-variant hover:text-on-surface"
              )}
            >
              {key === "annual" ? "Annual" : "Sick"}
            </button>
          ))}
        </div>
      </div>

      {/* Plot area */}
      <div className="relative mt-auto flex flex-1 items-end justify-between border-b border-white/10 px-4 pb-4">
        {/* Y axis */}
        <div className="absolute bottom-4 left-0 top-0 flex w-8 flex-col justify-between font-label-mono text-[10px] text-on-surface-variant/50">
          {AXIS_TICKS.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        {/* Grid lines */}
        <div className="pointer-events-none absolute bottom-4 left-8 right-0 top-0 flex flex-col justify-between">
          {AXIS_TICKS.slice(1).map((tick) => (
            <div key={tick} className="h-0 w-full border-b border-white/5" />
          ))}
        </div>

        {/* Bars */}
        <div className="relative z-10 ml-8 flex h-[90%] w-full items-end justify-around">
          {bars.map(({ month, value, color }) => (
            <div
              key={month}
              className={cn(
                "group relative w-8 rounded-t-sm transition-all duration-300 md:w-12",
                color === "cyan" ? "chart-bar-cyan" : "chart-bar-violet"
              )}
              style={{ height: `${(value / AXIS_MAX) * 100}%` }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded border border-white/10 bg-surface-1 p-1 font-label-mono text-[10px] text-on-surface opacity-0 transition-opacity group-hover:opacity-100">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* X axis */}
      <div className="ml-8 mt-2 flex items-center justify-around font-label-mono text-[10px] uppercase text-on-surface-variant/70">
        {bars.map(({ month }) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}
