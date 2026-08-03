import { defineLive } from "next-sanity/live";
import { sanityClient } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
  serverToken: process.env.SANITY_API_READ_TOKEN || false,
  // Presentation Tool supplies its own authenticated live connection. Keeping
  // this false prevents a read token from being sent to ordinary browsers.
  browserToken: false,
});
