// ==========================================
// 1. ADIM: İLKEL TİPLER (PRIMITIVES) - TAMAMLANDI! 🎉
// ==========================================
const sirketAdi: string = "Staff Tracker A.Ş.";
const aktifKullaniciSayisi: number = 42;
const sistemBakimdaMi: boolean = false;


// ==========================================
// 2. ADIM: İLK ALIŞTIRMA - TAMAMLANDI! 🎉
// ==========================================
export type LeaveType = "Annual" | "Sick" | "Unpaid";
export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export type LeaveReq = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: LeaveType;
  status: LeaveStatus;
};


// ==========================================
// 3. ADIM: OLUŞTURDUĞUN TİPİ KULLANMA - TAMAMLANDI! 🎉
// ==========================================
const izinTalebi: LeaveReq = {
  id: "012345",
  name: "Çiğdem Dürüst",
  startDate: "20 July",
  endDate: "25 July",
  type: "Annual",
  status: "Approved",
};


// ==========================================
// 4. ADIM: FONKSİYON TİPLENDİRME - TAMAMLANDI! 🎉
// ==========================================
function carpma(a: number, b: number): number {
  return a * b;
}

function izinSuresiHesapla(talep: LeaveReq): number {
  return 5;
}


// ==========================================
// 5. ADIM: BASİT BİR REACT BİLEŞENİ VE STYLING
// ==========================================
interface MerhabaProps {
  isim: string;
  yas?: number;
}

export function MerhabaBileseni({ isim, yas }: MerhabaProps) {
  return (
    <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
      <h2>Merhaba, {isim}! 👋</h2>
      {yas && <p>Yaşınız: {yas}</p>}
    </div>
  );
}


// ==========================================
// 6. ADIM: TASARIM (STYLING) ALIŞTIRMASI (SENİN GÖREVİN)
// ==========================================
// Aşağıdaki kartın arka planını (bg-slate-800) 'bg-violet-950' yap.
// Yazı rengini (text-cyan-400) ise 'text-violet-300' olarak değiştir.

export function PersonelKarti() {
  return (
    <div className="max-w-sm rounded-xl border border-white/10 bg-slate-800 p-6 shadow-lg">
      <h3 className="text-lg font-bold text-white">Tolga Osman Falay</h3>
      <p className="text-sm text-cyan-400">Yazılım Departmanı</p>
      <div className="mt-4">
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          Aktif
        </span>
      </div>
    </div>
  );
}


// ==========================================
// 7. ADIM: TİPLENDİRİLMİŞ COMPONENT (SENİN GÖREVİN)
// ==========================================
// Aşağıdaki IzinKarti bileşenini tanımla. 
// Props olarak 'talep: LeaveReq' alacak ve ekranda isim, izin türü ve durumu gösterecek.
// Yukarıdaki MerhabaBileseni örneğine bakarak tamamlayabilirsin.

interface IzinKartiProps {
  talep: LeaveReq;
}

export function IzinKarti({ talep }: IzinKartiProps) {
  // Buradaki JSX kodunu tamamla:
  return (
    <div className="max-w-sm rounded-xl border border-white/10 bg-slate-800 p-6 shadow-lg">
      {/* 1. Personelin Adını (talep.name) <h3> içinde yazdır */}
      {/* 2. İzin Türünü (talep.type) <p> içinde yazdır */}
      {/* 3. İzin Durumunu (talep.status) <p> içinde yazdır */}
      <h3 className="text-lg font-bold text-white">Personel: {talep.name}</h3>
    </div>
  );
}