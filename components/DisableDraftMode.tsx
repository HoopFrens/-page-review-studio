"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export default function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool !== false) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-5 right-5 z-[100] rounded-full bg-espresso px-5 py-3 text-xs font-semibold uppercase tracking-[.14em] text-ivory shadow-2xl transition-colors hover:bg-terracotta"
    >
      Exit preview
    </a>
  );
}
