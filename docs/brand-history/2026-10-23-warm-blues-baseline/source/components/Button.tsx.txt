import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = { href: string; children: ReactNode; variant?: "dark" | "outline" | "light"; className?: string };

export default function Button({ href, children, variant = "dark", className = "" }: ButtonProps) {
  const styles = {
    dark: "bg-brand-blue text-brand-cream border-brand-blue hover:bg-brand-brown hover:border-brand-brown",
    outline: "bg-transparent text-brand-brown border-brand-brown hover:bg-brand-brown hover:text-brand-cream",
    light: "bg-brand-cream text-brand-brown border-brand-cream hover:bg-brand-linen hover:border-brand-linen",
  };
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center border px-6 py-3 text-[.67rem] font-semibold uppercase tracking-[.16em] transition-colors ${styles[variant]} ${className}`}>{children}</Link>;
}
