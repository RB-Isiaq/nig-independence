import type { HistoryEvent } from "@/content/types";
import abuja1991 from "./images/abuja-1991.jpg";
import amalgamation1914 from "./images/amalgamation-1914.jpg";
import anthem2024 from "./images/anthem-2024.jpg";
import atlanta1996 from "./images/atlanta-1996.jpg";
import civilWar1967 from "./images/civil-war-1967.jpg";
import fourthRepublic1999 from "./images/fourth-republic-1999.jpg";
import independence1960 from "./images/independence-1960.jpg";
import june121993 from "./images/june-12-1993.jpg";
import republic1963 from "./images/republic-1963.jpg";
import soyinka1986 from "./images/soyinka-nobel-1986.jpg";

const CC_BY_SA_4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };
const CC_BY_2 = { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" };
const PUBLIC_DOMAIN = { license: "Public domain" };

/**
 * Immutable history (plan class B): ten defining moments, one line each.
 * Every entry and image must also be listed in plan/08-fact-register.md.
 * Images are freely licensed (Wikimedia Commons) and credited on the page.
 * Keep chronological order.
 */
export const TIMELINE: readonly HistoryEvent[] = [
  {
    id: "amalgamation-1914",
    date: { year: 1914, month: 1, day: 1 },
    era: "colonial",
    title: "Amalgamation",
    summary: "The Northern and Southern Protectorates are merged into one Nigeria.",
    image: {
      src: amalgamation1914,
      alt: "A 1914 map of Southern and Northern Nigeria",
      caption: "Map, c. 1914",
      credit: {
        author: "John Bartholomew & Co.",
        ...PUBLIC_DOMAIN,
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Southern_and_Northern_Nigeria_c._1914.jpg",
      },
    },
    sources: [{ label: "Britannica — Nigeria: History", url: "https://www.britannica.com/place/Nigeria/History" }],
  },
  {
    id: "independence-1960",
    date: { year: 1960, month: 10, day: 1 },
    era: "independence",
    title: "Independence",
    summary: "Nigeria becomes a free nation, with Abubakar Tafawa Balewa as Prime Minister.",
    image: {
      src: independence1960,
      alt: "Young Nigerians cheering beneath the national coat of arms at the independence celebrations, October 1960",
      caption: "Independence celebrations, October 1960",
      focus: "50% 35%",
      credit: {
        author: "Unknown photographer, Nationaal Archief (Elsevier collection)",
        ...PUBLIC_DOMAIN,
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Young_kids_celebrate_Nigeria%27s_independence_in_1960.png",
      },
    },
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
    summary: "Nigeria becomes a republic, with Nnamdi Azikiwe as its first President.",
    image: {
      src: republic1963,
      alt: "Dr Nnamdi Azikiwe, smiling, seated at an official function",
      caption: "Dr Nnamdi Azikiwe, “Zik”",
      credit: {
        author: "H.F.J.M. Crebolder, ASC Leiden",
        ...CC_BY_SA_4,
        sourceUrl:
          "https://commons.wikimedia.org/wiki/File:ASC_Leiden_-_NSAG_-_Crebolder_1_-_003_-_%22Dr._Zik._Nig._Gov._Gen.%22_Nnamdi_Azikiwe_at_an_official_function_in_Nigeria_-_after_1972.tif",
      },
    },
    sources: [{ label: "Wikipedia — First Nigerian Republic", url: "https://en.wikipedia.org/wiki/First_Nigerian_Republic" }],
  },
  {
    id: "civil-war-1967",
    date: { year: 1967, month: 7, day: 6 },
    until: { year: 1970, month: 1, day: 15 },
    era: "military",
    title: "Civil war",
    summary: "After the 1966 coups, civil war begins. It ends in 1970 at great human cost, with the country still one.",
    image: {
      src: civilWar1967,
      alt: "Relief workers unloading crates of food aid from a helicopter during the civil war",
      caption: "Relief workers unload food aid, 1968",
      credit: {
        author: "Dr. Lyle Conrad, U.S. Centers for Disease Control",
        ...PUBLIC_DOMAIN,
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Food_aid_Nigeria.png",
      },
    },
    sources: [
      { label: "Wikipedia — Nigerian Civil War", url: "https://en.wikipedia.org/wiki/Nigerian_Civil_War" },
      { label: "Wikipedia — 1966 Nigerian coup d'état", url: "https://en.wikipedia.org/wiki/1966_Nigerian_coup_d%27%C3%A9tat" },
    ],
  },
  {
    id: "soyinka-nobel-1986",
    date: { year: 1986 },
    era: "military",
    title: "A Nobel for Africa",
    summary: "Wole Soyinka becomes the first African to win the Nobel Prize in Literature.",
    image: {
      src: soyinka1986,
      alt: "Wole Soyinka, white-haired, hands clasped, during a lecture",
      caption: "Pictured in 2018",
      focus: "50% 25%",
      credit: {
        author: "Frankie Fouganthin",
        ...CC_BY_SA_4,
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Wole_Soyinka_in_2018.jpg",
      },
    },
    sources: [{ label: "NobelPrize.org — Wole Soyinka", url: "https://www.nobelprize.org/prizes/literature/1986/soyinka/facts/" }],
  },
  {
    id: "abuja-1991",
    date: { year: 1991, month: 12, day: 12 },
    era: "military",
    title: "A new capital",
    summary: "The seat of government moves from Lagos to Abuja, at the heart of the country.",
    image: {
      src: abuja1991,
      alt: "Aso Rock rising behind a highway into Abuja at sunset",
      caption: "Aso Rock, Abuja",
      credit: { author: "Jeff Attaway", ...CC_BY_2, sourceUrl: "https://commons.wikimedia.org/wiki/File:Aso_Rock.jpg" },
    },
    sources: [{ label: "Wikipedia — Abuja", url: "https://en.wikipedia.org/wiki/Abuja" }],
  },
  {
    id: "june-12-1993",
    date: { year: 1993, month: 6, day: 12 },
    era: "military",
    title: "June 12",
    summary: "An election widely seen as free and fair is annulled. Since 2019, June 12 is Democracy Day.",
    image: {
      src: june121993,
      alt: "The stands and pitch of the national stadium in Abuja",
      caption: "Abuja’s national stadium, renamed after M.K.O. Abiola in 2019",
      credit: { author: "Jeff Attaway", ...CC_BY_2, sourceUrl: "https://commons.wikimedia.org/wiki/File:Abuja_Stadium_1.jpg" },
    },
    sources: [
      {
        label: "Wikipedia — 1993 Nigerian presidential election",
        url: "https://en.wikipedia.org/wiki/1993_Nigerian_presidential_election",
      },
      { label: "Wikipedia — Democracy Day (Nigeria)", url: "https://en.wikipedia.org/wiki/Democracy_Day_(Nigeria)" },
      {
        label: "Wikipedia — Moshood Abiola National Stadium",
        url: "https://en.wikipedia.org/wiki/Moshood_Abiola_National_Stadium",
      },
    ],
  },
  {
    id: "atlanta-1996",
    date: { year: 1996, month: 8, day: 3 },
    era: "military",
    title: "Olympic gold",
    summary: "The Dream Team wins Olympic football gold in Atlanta, a first for Africa.",
    image: {
      src: atlanta1996,
      alt: "Nwankwo Kanu in a yellow kit on a football pitch",
      caption: "Nwankwo Kanu, the 1996 captain, pictured in 2017",
      focus: "50% 0%",
      credit: {
        author: "Chensiyuan (crop by Danyele)",
        ...CC_BY_SA_4,
        sourceUrl: "https://commons.wikimedia.org/wiki/File:1_nwankwo_kanu_2017_(cropped).jpg",
      },
    },
    sources: [
      {
        label: "Wikipedia — Football at the 1996 Summer Olympics",
        url: "https://en.wikipedia.org/wiki/Football_at_the_1996_Summer_Olympics",
      },
      { label: "Wikipedia — Nwankwo Kanu", url: "https://en.wikipedia.org/wiki/Nwankwo_Kanu" },
    ],
  },
  {
    id: "fourth-republic-1999",
    date: { year: 1999, month: 5, day: 29 },
    era: "democracy",
    title: "Democracy returns",
    summary: "The Fourth Republic begins with Olusegun Obasanjo as President: Nigeria's longest run of civilian rule.",
    image: {
      src: fourthRepublic1999,
      alt: "President-elect Olusegun Obasanjo in white robes walking beside a US honour guard",
      caption: "President-elect Obasanjo, March 1999",
      credit: {
        author: "Robert D. Ward, U.S. Department of Defense",
        ...PUBLIC_DOMAIN,
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Obasanjo_Cohen.jpg",
      },
    },
    sources: [{ label: "Wikipedia — Fourth Nigerian Republic", url: "https://en.wikipedia.org/wiki/Fourth_Nigerian_Republic" }],
  },
  {
    id: "anthem-2024",
    date: { year: 2024, month: 5, day: 29 },
    era: "democracy",
    title: "Our first anthem returns",
    summary: "“Nigeria, We Hail Thee”, the anthem sung at independence, is restored by law.",
    image: {
      src: anthem2024,
      alt: "The green-domed National Assembly building in Abuja",
      caption: "The National Assembly, Abuja",
      credit: {
        author: "Kabusa16",
        ...CC_BY_SA_4,
        sourceUrl: "https://commons.wikimedia.org/wiki/File:National_Assembly_Building,_Abuja,_Nigeria.jpg",
      },
    },
    sources: [{ label: "Wikipedia — Nigeria, We Hail Thee", url: "https://en.wikipedia.org/wiki/Nigeria,_We_Hail_Thee" }],
  },
];
