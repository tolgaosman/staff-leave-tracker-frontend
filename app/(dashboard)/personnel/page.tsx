"use client";

import { Eye, Pencil, Plus, Trash2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar } from "@/components/dashboard/avatar";
import { PersonnelStatusBadge } from "@/components/dashboard/badges";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { PersonnelDialog } from "@/components/dashboard/personnel-dialog";
import { Button } from "@/components/ui/button";
import { deletePersonnel, usePersonnel } from "@/lib/data/store";
import type { Personnel } from "@/lib/data/types";

export default function PersonnelPage() {
  const personnel = usePersonnel();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Personnel | null>(null);
  const [toDelete, setToDelete] = useState<Personnel | null>(null);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(p: Personnel) {
    setEditing(p);
    setDialogOpen(true);
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="mb-2 text-5xl font-bold tracking-tight text-on-surface md:text-6xl">
            Personel Listesi
          </h2>
          <p className="max-w-2xl text-base text-on-surface-variant">
            Tüm personelin listesi ve detayları.
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="h-auto gap-2 bg-accent-cyan px-4 py-2.5 text-base font-bold text-white hover:bg-accent-cyan/90"
        >
          <Plus className="size-5" />
          Yeni Personel
        </Button>
      </div>

      <div className="glass-panel overflow-hidden rounded-xl">
        {personnel.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 p-16 text-center">
            <UserPlus className="size-10 text-on-surface-variant/50" />
            <p className="text-base text-on-surface-variant">
              Henüz personel yok. Yeni personel ekleyin.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-white/10 font-label-mono text-xs uppercase tracking-wider text-on-surface-variant">
                  <th className="px-6 py-4 font-medium">Ad Soyad</th>
                  <th className="px-6 py-4 font-medium">Departman</th>
                  <th className="px-6 py-4 font-medium">Telefon</th>
                  <th className="px-6 py-4 font-medium">Durum</th>
                  <th className="px-6 py-4 text-right font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {personnel.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/5"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={p.name} className="size-9 shrink-0" />
                        <div>
                          <p className="font-medium text-on-surface">{p.name}</p>
                          {p.email && (
                            <p className="font-label-mono text-xs text-on-surface-variant/70">
                              {p.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {p.department}
                    </td>
                    <td className="px-6 py-4 font-label-mono text-sm text-on-surface-variant">
                      {p.phone}
                    </td>
                    <td className="px-6 py-4">
                      <PersonnelStatusBadge status={p.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          aria-label="Detay"
                          render={<Link href={`/personnel/detail?id=${p.id}`} />}
                          nativeButton={false}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          aria-label="Düzenle"
                          onClick={() => openEdit(p)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="destructive"
                          aria-label="Sil"
                          onClick={() => setToDelete(p)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <PersonnelDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        personnel={editing}
      />

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Personeli sil"
        description={`${toDelete?.name ?? ""} ve ilişkili izin talepleri kalıcı olarak silinecek. Bu işlem geri alınamaz.`}
        onConfirm={() => toDelete && deletePersonnel(toDelete.id)}
      />
    </>
  );
}
