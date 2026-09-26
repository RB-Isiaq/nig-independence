import { Magnetic } from "@/components/motion/magnetic.client";
import { Container } from "@/components/ui/container";

const LINKS = [
  { href: "#clock", label: "Clock" },
  { href: "#timeline", label: "Timeline" },
] as const;

export function SiteHeader() {
  return (
    <header data-site-header className="fixed inset-x-0 top-0 z-50 bg-linear-to-b from-ink via-ink/70 to-transparent">
      <Container className="flex items-center justify-between py-5">
        <a href="#top" className="flex items-center gap-3 font-display text-sm font-bold tracking-wide">
          <span aria-hidden className="brand-mark" />
          <span>01 · 10 · 1960</span>
        </a>
        <nav aria-label="Sections">
          <ul className="glass flex gap-1 rounded-full p-1 text-sm">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Magnetic>
                  <a href={href} className="block rounded-full px-4 py-2 text-snow/80 transition hover:bg-snow/10 hover:text-snow">
                    {label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
