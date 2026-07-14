"use client";

import { Dialog } from "@base-ui/react/dialog";
import { CheckCircle2, Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LeaveType = "annual" | "sick" | "unpaid";

const leaveTypes: { value: LeaveType; label: string }[] = [
  { value: "annual", label: "Yıllık İzin" },
  { value: "sick", label: "Hastalık İzni" },
  { value: "unpaid", label: "Ücretsiz İzin" },
];

const fieldClasses =
  "w-full rounded-lg border border-white/10 bg-surface-2/60 px-3 py-2 text-base text-on-surface outline-none transition-colors focus:border-accent-cyan/50 placeholder-on-surface-variant/40";

const labelClasses =
  "font-label-mono text-xs uppercase tracking-wider text-on-surface-variant";

export function NewRequestDialog() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState<LeaveType>("annual");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [note, setNote] = useState("");

  function reset() {
    setSubmitted(false);
    setType("annual");
    setStart("");
    setEnd("");
    setNote("");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // reset after the close animation so content doesn't flash
      setTimeout(reset, 200);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend yet — show an inline confirmation.
    setSubmitted(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger
        render={
          <Button className="h-auto w-full gap-2 bg-accent-cyan px-4 py-3 text-base font-bold text-[#003739] shadow-[0_0_20px_rgba(0,220,229,0.3)] hover:bg-accent-cyan/90" />
        }
      >
        <Plus className="size-5" />
        New Request
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="glass-panel fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-2xl transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          {submitted ? (
            <div className="flex flex-col items-center py-6 text-center">
              <CheckCircle2 className="size-12 text-accent-cyan" />
              <Dialog.Title className="mt-4 text-2xl font-bold text-on-surface">
                Talep Gönderildi
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-base text-on-surface-variant">
                İzin talebiniz onay için iletildi.
              </Dialog.Description>
              <Dialog.Close
                render={
                  <Button className="mt-6 bg-accent-cyan text-[#003739] hover:bg-accent-cyan/90" />
                }
              >
                Tamam
              </Dialog.Close>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <Dialog.Title className="text-2xl font-bold text-on-surface">
                    Yeni İzin Talebi
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-base text-on-surface-variant">
                    İzin talebi oluşturmak için formu doldurun.
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  aria-label="Kapat"
                  className="flex size-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
                >
                  <X className="size-5" />
                </Dialog.Close>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="leave-type" className={labelClasses}>
                    İzin Türü
                  </label>
                  <select
                    id="leave-type"
                    value={type}
                    onChange={(e) => setType(e.target.value as LeaveType)}
                    className={fieldClasses}
                  >
                    {leaveTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="start-date" className={labelClasses}>
                      Başlangıç
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      required
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      className={cn(fieldClasses, "[color-scheme:dark]")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="end-date" className={labelClasses}>
                      Bitiş
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      required
                      min={start || undefined}
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      className={cn(fieldClasses, "[color-scheme:dark]")}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="note" className={labelClasses}>
                    Not (opsiyonel)
                  </label>
                  <textarea
                    id="note"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="İzin sebebini kısaca açıklayın..."
                    className={cn(fieldClasses, "resize-none")}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Dialog.Close render={<Button variant="outline" />}>
                    İptal
                  </Dialog.Close>
                  <Button
                    type="submit"
                    className="bg-accent-cyan text-[#003739] hover:bg-accent-cyan/90"
                  >
                    Talebi Gönder
                  </Button>
                </div>
              </form>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
