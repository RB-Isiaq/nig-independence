/** A minimal fetch signature, injectable so the source clients are testable offline. */
export type JsonFetcher = (url: string, init?: RequestInit) => Promise<unknown>;

export const USER_AGENT = "nig-independence/1.0 (+https://github.com/RB-Isiaq/nig-independence)";

/** GET JSON with a timeout and an identifying User-Agent (required by Wikimedia). */
export const fetchJson: JsonFetcher = async (url, init) => {
  const res = await fetch(url, {
    ...init,
    headers: { "User-Agent": USER_AGENT, Accept: "application/json", ...init?.headers },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
};
