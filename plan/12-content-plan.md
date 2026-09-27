# 12 — Content Plan: 3 posts for Independence 2026

Three posts, three different jobs, so they don't feel repetitive:

| # | When to post (WAT) | Job | Length | Record by |
|---|---|---|---|---|
| 1 | **Mon 28 Sep**, ~7–8 pm | "I built this": code + a short explanation | 30–45 s | Sun 27 |
| 2 | **Tue 29 Sep**, ~8–9 pm | Countdown teaser: "Nigeria turns 66 tomorrow" | 15–20 s | Sun 27 |
| 3 | **Thu 1 Oct, 00:00–00:05** | The midnight switch to "Happy 66th" | 15–25 s | Sun 27 (pre-record) |

Live site: **https://nig-independence.vercel.app**

---

## Before you record (do once)

- [ ] **Latest version is live.** The celebration effects must be merged to `main`. Check: open `…/?record&date=2026-10-01T09:00`; you should see confetti.
- [ ] **Phone:** Do Not Disturb on, brightness up, battery > 50 %.
- [ ] **Motion on:** `?record` forces full motion, so your phone's Reduce Motion setting doesn't matter.
- [ ] **Silent recording:** don't rely on the site for sound. Add music in the app while editing (see "Audio").
- [ ] **Laptop (post 1, optional):** Chrome → DevTools → device toolbar → 390 × 844. Record with QuickTime (File → New Screen Recording → drag over the phone frame) or OBS. Export 1080 × 1920.

### Recording URLs (cheat sheet)

| What you want | URL (add to `https://nig-independence.vercel.app`) |
|---|---|
| Clean hero + intro, you scroll | `/?record` |
| Hands-free full tour (~60 s) | `/?record&autoplay` |
| Hands-free, ~30 s | `/?record&autoplay&speed=300` |
| Hands-free, ~15 s | `/?record&autoplay&speed=600` |
| Oct 1 celebration (confetti) | `/?record&date=2026-10-01T09:00` |
| **Countdown hits zero → finale** | `/?record&date=2026-09-30T23:59:50` (switch happens ~10 s after the intro) |
| The year 2060 (Centenary) | `/?record&date=2060-10-01T09:00` |

Keys (laptop): **Space** pause/resume auto-scroll, **R** restart. On a phone, pull to refresh to restart.

### Audio
Search the Instagram / TikTok music library for **"Nigeria, We Hail Thee"** (national anthem) or a trending Afrobeats track. Platform-licensed music is safe; screen-recorded audio is not.

---

## Post 1 — Mon 28 Sep: "I built a website that updates itself"

**Goal:** the builder story. The hook is "it will still be correct in 2060".

### Shot list
| # | Shot | How | Secs |
|---|---|---|---|
| 1 | **Hook:** the site intro (1960 → 2026 counter, flag sweep) | Phone: `/?record` | 0–4 |
| 2 | Hero: "Nigeria turns 66" + ticking countdown | same take | 4–7 |
| 3 | Code: `lib/anniversary/anniversary.ts`, scroll slowly | VS Code, zoomed (Cmd +) | 7–13 |
| 4 | Terminal: `npm test` → all tests passing | VS Code terminal | 13–17 |
| 5 | **Payoff:** "Happy 100th… Centenary" in 2060 | `/?record&date=2060-10-01T09:00` | 17–23 |
| 6 | Fast scroll through the photo timeline | `/?record&autoplay&speed=450` | 23–35 |
| 7 | End card: site URL | text overlay in the editor | 35–40 |

### Voice-over / on-screen text
> "I built a Nigeria Independence website that updates itself. Every year. Forever.
> No one has to change the year or the number. It works it out from the date, in Lagos time.
> Dozens of automated tests make sure it never gets it wrong.
> Here's what it will show in 2060. *(Centenary shot)*
> Nigeria at 66. Link in bio."

