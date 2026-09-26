import Image from "next/image";
import type { HistoryImage } from "@/content/types";

/** A timeline photo with its caption and licence credit overlaid. */
export function TimelineMedia({ image }: { image: HistoryImage }) {
  const { credit } = image;

  return (
    <figure data-timeline-media className="timeline-media relative overflow-hidden rounded-3xl bg-snow/5">
      <div className="relative aspect-[4/3]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 45vw, 90vw"
          className="timeline-media__img object-cover"
          style={image.focus ? { objectPosition: image.focus } : undefined}
        />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/95 via-ink/60 to-transparent px-4 pb-3 pt-10 text-xs text-snow/70">
        {image.caption && <span className="block text-sm text-snow">{image.caption}</span>}
        <span>
          Photo:{" "}
          <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="link">
            {credit.author}
          </a>
          {" · "}
          {credit.licenseUrl ? (
            <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="link">
              {credit.license}
            </a>
          ) : (
            credit.license
          )}
        </span>
      </figcaption>
    </figure>
  );
}

/** Quiet placeholder panel for moments shown without a photo. */
export function TimelineMediaPlaceholder({ label }: { label: string }) {
  return (
    <div
      data-timeline-media
      aria-hidden
      className="grid aspect-[4/3] place-items-center rounded-3xl border border-snow/10 bg-snow/[0.03]"
    >
      <span className="font-display text-5xl font-bold tracking-tight text-snow/15 sm:text-7xl">{label}</span>
    </div>
  );
}
