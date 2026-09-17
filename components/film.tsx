'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function Film({name,poster,label,className=''}:{name:string;poster:string;label:string;className?:string}){
  const ref=useRef<HTMLVideoElement>(null);
  const userPaused=useRef(false);
  const [playing,setPlaying]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const media=matchMedia('(prefers-reduced-motion: reduce)');let visible=false;
    const sync=()=>{if(!visible||document.hidden||media.matches||userPaused.current)el.pause();else el.play().catch(()=>{});};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.15});observer.observe(el);
    media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
    return()=>{observer.disconnect();media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);};
  },[name]);
  return <div className={`editorial-film ${className}`}><video ref={ref} poster={poster} muted loop playsInline preload="none" aria-label={label} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}><source src={`/videos/${name}.mp4`} type="video/mp4"/></video><button className="film-toggle" aria-label={`${playing?'Pause':'Play'} ${label}`} onClick={()=>{const el=ref.current;if(!el)return;userPaused.current=!el.paused;if(el.paused)el.play().catch(()=>{});else el.pause();}}>{playing?<Pause size={15}/>:<Play size={15}/>}<span>{playing?'Pause film':'Play film'}</span></button></div>;
}
