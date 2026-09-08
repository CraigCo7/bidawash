import Image from "next/image";
import Link from "next/link";
import SiteFooter from "./SiteFooter";
import { getLegalDoc, type LegalSlug } from "../lib/legal";


export default async function LegalPage({ slug }: { slug: LegalSlug }) {
  const doc = await getLegalDoc(slug);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-3xl items-center px-6 py-5">
          <Link href="/" aria-label="BidaWash home">
            <Image
              src="/logo_words_transparent.png"
              alt="BidaWash"
              width={400}
              height={100}
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Effective: {doc.effective} &middot; Last updated: {doc.updated}
        </p>

        <div
          className="legal-prose mt-10"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
