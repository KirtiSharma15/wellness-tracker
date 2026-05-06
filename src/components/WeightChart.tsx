import type { WeightEntry } from '../types'
import { START_WEIGHT, TARGET_WEIGHT, MONTHLY_GOAL } from '../constants'
interface Props { entries: WeightEntry[] }
export default function WeightChart({ entries }: Props) {
  if (!entries.length) return null
  const W=480,H=165,pad={t:16,r:16,b:22,l:32}
  const iW=W-pad.l-pad.r,iH=H-pad.t-pad.b
  const dates=entries.map(e=>new Date(e.date).getTime())
  const minD=Math.min(...dates),maxD=Math.max(...dates,Date.now()+35*864e5)
  const allW=[START_WEIGHT,...entries.map(e=>e.weight),TARGET_WEIGHT]
  const minW=Math.min(...allW)-1,maxW=Math.max(...allW)+1
  const xS=(d:number|string)=>pad.l+((new Date(d).getTime()-minD)/(maxD-minD))*iW
  const yS=(w:number)=>pad.t+((maxW-w)/(maxW-minW))*iH
  const ticks:number[]=[];for(let w=Math.ceil(minW);w<=Math.floor(maxW);w+=2)ticks.push(w)
  const endMs=minD+(START_WEIGHT-TARGET_WEIGHT)/MONTHLY_GOAL*30.44*864e5
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',height:'auto'}}>
      {ticks.map(t=>(<g key={t}><line x1={pad.l} x2={W-pad.r} y1={yS(t)} y2={yS(t)} stroke="#e0d0bc" strokeWidth="0.5" strokeDasharray="3,3"/><text x={pad.l-4} y={yS(t)+4} textAnchor="end" fontSize="9" fill="#a08060" fontFamily="monospace">{t}</text></g>))}
      <line x1={pad.l} x2={W-pad.r} y1={yS(TARGET_WEIGHT)} y2={yS(TARGET_WEIGHT)} stroke="#4a9c6d" strokeWidth="1" strokeDasharray="2,3"/>
      <text x={W-pad.r-2} y={yS(TARGET_WEIGHT)-4} textAnchor="end" fontSize="8" fill="#4a9c6d" fontFamily="monospace">goal {TARGET_WEIGHT}kg</text>
      <line x1={xS(entries[0].date)} y1={yS(START_WEIGHT)} x2={xS(endMs)} y2={yS(TARGET_WEIGHT)} stroke="#c8a882" strokeWidth="1.5" strokeDasharray="6,4"/>
      {entries.length>1&&<path d={entries.map((e,i)=>`${i===0?'M':'L'}${xS(e.date)},${yS(e.weight)}`).join(' ')} stroke="#8b5e3c" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>}
      {entries.map((e,i)=><circle key={i} cx={xS(e.date)} cy={yS(e.weight)} r="4" fill="#8b5e3c" stroke="#fdf6ee" strokeWidth="2"/>)}
    </svg>
  )
}
