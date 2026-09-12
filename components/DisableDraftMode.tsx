"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export default function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool !== false) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-5 right-5 z-[100] rounded-full bg-brand-brown px-5 py-3 text-xs font-semibold uppercase tracking-[.14em] text-brand-cream shadow-2xl transition-colors hover:bg-brand-blue"
    >
      Exit preview
    </a>
  );
}
