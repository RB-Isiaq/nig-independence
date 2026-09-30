/**
 * Free per-platform attribution on Vercel's Hobby plan (UTM reports need a paid add-on).
 * Called for every page view before it is sent:
 *   /?utm_source=instagram  → recorded as /from/instagram (shows in the free "Pages" report)
 *   /?record…               → dropped (the owner's own recording sessions aren't visitors)
 *   anything else           → unchanged
 */
const SOURCE = /^[a-z0-9][a-z0-9_-]{0,31}$/;

export function attributeVisit(url: string): string | null {
  const parsed = new URL(url);
  if (parsed.searchParams.has("record")) return null;

  const source = parsed.searchParams.get("utm_source")?.trim().toLowerCase();
  if (!source || !SOURCE.test(source)) return url;

  parsed.pathname = `/from/${source}`;
  parsed.search = "";
  return parsed.toString();
}
