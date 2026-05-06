import type { Habit } from '../types'
import { todayStr, last7Days } from '../utils'
interface SparklineProps { history: { date: string; value: number }[]; better: string }
export function Sparkline({ history, better }: SparklineProps) {
  if (history.length < 2) return null
  const vals=history.map(h=>h.value),minV=Math.min(...vals),maxV=Math.max(...vals),range=maxV-minV||1
  const W=72,H=26
  const pts=history.map((h,i)=>`${(i/(history.length-1))*W},${H-((h.value-minV)/range)*H}`)
  const improving=better==='higher'?history.at(-1)!.value>=history[0].value:history.at(-1)!.value<=history[0].value
  const color=improving?'#2d9d6e':'#c0392b';const last=pts.at(-1)!.split(',')
  return (<svg viewBox={`0 0 ${W} ${H}`} style={{width:72,height:26,flexShrink:0}}><polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/><circle cx={last[0]} cy={last[1]} r="3" fill={color}/></svg>)
}
interface GridProps { habit: Habit; logs: Record<string, number> }
export function HabitWeekGrid({ habit, logs }: GridProps) {
  const days=last7Days(),today=todayStr()
  return (
    <div style={{display:'flex',gap:4,alignItems:'center'}}>
      {days.map(d=>{
        const entry=logs[d];let filled=false,partial=false
        if(entry!==undefined){if(habit.type==='bool'){filled=entry>=1}else if(habit.type==='more'){filled=entry>=habit.target;partial=entry>0&&entry<habit.target}else{filled=entry<=habit.target;partial=entry>habit.target}}
        return(<div key={d} title={`${d}${entry!==undefined?`: ${entry} ${habit.unit}`:': not logged'}`} style={{width:11,height:11,borderRadius:3,flexShrink:0,background:entry===undefined?'#e8d8c4':filled?habit.color:partial?habit.color+'60':'#e8d8c4',border:d===today?`2px solid ${habit.color}`:'none'}}/>)
      })}
    </div>
  )
}
