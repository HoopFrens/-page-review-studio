import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { isValidReviewSlug } from "@/lib/reviewSlug";

type ReviewWebhookPayload = {
  _type?: string;
  slug?: string;
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured." }, { status: 503 });
  }

  try {
    const { isValidSignature, body } = await parseBody<ReviewWebhookPayload>(
      request,
      secret,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
    }

    if (!body || body._type !== "review") {
      return NextResponse.json({ message: "Unsupported document type." }, { status: 400 });
    }

    if (body.slug && !isValidReviewSlug(body.slug)) {
      return NextResponse.json({ message: "Invalid review slug." }, { status: 400 });
    }

    revalidateTag("review", { expire: 0 });
    revalidatePath("/");
    revalidatePath("/reviews");
    revalidatePath("/reviews/[slug]", "page");

    if (body.slug) {
      revalidateTag(`review:${body.slug}`, { expire: 0 });
      revalidatePath(`/reviews/${body.slug}`);
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ message: "Unable to process webhook." }, { status: 400 });
  }
}
