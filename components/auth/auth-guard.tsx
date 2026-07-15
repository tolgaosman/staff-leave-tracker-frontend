"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/components/auth/auth-provider";

/* Client-side route guard for the dashboard group. Static export can't
   run server middleware, so protection happens here after hydration. */

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-label-mono text-xs uppercase tracking-wider text-on-surface-variant">
          Yönlendiriliyor…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
