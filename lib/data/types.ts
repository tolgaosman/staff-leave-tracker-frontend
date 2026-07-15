/* Domain model for the leave-tracking app.
   Centralised here so pages/components share one source of truth. */

export type PersonnelStatus = "active" | "on-leave" | "inactive";

export type Personnel = {
  id: string;
  name: string;
  department: string;
  phone: string;
  status: PersonnelStatus;
  email?: string;
  /** Employment start date, ISO (yyyy-mm-dd) */
  startDate?: string;
};

export type LeaveType = "annual" | "sick" | "unpaid";
export type LeaveStatus = "pending" | "approved" | "rejected";

export type LeaveRequest = {
  id: string;
  personnelId: string;
  type: LeaveType;
  /** ISO yyyy-mm-dd */
  startDate: string;
  /** ISO yyyy-mm-dd */
  endDate: string;
  status: LeaveStatus;
  note?: string;
  /** ISO timestamp of creation, used for activity/sorting */
  createdAt: string;
};

/* ── Turkish display labels (single source for the UI) ── */

export const leaveTypeLabels: Record<LeaveType, string> = {
  annual: "Yıllık İzin",
  sick: "Hastalık İzni",
  unpaid: "Ücretsiz İzin",
};

export const leaveStatusLabels: Record<LeaveStatus, string> = {
  pending: "Bekliyor",
  approved: "Onaylandı",
  rejected: "Reddedildi",
};

export const personnelStatusLabels: Record<PersonnelStatus, string> = {
  active: "Aktif",
  "on-leave": "İzinde",
  inactive: "Pasif",
};

/** Whole days between two ISO dates, inclusive of both ends. */
export function leaveDayCount(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const ms = end.getTime() - start.getTime();
  if (Number.isNaN(ms) || ms < 0) return 0;
  return Math.floor(ms / 86_400_000) + 1;
}
