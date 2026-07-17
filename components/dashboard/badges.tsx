import {
  leaveStatusLabels,
  personnelStatusLabels,
  type LeaveStatus,
  type PersonnelStatus,
} from "@/lib/data/types";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 font-label-mono text-xs";

const leaveStatusStyles: Record<LeaveStatus, string> = {
  pending: "border-zinc-500/30 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
  approved: "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400",
  rejected: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
};

export function LeaveStatusBadge({ status }: { status: LeaveStatus }) {
  return (
    <span className={cn(base, leaveStatusStyles[status])}>
      {leaveStatusLabels[status]}
    </span>
  );
}

const personnelStatusStyles: Record<PersonnelStatus, string> = {
  active: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  "on-leave": "border-accent-violet/30 bg-accent-violet/10 text-accent-violet",
  inactive: "border-white/15 bg-white/5 text-on-surface-variant",
  resigned: "border-destructive/30 bg-destructive/5 text-destructive",
};

export function PersonnelStatusBadge({ status }: { status: PersonnelStatus }) {
  return (
    <span className={cn(base, personnelStatusStyles[status])}>
      {personnelStatusLabels[status]}
    </span>
  );
}
