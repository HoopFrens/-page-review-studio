export const reviewSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidReviewSlug(value: string) {
  return value.length <= 96 && reviewSlugPattern.test(value);
}

export function toReviewSlug(input: string) {
  return input
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .slice(0, 96)
    .replace(/-+$/, "");
}
