import Image from "next/image";
import horizontalLogo from "@/public/brand/page-review-studio-logo.png";
import stackedLogo from "@/public/brand/page-review-studio-logo-stacked.png";
import brandMark from "@/public/brand/page-review-studio-mark.png";

type LogoVariant = "horizontal" | "stacked" | "mark";

type LogoProps = {
  variant?: LogoVariant;
  framed?: boolean;
  decorative?: boolean;
  preload?: boolean;
  className?: string;
};

const logoSources = {
  horizontal: horizontalLogo,
  stacked: stackedLogo,
  mark: brandMark,
} satisfies Record<LogoVariant, typeof horizontalLogo>;

export default function PageReviewLogo({
  variant = "horizontal",
  framed = false,
  decorative = false,
  preload = false,
  className = "",
}: LogoProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${
        framed
          ? "border border-brand-gold/45 bg-brand-cream p-4 shadow-[0_18px_50px_rgba(22,9,5,.18)]"
          : ""
      } ${className}`}
    >
      <Image
        src={logoSources[variant]}
        alt={decorative ? "" : "Page Review Studio"}
        className="h-auto w-full object-contain"
        sizes={variant === "mark" ? "56px" : "(max-width: 640px) 176px, 224px"}
        preload={preload}
      />
    </span>
  );
}
