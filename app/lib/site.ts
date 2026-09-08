/**
 * The canonical production origin. Everything else — preview deploys, local
 * dev — resolves to wherever it is actually running, so canonical and OG URLs
 * point at the deployment you are looking at instead of at production.
 */
const PRODUCTION_URL = "https://bidawash.com";

function resolveSiteUrl(): string {
  // An explicit value always wins. Set NEXT_PUBLIC_SITE_URL in Vercel (or
  // .env.local) if the site ever moves off this domain.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  // On a Vercel production deploy, VERCEL_URL is the per-deployment hostname
  // (bidawash-abc123.vercel.app), not the custom domain — so production keeps
  // the canonical domain rather than following VERCEL_URL.
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;

  // Preview and branch deploys: follow the deployment.
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // Local dev and any non-Vercel build without an explicit override.
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }

  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();

/**
 * Only ever true when Vercel positively reports a non-production deploy, so a
 * missing or unexpected environment can never accidentally de-index production.
 */
export const IS_PREVIEW_DEPLOY =
  process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";

export const SITE_NAME = "BidaWash";

export const SITE_TITLE = "BidaWash — Faster. Cleaner. Better.";

export const SITE_DESCRIPTION =
  "BidaWash is an automated car wash experience built for the modern Filipino driver. Faster. Cleaner. Better. Coming soon to Manila at select locations.";

const SHARE_IMAGE = {
  url: "/landingpage1.png",
  width: 1536,
  height: 1024,
  alt: "BidaWash automated car wash",
};

/**
 * Next.js replaces (rather than merges) `openGraph` and `twitter` when a route
 * defines them, so pages build their share tags from here to keep the site
 * name, locale, and image consistent.
 */
export function buildShareMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    openGraph: {
      type: "website" as const,
      siteName: SITE_NAME,
      locale: "en_PH",
      title,
      description,
      url: path,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
