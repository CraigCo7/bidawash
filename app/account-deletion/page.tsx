import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { getLegalDoc } from "../lib/legal";
import { buildShareMetadata } from "../lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("account-deletion");
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: "/account-deletion" },
    ...buildShareMetadata({
      title: doc.title,
      description: doc.description,
      path: "/account-deletion",
    }),
  };
}

export default function Page() {
  return <LegalPage slug="account-deletion" />;
}
