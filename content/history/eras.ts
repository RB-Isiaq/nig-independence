import type { Era, EraId } from "@/content/types";

export const ERAS: Readonly<Record<EraId, Era>> = {
  colonial: { id: "colonial", label: "Road to Independence", span: "1914 – 1959" },
  independence: { id: "independence", label: "Independence & First Republic", span: "1960 – 1966" },
  // Military rule, broken by the civilian Second Republic (1979 – 1983).
  military: { id: "military", label: "Military Rule & Civil War", span: "1966 – 1979 · 1983 – 1999" },
  democracy: { id: "democracy", label: "Fourth Republic", span: "1999 – today" },
};
