import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

export const LEGAL_DOCS = {
  privacy: "privacy-policy",
  terms: "terms-of-service",
  "account-deletion": "account-deletion",
} as const;

export type LegalSlug = keyof typeof LEGAL_DOCS;

export interface LegalDoc {
  title: string;
  description: string;
  effective: string;
  updated: string;
  html: string;
}

/**
 * Reads a markdown file from docs/legal and returns its frontmatter plus
 * rendered HTML. The leading `# Title` heading is stripped — the page renders
 * the title from frontmatter so it can sit above the effective/updated dates.
 */
export async function getLegalDoc(slug: LegalSlug): Promise<LegalDoc> {
  const filePath = path.join(process.cwd(), "docs", "legal", `${LEGAL_DOCS[slug]}.md`);
  const raw = await readFile(filePath, "utf8");

  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    meta[line.slice(0, sep).trim()] = line.slice(sep + 1).trim();
  }

  const body = raw.slice(match[0].length).trimStart().replace(/^#\s+.*(?:\n+|$)/, "");

  return {
    title: meta.title ?? "",
    description: meta.description ?? "",
    effective: meta.effective ?? "",
    updated: meta.updated ?? "",
    html: await marked.parse(body, { async: true }),
  };
}
