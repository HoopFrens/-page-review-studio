import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { isSanityConfigured } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";

const draftModeHandler = defineEnableDraftMode({
  client: sanityClient.withConfig({
    token: process.env.SANITY_API_READ_TOKEN || "",
  }),
});

export async function GET(request: Request) {
  if (!isSanityConfigured || !process.env.SANITY_API_READ_TOKEN) {
    return new Response("Draft preview is not configured.", { status: 503 });
  }

  return draftModeHandler.GET(request);
}
