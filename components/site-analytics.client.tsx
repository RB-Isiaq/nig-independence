"use client";

import { Analytics } from "@vercel/analytics/next";
import { attributeVisit } from "@/lib/analytics/attribute-visit";

/** Vercel Web Analytics with free per-platform attribution (see lib/analytics/attribute-visit.ts). */
export function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        const url = attributeVisit(event.url);
        return url ? { ...event, url } : null;
      }}
    />
  );
}
