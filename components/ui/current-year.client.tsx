"use client";

import { useNow } from "@/hooks/use-now";
import { toLagosDate } from "@/lib/time/lagos";

/** The current year in Lagos, live (flips at midnight on 1 January WAT, and follows `&date=` previews). */
export function CurrentYear({ serverNow }: { serverNow: string }) {
  return <>{toLagosDate(new Date(useNow(serverNow))).year}</>;
}
