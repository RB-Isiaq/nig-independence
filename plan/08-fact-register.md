# 08 — Fact Register

Every factual claim shown on the site.

**Status key**
- ✅ **human-verified**: the owner read the source.
- 🔎 **source-matched**: an automated check found the claim stated in its own source (quote below). High confidence; a human glance is still welcome.
- 🟡 **drafted**: written by AI, link works, not yet matched.
- ❌ **removed/disputed**

Rule: nothing ships without a row here.

**Source check, 26 Sep 2026:** every claim was checked against the plain text of its Wikipedia source (Britannica blocks automated reads, so Lugard's Wikipedia article was used for 1914). **All 10 matched after one fix:** "Nigeria's longest run of civilian rule" (1999) wasn't stated in the source, so it was rewritten.

| id | Claim as displayed | Matching source text | Status |
|---|---|---|---|
| amalgamation-1914 | Northern & Southern Protectorates merged into one Nigeria, 1 Jan 1914 | "…the January 1, 1914 amalgamation agreement" (History of Nigeria); "…the 1914 amalgamation of the Northern and Southern Protectorates of Nigeria" (Lugard) | 🔎 |
| independence-1960 | Free nation, Tafawa Balewa as Prime Minister, 1 Oct 1960 | "…transfer of sovereignty that took place in Lagos at midnight on 1 October 1960, when the Union Jack was lowered…"; Balewa "was the first and only Prime Minister of Nigeria" | 🔎 |
| republic-1963 | Republic, Azikiwe first President, 1 Oct 1963 | "Nnamdi Azikiwe served as the first president from 1 October 1963 – 16 January 1966" | 🔎 |
| civil-war-1967 | After the 1966 coups, civil war 6 Jul 1967 – 15 Jan 1970, great human cost, country still one | "The Nigerian Civil War (6 July 1967 – 15 January 1970)…"; "Immediate causes of the war in 1966 included a military coup, a counter-coup…" | 🔎 |
| soyinka-nobel-1986 | First African to win the Nobel Prize in Literature, 1986 | "Soyinka was awarded the Nobel Prize for Literature in 1986, becoming the first African laureate." | 🔎 |
| abuja-1991 | Seat of government moves from Lagos to Abuja, 12 Dec 1991 | "It replaced Lagos… as the capital on 12 December 1991." | 🔎 |
| june-12-1993 | Election widely seen as free and fair annulled; June 12 Democracy Day since 2019; stadium renamed after Abiola, 2019 | "the results were annulled by the military government"; observers "deemed the election free and fair"; declared the new Democracy Day on June 6, 2018 (first held 12 June 2019); "On 12 June 2019… change of the name… to Moshood Abiola National Stadium" | 🔎 |
| atlanta-1996 | Olympic football gold in Atlanta, a first for Africa, 3 Aug 1996; Kanu captain | "Nigeria were the first African country to win gold"; "gold medal match… on August 3, 1996"; Kanu "captained the Nigeria national team that won gold at the Olympics" | 🔎 |
| fourth-republic-1999 | A new constitution begins the Fourth Republic, Obasanjo elected President, 29 May 1999 | "Nigeria adopted the constitution of the Fourth Republic on 29 May 1999"; "Obasanjo was elected on the PDP platform" | 🔎 (rewritten 26 Sep) |
| anthem-2024 | "Nigeria, We Hail Thee" restored by law, 29 May 2024 | "…officially readopted on 29 May 2024 after a bill… was passed by the National Assembly and was signed by the President." | 🔎 |

**Removed from the site in the 26 Sep trim** (still true, just cut for brevity): federation 1954, Naira + NYSC 1973, Second Republic 1979, 36 states 1996 (planned for the states map), standalone Democracy Day 2019 (merged into June 12).

## Images (all Wikimedia Commons, credited on each card and in the footer)
Licence templates were read from each file page on 26 Sep 2026.

| Moment | File | Author | Licence (Commons template) | Status |
|---|---|---|---|---|
| 1914 | Southern and Northern Nigeria c. 1914.jpg | John Bartholomew & Co. | PD-old (published c. 1914) | 🔎 clean |
| 1960 | Young kids celebrate Nigeria's independence in 1960.png | Unknown, Nationaal Archief (Elsevier) | PD-Nigeria + PD-1996 | ⚠️ **Low risk, not airtight.** Public domain in Nigeria (50 years from publication, so since 2010), but the US "PD-1996" tag looks doubtful for a 1960 photo. The alternative (Ahmadu Bello, 1960) has no stronger licence. Keep, and swap if anyone ever objects. |
| 1963 | ASC Leiden – Crebolder 1-003 "Dr. Zik…" (after 1972) | H.F.J.M. Crebolder | CC BY-SA 4.0 (ASC Leiden release) | 🔎 |
| 1967 | Food aid Nigeria.png (1968) | Dr. Lyle Conrad, US CDC | PD-USGov-HHS-CDC | 🔎 clean (US federal work) |
| 1986 | Wole Soyinka in 2018.jpg | Frankie Fouganthin | CC BY-SA 4.0 (own work) | 🔎 |
| 1991 | Aso Rock.jpg | Jeff Attaway | CC BY 2.0 | 🔎 |
| 1993 | Abuja Stadium 1.jpg | Jeff Attaway | CC BY 2.0 (Flickr review passed); category "Abuja Stadium" = the national stadium | 🔎 |
| 1996 | 1 nwankwo kanu 2017 (cropped).jpg | Chensiyuan (crop: Danyele) | CC BY-SA 4.0 | 🔎 |
| 1999 | Obasanjo Cohen.jpg (30 Mar 1999) | Robert D. Ward, US DoD | Public domain (US federal work) | 🔎 clean |
| 2024 | National Assembly Building, Abuja, Nigeria.jpg | Kabusa16 | CC BY-SA 4.0 (own work) | 🔎 |

## Audio: not on the site (decided 26 Sep)
The only usable recording ("Nigeria, We Hail Thee", Brazilian Presidential Guard Band, 2025) claimed CC BY 4.0 from a YouTube upload that is now **private**, so the licence can't be verified, and its Commons licence review is still pending. Other options were a weak-provenance "own work" upload and a MIDI by an unknown author. **Removed before it was ever committed.**
- Social videos: add the anthem from Instagram's / TikTok's licensed music library while editing.
- To bring it back: use a recording the owner has rights to (own recording, or a licensed stock track). Put the files in `public/audio/` and restore the tap-to-play button (see git history of this plan: `AnthemButton` design used `preload="none"` with MP3 + OGG sources, a floating now-playing pill is still to do, and a credit line in the footer).

Rejected images: Biafra outline map (odd visual, politically loaded alone); Gowon 1970 portrait (one side's leader, unclear licence); Red Cross aircrew photos (not informative); 1955 Azikiwe newspaper scan (too degraded); "Starving children" civil-war photo (not appropriate for a celebration page).

## Other copy on the page
| Where | Claim | Status |
|---|---|---|
| Hero footer / site footer | Motto "Unity and Faith, Peace and Progress" | 🔎 "Nigeria's national motto since 1978: 'Unity and Faith, Peace and Progress'" (Coat of arms of Nigeria) |
| Clock intro | "the moment the Union Jack was lowered in Lagos" (midnight, 1 Oct 1960) | 🔎 "…in Lagos at midnight on 1 October 1960, when the Union Jack was lowered" |
| Hero (celebration) | "the green-white-green was raised over a free Nigeria" | 🔎 "…replaced with Nigeria's green–white–green flag" |
| Flag strips | 36 strips = nod to 36 states (decorative, not a factual claim) | n/a |

## Candidates for later phases (not yet on site)
- Flag designed by Michael Taiwo Akinkunmi (1958/59 competition); he died Aug 2023.
- States: 12 (1967) → 19 (1976) → 21 (1987) → 30 (1991) → 36 (1996).
- National pledge, coat of arms description.
