import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = { href: string; children: ReactNode; variant?: "dark" | "outline" | "light"; className?: string };

export default function Button({ href, children, variant = "dark", className = "" }: ButtonProps) {
  const styles = {
    dark: "bg-espresso text-ivory border-espresso hover:bg-terracotta hover:border-terracotta",
    outline: "bg-transparent text-espresso border-espresso hover:bg-espresso hover:text-ivory",
    light: "bg-ivory text-espresso border-ivory hover:bg-linen hover:border-linen",
  };
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center border px-6 py-3 text-[.67rem] font-semibold uppercase tracking-[.16em] transition-colors ${styles[variant]} ${className}`}>{children}</Link>;
}
