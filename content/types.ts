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

export interface HistoryEvent {
  id: string;
  date: HistoricDate;
  era: EraId;
  title: string;
  summary: string;
  /** At least one source is required (plan ground rule #2). */
  sources: readonly [Source, ...Source[]];
}