### Caption (draft)
> I built a website for Nigeria's Independence that updates itself every year, forever. 🇳🇬
> The anniversary, countdown and celebration mode are all worked out from the date in Lagos time. It'll say "Happy 100th" in 2060 without anyone touching it.
> Built with Next.js, GSAP and a lot of love for green-white-green.
> 🔗 nig-independence.vercel.app
>
> #NigeriaAt66 #IndependenceDay #Nigeria #NigerianTech #BuildInPublic #WebDevelopment #NextJS #GreenWhiteGreen

---

## Post 2 — Tue 29 Sep (evening): "Nigeria turns 66 tomorrow"

**Goal:** a short, shareable teaser. Pure visuals, no code.

### Shot list
| # | Shot | How | Secs |
|---|---|---|---|
| 1 | Intro counter 1960 → 2026 | Phone: `/?record` | 0–4 |
| 2 | "Nigeria turns 66" + countdown ticking (hold 2–3 s) | same take | 4–8 |
| 3 | Scroll: the motto band, the independence clock | same take, scroll by thumb | 8–12 |
| 4 | Timeline photos flying by | `/?record&autoplay&speed=600` | 12–18 |

**Tip:** record this on Tuesday evening itself so the countdown on screen reads "0 days, X hours". If you record on Sunday, the countdown will show "2 days"; either crop it out or say "in 2 days" in the caption.

### On-screen text
> "66 years ago, a nation was born."
> "Tomorrow, Nigeria turns 66." 🇳🇬

### Caption (draft)
> Tomorrow, Nigeria turns 66. 🇳🇬💚🤍💚
> Counting down live 👉 nig-independence.vercel.app
>
> #NigeriaAt66 #IndependenceDay #Nigeria #HappyIndependenceDay #GreenWhiteGreen #Naija

---

## Post 3 — Thu 1 Oct, 00:00: "Happy 66th Independence Day"

**Goal:** the emotional peak. Countdown → zero → fireworks.

### Record it in advance (Sunday)
1. Open `https://nig-independence.vercel.app/?record&date=2026-09-30T23:59:50` and start the screen recording **before** the page loads.
2. The intro plays, then the countdown reads **0 · 00 · 00 · 05… 04… 03…**
3. At zero: the **finale** fires, and the headline changes to **"Happy 66th Independence Day"** with the 66 counting up.
4. **Tap the hero** a few times during the finale for extra fireworks.
5. Keep recording 5–8 s after the switch. Do 2–3 takes and keep the best.

**Optional:** record it live on Wed 30 at 23:59 with the normal URL (no `date=`). That's the real moment, so you could film your phone with a second phone or show a clock beside it.

### Shot list
| # | Shot | Secs |
|---|---|---|
| 1 | Countdown 0 · 00 · 00 · 05 → 00 | 0–5 |
| 2 | **Switch:** finale + "Happy 66th Independence Day" | 5–12 |
| 3 | Taps: fireworks where you touch | 12–18 |
| 4 | (Optional) scroll to the timeline, photos wiping open | 18–25 |

### Caption (draft)
> Happy 66th Independence Day, Nigeria! 🇳🇬🎆
> 1 October 1960 → 1 October 2026. Unity and Faith, Peace and Progress.
> The site just switched to celebration mode at midnight 👉 nig-independence.vercel.app
>
> #HappyIndependenceDay #NigeriaAt66 #Nigeria66 #IndependenceDay #Nigeria #GreenWhiteGreen

**Post it between 00:00 and 00:05 WAT** so "it just switched" is true. Draft it in the app beforehand and hit publish at midnight.

---

## Before each post

- [ ] Watch it once with sound off: does it make sense without audio?
- [ ] First 2 seconds grab attention (intro counter or countdown)
- [ ] Link in bio points to https://nig-independence.vercel.app
- [ ] Cover frame chosen: the "66" hero or "Happy 66th"
- [ ] Captions and subtitles on (most people watch muted)

## Honesty note
Posts 1 and 3 use the `date=` preview. That's fine: it's your own site, showing exactly what it will do on those dates. For post 3, publish at the real midnight so the caption stays true.
