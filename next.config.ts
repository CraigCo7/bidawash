import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The legal pages read their content from docs/legal/*.md at render time,
  // so those files must be traced into the deployment bundle.
  outputFileTracingIncludes: {
    "/privacy": ["./docs/legal/privacy-policy.md"],
    "/terms": ["./docs/legal/terms-of-service.md"],
    "/account-deletion": ["./docs/legal/account-deletion.md"],
  },
};

export default nextConfig;
