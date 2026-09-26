export const INTRO_SEEN_KEY = "ng-intro-seen";

/**
 * Runs before first paint: marks the document as JS-capable and decides whether
 * the intro plays, so there is no flash of the hero before the overlay (and no
 * overlay at all without JS). Recording mode (`?record`) always replays it and
 * adds `.record` for the clean frame. Styles live in globals.css.
 */
const script = `(function(d){try{d.classList.add('js');var rec=new URLSearchParams(location.search).has('record');if(rec)d.classList.add('record');if((!rec&&sessionStorage.getItem('${INTRO_SEEN_KEY}'))||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-skip')}catch(e){d.classList.add('intro-skip')}})(document.documentElement)`;

export function IntroGateScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
