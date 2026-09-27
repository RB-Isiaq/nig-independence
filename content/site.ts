export const SITE = {
  name: "Nigeria Independence",
  description:
    "An ever-current celebration of Nigeria's Independence Day, 1 October 1960, with a live countdown, the story of the nation, and the anniversary always up to date.",
  motto: "Unity and Faith, Peace and Progress",
  /** Shown in the © line. */
  owner: "RB-Isiaq",
} as const;

/** Absolute site URL for metadata; Vercel provides the production host automatically. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}
