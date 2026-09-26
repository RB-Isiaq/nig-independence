import { Container } from "@/components/ui/container";
import { WavingFlag } from "@/components/ui/waving-flag";
import { SITE } from "@/content/site";
import { HeroHeadline } from "./hero-headline.client";
import { HeroStage } from "./hero-stage.client";

export function Hero({ serverNow }: { serverNow: string }) {
  return (
    <HeroStage>
      <div aria-hidden className="hero__glow" />
      <WavingFlag className="hero__flag" />

      <Container className="relative">
        <HeroHeadline serverNow={serverNow} />
      </Container>

      <p data-scroll="bottom" className="absolute inset-x-0 bottom-8 text-center text-xs uppercase tracking-[0.3em] text-snow/50">
        {SITE.motto}
      </p>
    </HeroStage>
  );
}
