export const INTRO_SEEN_KEY = "ng-intro-seen";

/**
 * Runs before first paint: marks the document as JS-capable and decides whether
 * the intro plays, so there is no flash of the hero before the overlay (and no
 * overlay at all without JS). Styles live in globals.css under `.intro`.
 */
const script = `(function(d){try{d.classList.add('js');if(sessionStorage.getItem('${INTRO_SEEN_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-skip')}catch(e){d.classList.add('intro-skip')}})(document.documentElement)`;

export function IntroGateScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
