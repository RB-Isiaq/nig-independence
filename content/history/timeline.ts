import type { HistoryEvent } from "@/content/types";

/**
 * Immutable history (plan class B). Every entry must also be listed in
 * plan/08-fact-register.md with its verification status.
 * Keep chronological order.
 */
export const TIMELINE: readonly HistoryEvent[] = [
  {
    id: "amalgamation-1914",
    date: { year: 1914, month: 1, day: 1 },
    era: "colonial",
    title: "Amalgamation",
    summary:
      "The Northern and Southern Protectorates are merged into a single Colony and Protectorate of Nigeria under Governor-General Frederick Lugard.",
    sources: [{ label: "Britannica — Nigeria: History", url: "https://www.britannica.com/place/Nigeria/History" }],
  },
  {
    id: "federation-1954",
    date: { year: 1954, month: 10, day: 1 },
    era: "colonial",
    title: "A federation is born",
    summary:
      "The Lyttelton Constitution takes effect, turning Nigeria into a federation of regions with their own governments.",
    sources: [{ label: "Wikipedia — History of Nigeria", url: "https://en.wikipedia.org/wiki/History_of_Nigeria" }],
  },
  {
    id: "independence-1960",
    date: { year: 1960, month: 10, day: 1 },
    era: "independence",
    title: "Independence",
    summary:
      "Nigeria becomes an independent nation. The green-white-green flag is raised in Lagos, and Sir Abubakar Tafawa Balewa leads the country as Prime Minister.",
    sources: [
      { label: "Wikipedia — Independence Day (Nigeria)", url: "https://en.wikipedia.org/wiki/Independence_Day_(Nigeria)" },
      { label: "Britannica — Nigeria: History", url: "https://www.britannica.com/place/Nigeria/History" },
    ],
  },
  {
    id: "republic-1963",
    date: { year: 1963, month: 10, day: 1 },
    era: "independence",
    title: "Federal Republic",
    summary:
      "Nigeria becomes a republic, replacing the British monarch as head of state. Nnamdi Azikiwe becomes the first President.",
    sources: [{ label: "Wikipedia — First Nigerian Republic", url: "https://en.wikipedia.org/wiki/First_Nigerian_Republic" }],
  },
  {
    id: "coup-1966",
    date: { year: 1966, month: 1, day: 15 },
    era: "military",
    title: "First military coup",
    summary: "The First Republic ends with a military coup, beginning decades of largely military rule.",
    sources: [{ label: "Wikipedia — 1966 Nigerian coup d'état", url: "https://en.wikipedia.org/wiki/1966_Nigerian_coup_d%27%C3%A9tat" }],
  },
  {
    id: "civil-war-1967",
    date: { year: 1967, month: 7, day: 6 },
    era: "military",
    title: "Civil war",
    summary:
      "The Nigerian Civil War begins. It ends in January 1970 at an immense human cost, and the country remains united.",
    sources: [{ label: "Wikipedia — Nigerian Civil War", url: "https://en.wikipedia.org/wiki/Nigerian_Civil_War" }],
  },
  {
    id: "naira-nysc-1973",
    date: { year: 1973 },
    era: "military",
    title: "The Naira and the NYSC",
    summary:
      "The Naira replaces the pound as the national currency, and the National Youth Service Corps is created to build unity among young graduates.",
    sources: [
      { label: "Wikipedia — Nigerian naira", url: "https://en.wikipedia.org/wiki/Nigerian_naira" },
      { label: "Wikipedia — National Youth Service Corps", url: "https://en.wikipedia.org/wiki/National_Youth_Service_Corps" },
    ],
  },
  {
    id: "second-republic-1979",
    date: { year: 1979, month: 10, day: 1 },
    era: "military",
    title: "Second Republic",
    summary: "Civilian rule returns with Shehu Shagari as President. It lasts until a coup at the end of 1983.",
    sources: [{ label: "Wikipedia — Second Nigerian Republic", url: "https://en.wikipedia.org/wiki/Second_Nigerian_Republic" }],
  },
  {
    id: "soyinka-nobel-1986",
    date: { year: 1986 },
    era: "military",
    title: "Africa's first Nobel in Literature",
    summary: "Wole Soyinka becomes the first African to win the Nobel Prize in Literature.",
    sources: [{ label: "NobelPrize.org — Wole Soyinka", url: "https://www.nobelprize.org/prizes/literature/1986/soyinka/facts/" }],
  },
  {
    id: "abuja-1991",
    date: { year: 1991, month: 12, day: 12 },
    era: "military",
    title: "Abuja becomes the capital",
    summary: "The seat of government moves from Lagos to the purpose-built, centrally located city of Abuja.",
    sources: [{ label: "Wikipedia — Abuja", url: "https://en.wikipedia.org/wiki/Abuja" }],
  },
  {
    id: "june-12-1993",
    date: { year: 1993, month: 6, day: 12 },
    era: "military",
    title: "June 12",
    summary:
      "A presidential election widely regarded as free and fair is annulled. The date later becomes Nigeria's Democracy Day.",
    sources: [
      { label: "Wikipedia — 1993 Nigerian presidential election", url: "https://en.wikipedia.org/wiki/1993_Nigerian_presidential_election" },
    ],
  },
  {
    id: "atlanta-1996",
    date: { year: 1996, month: 8, day: 3 },
    era: "military",
    title: "Olympic football gold",
    summary: "The Super Eagles' Dream Team wins football gold at the Atlanta Olympics, the first for an African nation.",
    sources: [
      {
        label: "Wikipedia — Football at the 1996 Summer Olympics",
        url: "https://en.wikipedia.org/wiki/Football_at_the_1996_Summer_Olympics",
      },
    ],
  },
  {
    id: "thirty-six-states-1996",
    date: { year: 1996, month: 10, day: 1 },
    era: "military",
    title: "36 states",
    summary: "Six new states are created, bringing the federation to today's 36 states and the Federal Capital Territory.",
    sources: [{ label: "Wikipedia — States of Nigeria", url: "https://en.wikipedia.org/wiki/States_of_Nigeria" }],
  },
  {
    id: "fourth-republic-1999",
    date: { year: 1999, month: 5, day: 29 },
    era: "democracy",
    title: "Fourth Republic",
    summary:
      "Democracy returns under a new constitution, with Olusegun Obasanjo sworn in as President. It is Nigeria's longest period of uninterrupted civilian rule.",
    sources: [{ label: "Wikipedia — Fourth Nigerian Republic", url: "https://en.wikipedia.org/wiki/Fourth_Nigerian_Republic" }],
  },
  {
    id: "democracy-day-2019",
    date: { year: 2019, month: 6, day: 12 },
    era: "democracy",
    title: "Democracy Day moves to June 12",
    summary: "Democracy Day is observed on June 12 for the first time, honouring the 1993 election.",
    sources: [{ label: "Wikipedia — Democracy Day (Nigeria)", url: "https://en.wikipedia.org/wiki/Democracy_Day_(Nigeria)" }],
  },
  {
    id: "anthem-2024",
    date: { year: 2024, month: 5, day: 29 },
    era: "democracy",
    title: "“Nigeria, We Hail Thee” returns",
    summary: "The original independence-era national anthem is restored by law, replacing “Arise, O Compatriots”.",
    sources: [
      { label: "Wikipedia — Nigeria, We Hail Thee", url: "https://en.wikipedia.org/wiki/Nigeria,_We_Hail_Thee" },
    ],
  },
];
