import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import DisableDraftMode from "./DisableDraftMode";
import { isSanityConfigured } from "@/sanity/env";
import { SanityLive } from "@/sanity/lib/live";

export default async function SanityPreview() {
  if (!isSanityConfigured || !(await draftMode()).isEnabled) return null;

  return (
    <>
      <SanityLive />
      <VisualEditing />
      <DisableDraftMode />
    </>
  );
}
