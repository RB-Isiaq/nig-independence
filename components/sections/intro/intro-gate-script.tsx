import { MOTION_PREF_KEY } from "@/lib/motion-preference";

export const INTRO_SEEN_KEY = "ng-intro-seen";

/**
 * Runs before first paint and sets classes on <html>:
 *   js            JS is running (the intro overlay only exists with JS)
 *   record        recording mode (`?record`): clean frame, intro always replays
 *   motion-gentle reduced motion in effect (OS setting or the visitor's choice)
 *   motion-full   full motion chosen despite the OS reduce-motion setting
 *   intro-skip    don't play the intro (seen this session, or gentle motion)
 *
 * Mirrors `resolveMotionLevel` in lib/motion-preference.ts; the unit test runs
 * this exact script against both to keep them in sync. Styles: globals.css.
 */
export const GATE_SCRIPT = `(function(d){
try{
d.classList.add('js');
var rec=new URLSearchParams(location.search).has('record');
if(rec)d.classList.add('record');
var pref=null,seen=null;
try{pref=localStorage.getItem('${MOTION_PREF_KEY}');seen=sessionStorage.getItem('${INTRO_SEEN_KEY}')}catch(e){}
var sys=matchMedia('(prefers-reduced-motion: reduce)').matches;
var gentle=rec?false:pref==='full'?false:pref==='gentle'?true:sys;
if(gentle)d.classList.add('motion-gentle');else if(sys)d.classList.add('motion-full');
if(gentle||(!rec&&seen))d.classList.add('intro-skip');
}catch(e){d.classList.add('intro-skip')}
})(document.documentElement)`.replace(/\n/g, "");

export function IntroGateScript() {
  return <script dangerouslySetInnerHTML={{ __html: GATE_SCRIPT }} />;
}
