"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import {
  AuthCard,
  authFieldClasses,
  authLabelClasses,
} from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signup(name, email, password);
    router.push("/");
  }

  return (
    <AuthCard
      title="Kayıt Ol"
      subtitle="Yeni bir hesap oluşturun."
      footer={
        <>
          Zaten hesabın var mı?{" "}
          <Link
            href="/login"
            className="font-medium text-accent-cyan hover:underline"
          >
            Giriş Yap
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className={authLabelClasses}>
            Ad Soyad
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız Soyadınız"
            className={authFieldClasses}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className={authLabelClasses}>
            E-posta
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@sirket.com"
            className={authFieldClasses}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className={authLabelClasses}>
            Şifre
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={authFieldClasses}
          />
        </div>

        <Button
          type="submit"
          className="mt-2 h-auto w-full bg-accent-cyan py-3 text-base font-bold text-[#003739] hover:bg-accent-cyan/90"
        >
          Kayıt Ol
        </Button>
      </form>
    </AuthCard>
  );
}
