"use client";

import {
  MerhabaBileseni,
  PersonelKarti,
  IzinKarti,
  izinTalebi,
  MerhabaKutusu
} from "./playground";

export default function PlaygroundPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="mb-2 text-5xl font-bold tracking-tight text-on-surface md:text-6xl">
          TypeScript Playground
        </h2>
        <p className="max-w-2xl text-base text-on-surface-variant">
          Bu sayfa, <code>playground.tsx</code> dosyasında yaptığın değişiklikleri canlı olarak görmen için tasarlandı! Dosyadaki kodları güncelleyip sayfayı inceleyebilirsin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Step 5 */}
        <div className="glass-panel space-y-4 rounded-xl p-6">
          <h3 className="font-label-mono text-xs uppercase tracking-wider text-accent-cyan">
            5. ADIM: Merhaba Bileşeni
          </h3>
          <div className="pt-2">
            <MerhabaKutusu isim="Tolga Osman" yas={22} />
          </div>
        </div>

        {/* Step 6 */}
        <div className="glass-panel space-y-4 rounded-xl p-6">
          <h3 className="font-label-mono text-xs uppercase tracking-wider text-accent-violet">
            6. ADIM: Personel Kartı (Styling)
          </h3>
          <div className="pt-2">
            <PersonelKarti />
          </div>
        </div>

        {/* Step 7 */}
        <div className="glass-panel space-y-4 rounded-xl p-6">
          <h3 className="font-label-mono text-xs uppercase tracking-wider text-accent-cyan">
            7. ADIM: İzin Kartı (Props & Types)
          </h3>
          <div className="pt-2">
            <IzinKarti talep={izinTalebi} />
          </div>
        </div>
      </div>
    </div>
  );
}
