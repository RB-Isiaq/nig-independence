import { cacheLife } from "next/cache";

/**
 * The server's notion of "now", as an ISO string.
 *
 * This is the only place server code may read the clock (plan ADR-002). It is
 * cached so the page can be prerendered; the HTML is at most ~15 minutes stale,
 * and client components switch to a live clock after hydration.
 */
export async function getSnapshotTime(): Promise<string> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 900, expire: 86_400 });
  return new Date().toISOString();
}
