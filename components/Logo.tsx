import Image from "next/image";
import logo from "@/public/brand/page-review-studio-logo.png";

type LogoProps = {
  framed?: boolean;
  decorative?: boolean;
  preload?: boolean;
  className?: string;
};

export default function PageReviewLogo({
  framed = false,
  decorative = false,
  preload = false,
  className = "",
}: LogoProps) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center bg-white ${framed ? "p-4" : ""} ${className}`}>
      <Image
        src={logo}
        alt={decorative ? "" : "Page Review Studio"}
        className="h-auto w-full object-contain"
        sizes="(max-width: 640px) 208px, 288px"
        preload={preload}
      />
    </span>
  );
}
