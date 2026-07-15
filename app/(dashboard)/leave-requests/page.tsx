"use client";

import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Avatar } from "@/components/dashboard/avatar";
import { LeaveStatusBadge } from "@/components/dashboard/badges";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { LeaveDialog } from "@/components/dashboard/leave-dialog";
import { Button } from "@/components/ui/button";
import {
  deleteLeaveRequest,
  setLeaveStatus,
  usePersonnel,
  useLeaveRequests,
} from "@/lib/data/store";
import {
  leaveDayCount,
  leaveStatusLabels,
  leaveTypeLabels,
  type LeaveRequest,
  type LeaveStatus,
} from "@/lib/data/types";
import { cn } from "@/lib/utils";

type Filter = LeaveStatus | "all";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "pending", label: leaveStatusLabels.pending },
  { value: "approved", label: leaveStatusLabels.approved },
  { value: "rejected", label: leaveStatusLabels.rejected },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("tr-TR");
}

export default function LeaveRequestsPage() {
  const requests = useLeaveRequests();
  const personnel = usePersonnel();

  const [filter, setFilter] = useState<Filter>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<LeaveRequest | null>(null);
  const [toDelete, setToDelete] = useState<LeaveRequest | null>(null);

  const nameById = useMemo(
    () => new Map(personnel.map((p) => [p.id, p.name])),
    [personnel]
  );

  const visible = useMemo(() => {
    const list =
      filter === "all"
        ? requests
        : requests.filter((r) => r.status === filter);
    return [...list].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
  }, [requests, filter]);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(l: LeaveRequest) {
    setEditing(l);
    setDialogOpen(true);
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="mb-2 text-5xl font-bold tracking-tight text-on-surface md:text-6xl">
            İzin Talepleri
          </h2>
          <p className="max-w-2xl text-base text-on-surface-variant">
            Bekleyen ve geçmiş izin taleplerinin yönetimi.
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="h-auto gap-2 bg-accent-cyan px-4 py-2.5 text-base font-bold text-white hover:bg-accent-cyan/90"
        >
          <Plus className="size-5" />
          İzin Ekle
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => {
          const count =
            f.value === "all"
              ? requests.length
              : requests.filter((r) => r.status === f.value).length;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={cn(
                "rounded-full border px-4 py-1.5 font-label-mono text-xs transition-colors",
                filter === f.value
                  ? "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan"
                  : "border-white/10 bg-surface-2/50 text-on-surface-variant hover:text-on-surface"
              )}
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="glass-panel overflow-hidden rounded-xl">
        {visible.length === 0 ? (
          <p className="p-16 text-center text-base text-on-surface-variant">
            Bu görünümde izin talebi yok.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-white/10 font-label-mono text-xs uppercase tracking-wider text-on-surface-variant">
                  <th className="px-6 py-4 font-medium">Personel</th>
                  <th className="px-6 py-4 font-medium">İzin Türü</th>
                  <th className="px-6 py-4 font-medium">Başlangıç</th>
                  <th className="px-6 py-4 font-medium">Bitiş</th>
                  <th className="px-6 py-4 font-medium">Durum</th>
                  <th className="px-6 py-4 text-right font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((l) => {
                  const name = nameById.get(l.personnelId) ?? "Bilinmeyen";
                  return (
                    <tr
                      key={l.id}
                      className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={name} className="size-9 shrink-0" />
                          <span className="font-medium text-on-surface">
                            {name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {leaveTypeLabels[l.type]}
                        <span className="ml-2 font-label-mono text-xs text-on-surface-variant/60">
                          {leaveDayCount(l.startDate, l.endDate)} gün
                        </span>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {formatDate(l.startDate)}
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {formatDate(l.endDate)}
                      </td>
                      <td className="px-6 py-4">
                        <LeaveStatusBadge status={l.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {l.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setLeaveStatus(l.id, "approved")}
                                className="gap-1 text-accent-cyan hover:bg-accent-cyan/10"
                              >
                                <Check className="size-4" />
                                Onayla
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setLeaveStatus(l.id, "rejected")}
                                className="gap-1 text-destructive hover:bg-destructive/10"
                              >
                                <X className="size-4" />
                                Reddet
                              </Button>
                            </>
                          )}
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            aria-label="Düzenle"
                            onClick={() => openEdit(l)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="destructive"
                            aria-label="Sil"
                            onClick={() => setToDelete(l)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <LeaveDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        leave={editing}
      />

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="İzin talebini sil"
        description="Bu izin talebi kalıcı olarak silinecek. Bu işlem geri alınamaz."
        onConfirm={() => toDelete && deleteLeaveRequest(toDelete.id)}
      />
    </>
  );
}
