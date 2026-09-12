import type { Metadata } from "next";
import {
  metadata as studioMetadata,
  NextStudio,
  viewport,
} from "next-sanity/studio";
import config from "../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Page Review Studio Dashboard",
};

export { viewport };

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-brown px-6 text-brand-cream">
        <div className="max-w-xl border border-brand-gold/50 bg-brand-brown p-8 shadow-2xl sm:p-12">
          <p className="eyebrow text-brand-gold">Page Review Studio</p>
          <h1 className="mt-5 font-serif text-5xl leading-none">The private dashboard is being connected.</h1>
          <p className="mt-6 leading-8 text-brand-cream/70">
            Add the Sanity project ID and dataset to the site environment, then reload this page.
            No review content has been moved yet.
          </p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
