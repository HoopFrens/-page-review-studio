type LogoProps = { iconOnly?: boolean; light?: boolean; className?: string };

export default function PageReviewLogo({ iconOnly = false, light = false, className = "" }: LogoProps) {
  const ink = light ? "#F6F2EC" : "#231814";
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Page Review Studio">
      <svg viewBox="0 0 44 50" className="h-10 w-9 shrink-0" aria-hidden="true">
        <path d="M35 3C20 7 10 19 10 37c8-5 16-13 23-25-4 12-10 22-19 30" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 38c8-2 15-1 22 4M9 42c8-2 15-1 22 4" fill="none" stroke="#B08A57" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      {!iconOnly && (
        <div className="leading-none">
          <div className="font-serif text-[1.15rem] font-medium tracking-[.03em]" style={{ color: ink }}>Page Review</div>
          <div className="mt-1 text-[.55rem] font-semibold uppercase tracking-[.32em] text-bronze">Studio</div>
        </div>
      )}
    </div>
  );
}
