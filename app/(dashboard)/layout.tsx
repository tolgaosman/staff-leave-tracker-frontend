import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-surface">
      {/* Ambient background lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30">
        <div className="absolute left-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-accent-violet/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-accent-cyan/20 blur-[100px]" />
      </div>

      <Sidebar />
      <TopNav />

      <main className="relative z-10 min-h-screen px-4 pb-10 pt-24 md:ml-64 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl space-y-4">{children}</div>
      </main>
    </div>
  );
}
