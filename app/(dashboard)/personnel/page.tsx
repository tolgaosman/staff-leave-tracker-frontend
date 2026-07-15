"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export default function PersonnelPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  function openCreate() {
    setDialogOpen(true);
  }

  return (
    <>
      {/* Sayfa Başlığı ve Ekleme Butonu */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant/20 pb-8">
        <div>
          <h2 className="mb-2 font-serif text-5xl font-bold tracking-tight text-primary md:text-6xl">
            Personel Listesi
          </h2>
          <p className="max-w-2xl font-sans text-lg text-on-surface-variant">
            Tüm şirket personelinin detayları, departmanları ve güncel çalışma durumları.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-sans text-base font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95 cursor-pointer"
        >
          <Plus className="size-5" />
          Yeni Personel
        </button>
      </div>

      {/* Adım 2: Tablo buraya gelecek */}
      <div className="flex min-h-[300px] items-center justify-center border border-dashed border-outline-variant/30 rounded-xl">
        <p className="font-mono text-sm text-on-surface-variant/70">
          [ 2. ADIM: Personel Listesi Tablosu Yüklenecek ]
        </p>
      </div>
    </>
  );
}
