import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/account-deletion", label: "Delete your account" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.tiktok.com/@bidawashph",
    label: "BidaWash on TikTok",
    icon: (
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .74-5.07v-3.1a5.62 5.62 0 0 0-.74-.05A5.68 5.68 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48Z" />
    ),
  },
  {
    href: "https://www.facebook.com/bidawashph",
    label: "BidaWash on Facebook",
    icon: (
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    ),
  },
  {
    href: "https://www.instagram.com/bidawashph",
    label: "BidaWash on Instagram",
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.81 3.81 0 0 1-1.38-.9 3.81 3.81 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    ),
  },
];

/**
 * `overlay` sits on top of the landing-page hero image (white text, no
 * background); `default` is for the light legal pages.
 */
export default function SiteFooter({
  variant = "default",
}: {
  variant?: "default" | "overlay";
}) {
  const overlay = variant === "overlay";

  return (
    <footer
      className={
        overlay
          ? "relative z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-6 text-white"
          : "border-t border-zinc-200 text-zinc-500"
      }
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6 pt-6 pb-3 text-sm sm:flex-row sm:justify-between">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                overlay
                  ? "transition-colors hover:text-white/70 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]"
                  : "transition-colors hover:text-zinc-900"
              }
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:support@bidawash.com"
            className={
              overlay
                ? "transition-colors hover:text-white/70 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]"
                : "transition-colors hover:text-zinc-900"
            }
          >
            support@bidawash.com
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={
                overlay
                  ? "transition-opacity hover:opacity-70 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.9))]"
                  : "text-zinc-400 transition-colors hover:text-zinc-900"
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>

      <p
        className={`mx-auto max-w-3xl px-6 pb-6 text-center text-xs sm:text-left ${
          overlay ? "text-white/70 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]" : "text-zinc-400"
        }`}
      >
        &copy; {new Date().getFullYear()} BidaWash Inc. All rights reserved.
      </p>
    </footer>
  );
}
