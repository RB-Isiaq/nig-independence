import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { getHeroCopy } from "@/components/sections/hero/hero-copy";
import { IndependenceClock } from "@/components/sections/independence-clock";
import { Intro } from "@/components/sections/intro/intro.client";
import { MottoBand } from "@/components/sections/motto-band";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Timeline } from "@/components/sections/timeline";
import { SITE } from "@/content/site";
import { getAnniversaryState } from "@/lib/anniversary";
import { getSnapshotTime } from "@/lib/snapshot";

export async function generateMetadata(): Promise<Metadata> {
  const state = getAnniversaryState(new Date(await getSnapshotTime()));
  const copy = getHeroCopy(state);
  const title =
    state.phase === "celebration"
      ? `Happy ${state.featured.ordinal} Independence Day, Nigeria`
      : `${copy.lead} ${copy.number} · Countdown to the ${state.next.ordinal} Independence Day`;
  return { title, alternates: { canonical: "/" }, openGraph: { title, description: SITE.description, url: "/" }, twitter: { title } };
}

export default async function Home() {
  const serverNow = await getSnapshotTime();

  return (
    <>
      <Intro serverNow={serverNow} />
      <SiteHeader />
      <main id="top">
        <Hero serverNow={serverNow} />
        <MottoBand />
        <IndependenceClock serverNow={serverNow} />
        <Timeline serverNow={serverNow} />
      </main>
      <SiteFooter />
    </>
  );
}
