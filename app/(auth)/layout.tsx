import { AuthBackdrop } from "@/components/auth/auth-backdrop";
import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-background px-4 py-10 text-on-surface">
      <AuthBackdrop />

      <div className="relative z-10 grid w-full max-w-4xl gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-center">
        <AuthBrandPanel />
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
