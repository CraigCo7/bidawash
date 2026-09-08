import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { getLegalDoc } from "../lib/legal";
import { buildShareMetadata } from "../lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("terms");
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: "/terms" },
    ...buildShareMetadata({
      title: doc.title,
      description: doc.description,
      path: "/terms",
    }),
  };
}

export default function Page() {
  return <LegalPage slug="terms" />;
}
