import type { StaticImageData } from "next/image";

export interface Source {
  label: string;
  url: string;
}

/** A date that may be known only to the year or month. */
export interface HistoricDate {
  year: number;
  month?: number;
  day?: number;
}

export type EraId = "colonial" | "independence" | "military" | "democracy";

export interface Era {
  id: EraId;
  label: string;
  span: string;
}

/** Attribution for freely licensed media (author, source, licence). */
export interface MediaCredit {
  author: string;
  /** e.g. "CC BY-SA 4.0" or "Public domain" */
  license: string;
  /** Required for Creative Commons licences. */
  licenseUrl?: string;
  /** The file's page, e.g. on Wikimedia Commons. */
  sourceUrl: string;
}

export interface HistoryImage {
  /** Static import, so Next knows the size and generates a blur placeholder. */
  src: StaticImageData;
  alt: string;
  /** Short context shown with the credit, e.g. "Pictured in 2017". */
  caption?: string;
  /** CSS object-position for the crop, e.g. "50% 20%" to keep a face in frame. */
  focus?: string;
  credit: MediaCredit;
}

export interface HistoryEvent {
  id: string;
  date: HistoricDate;
  /** For periods rather than moments, e.g. a war. */
  until?: HistoricDate;
  era: EraId;
  title: string;
  /** One line. People skim; details live behind the source link. */
  summary: string;
  /** Optional: a moment can be text-only when no suitable image exists. */
  image?: HistoryImage;
  /** At least one source is required (plan ground rule #2). */
  sources: readonly [Source, ...Source[]];
}
