import Image from "next/image";
import logo from "@/public/brand/page-review-studio-logo.png";
import { logoArtwork } from "@/lib/brand";

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
    <span className={`inline-flex shrink-0 items-center justify-center bg-brand-cream ${framed ? "p-4" : ""} ${className}`}>
      <span
        className="relative block w-full overflow-hidden"
        style={{ aspectRatio: `${logoArtwork.viewport.width} / ${logoArtwork.viewport.height}` }}
      >
        <Image
          src={logo}
          alt={decorative ? "" : "Page Review Studio"}
          className="absolute h-auto max-w-none"
          style={{
            width: `${logoArtwork.width / logoArtwork.viewport.width * 100}%`,
            left: `${-logoArtwork.viewport.x / logoArtwork.viewport.width * 100}%`,
            top: `${-logoArtwork.viewport.y / logoArtwork.viewport.height * 100}%`,
          }}
          sizes={`(max-width: 640px) ${Math.ceil(288 * logoArtwork.width / logoArtwork.viewport.width)}px, ${Math.ceil(352 * logoArtwork.width / logoArtwork.viewport.width)}px`}
          preload={preload}
        />
      </span>
    </span>
  );
}
