import { useState } from 'react'
import type { Habit, HabitLogs } from '../types'
import { EMOJI_OPTIONS, COLOR_OPTIONS } from '../constants'
import { todayStr, getStreak } from '../utils'
import { HabitWeekGrid } from './Charts'
interface Props { habits: Habit[]; habitLogs: HabitLogs; onSaveLogs: (l: HabitLogs) => void; onSaveHabits: (h: Habit[]) => void }
const BLANK = { label:'', emoji:'✨', unit:'min', type:'more' as const, target:30, color:'#8b5e3c' }
export default function HabitsTab({ habits, habitLogs, onSaveLogs, onSaveHabits }: Props) {
  const [inputs,setInputs]=useState<Record<string,string|boolean>>({});const [date,setDate]=useState(todayStr());const [flash,setFlash]=useState(false);const [showAdd,setShowAdd]=useState(false);const [newH,setNewH]=useState({...BLANK})
  const handleLog=()=>{
    if(!habits.some(h=>inputs[h.id]!==undefined&&inputs[h.id]!==''))return
    const u={...habitLogs}
    habits.forEach(h=>{const raw=inputs[h.id];if(raw===undefined||raw==='')return;if(!u[h.id])u[h.id]={};u[h.id][date]=h.type==='bool'?(raw?1:0):parseFloat(raw as string)})
    onSaveLogs(u);setInputs({});setFlash(true);setTimeout(()=>setFlash(false),1800)
  }
  const handleAdd=()=>{if(!newH.label.trim())return;onSaveHabits([...habits,{...newH,id:'custom_'+Date.now()}]);setNewH({...BLANK});setShowAdd(false)}
  const handleDel=(id:string)=>{onSaveHabits(habits.filter(h=>h.id!==id));const u={...habitLogs};delete u[id];onSaveLogs(u)}
  return (<>
    <div className="info-box blue" style={{marginBottom:14}}><strong style={{fontFamily:"'Lora',serif"}}>Daily habits shape long-term health.</strong> 7-dot grid = last 7 days. Filled = goal met, faded = partial, empty = not logged.</div>
    <div className="card">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}><div className="mono-xs upper">log today's habits</div><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input" style={{width:'auto'}}/></div>
      <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:11}}>
        {habits.map(h=>(<div key={h.id} style={{flex:'1 1 calc(50% - 7px)',minWidth:130}}>
          <div className="mono-xs" style={{marginBottom:3,display:'flex',alignItems:'center',gap:4}}><span>{h.emoji}</span><span style={{color:'#7a6050'}}>{h.label}</span><span style={{color:'#b0a090',fontSize:9}}>({h.type==='bool'?'yes/no':`goal:${h.target}`})</span></div>
          {h.type==='bool'?(<div style={{display:'flex',gap:6}}>{(['Yes','No'] as const).map(lbl=>{const isY=lbl==='Yes';const sel=inputs[h.id]!==undefined&&(inputs[h.id]?isY:!isY);return(<button key={lbl} onClick={()=>setInputs({...inputs,[h.id]:isY})} style={{flex:1,padding:'7px',border:`1.5px solid ${sel?h.color:'#dcc8b0'}`,borderRadius:7,background:sel?h.color+'20':'#fdf6ee',color:'#1a0d05',fontSize:12,fontFamily:"'DM Mono',monospace",cursor:'pointer'}}>{lbl}</button>)})}</div>):(<input type="number" value={(inputs[h.id] as string)||''} onChange={e=>setInputs({...inputs,[h.id]:e.target.value})} placeholder={`e.g. ${h.target}`} className="input" style={{fontSize:14,fontFamily:"'Lora',serif"}}/>)}
        </div>))}
      </div>
      <button className="btn-primary" onClick={handleLog} style={{background:flash?'#2d9d6e':'#8b5e3c',width:'100%'}}>{flash?'✓ Habits logged!':"Save today's habits"}</button>
    </div>
    <div className="mono-xs upper" style={{margin:'14px 0 9px'}}>7-day overview</div>
    {habits.map(h=>{
      const logs=habitLogs[h.id]||{};const todayVal=logs[todayStr()];const streak=getStreak(logs,h.type,h.target)
      const todayOk=todayVal===undefined?null:h.type==='bool'?todayVal>=1:h.type==='more'?todayVal>=h.target:todayVal<=h.target
      return(<div key={h.id} className="habit-row">
        <div style={{display:'flex',alignItems:'flex-start',gap:10}}>
          <span style={{fontSize:20,flexShrink:0,marginTop:2}}>{h.emoji}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:4,flexWrap:'wrap'}}>
              <span style={{fontSize:13,fontFamily:"'Lora',serif",fontWeight:600,color:'#1a0d05'}}>{h.label}</span>
              {todayOk===true&&<span style={{fontSize:10,background:h.color+'20',color:h.color,border:`1px solid ${h.color}40`,borderRadius:999,padding:'1px 7px',fontFamily:"'DM Mono',monospace"}}>✓ done</span>}
              {streak>0&&<span style={{fontSize:10,background:'#fff3e0',color:'#e9a825',border:'1px solid #e9a82540',borderRadius:999,padding:'1px 7px',fontFamily:"'DM Mono',monospace"}}>🔥 {streak}d streak</span>}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
              <HabitWeekGrid habit={h} logs={logs}/>
              {todayVal!==undefined&&<span style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:'#7a6050'}}>today: <strong style={{color:'#1a0d05'}}>{h.type==='bool'?(todayVal>=1?'Yes':'No'):todayVal} {h.type!=='bool'&&h.unit}</strong>{h.type!=='bool'&&<span style={{color:'#a08060'}}> / goal {h.target}</span>}</span>}
            </div>
            <div className="mono-xs" style={{marginTop:3,color:'#a08060'}}>{h.type==='bool'?'daily goal':h.type==='more'?`target: ≥ ${h.target} ${h.unit}`:`target: ≤ ${h.target} ${h.unit}`}</div>
          </div>
          <button className="btn-x" onClick={()=>handleDel(h.id)}>×</button>
        </div>
      </div>)
    })}
    {!showAdd?(<button className="btn-dashed" onClick={()=>setShowAdd(true)}>+ Add custom habit</button>):(
      <div style={{background:'#fff9f2',border:'1.5px solid #c8a882',borderRadius:13,padding:15,marginTop:4}}>
        <div className="mono-xs upper" style={{marginBottom:12}}>new habit</div>
        <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}>
          <div style={{flex:'0 0 auto'}}><div className="mono-xs" style={{marginBottom:3}}>emoji</div><div style={{display:'flex',flexWrap:'wrap',gap:4,width:136}}>{EMOJI_OPTIONS.map(e=>(<button key={e} onClick={()=>setNewH({...newH,emoji:e})} style={{fontSize:16,background:newH.emoji===e?'#e8d4bc':'transparent',border:newH.emoji===e?'1.5px solid #8b5e3c':'1.5px solid transparent',borderRadius:6,padding:3,cursor:'pointer',width:28,height:28}}>{e}</button>))}</div></div>
          <div style={{flex:1,minWidth:140}}>
            <div style={{marginBottom:8}}><div className="mono-xs" style={{marginBottom:3}}>habit name</div><input value={newH.label} onChange={e=>setNewH({...newH,label:e.target.value})} placeholder="e.g. Meditation" className="input"/></div>
            <div style={{display:'flex',gap:7,marginBottom:8}}>
              <div style={{flex:1}}><div className="mono-xs" style={{marginBottom:3}}>unit</div><input value={newH.unit} onChange={e=>setNewH({...newH,unit:e.target.value})} placeholder="min / pages" className="input"/></div>
              <div style={{flex:1}}><div className="mono-xs" style={{marginBottom:3}}>target</div><input type="number" value={newH.target} onChange={e=>setNewH({...newH,target:parseFloat(e.target.value)})} className="input"/></div>
            </div>
            <div style={{marginBottom:8}}><div className="mono-xs" style={{marginBottom:3}}>goal type</div><div style={{display:'flex',gap:5}}>{([['more','↑ More'],['less','↓ Less'],['bool','✓ Yes/No']] as const).map(([v,lbl])=>(<button key={v} onClick={()=>setNewH({...newH,type:v})} style={{flex:1,padding:'6px 4px',border:`1.5px solid ${newH.type===v?'#8b5e3c':'#dcc8b0'}`,borderRadius:7,background:newH.type===v?'#f5ede0':'#fdf6ee',color:'#1a0d05',fontSize:10,fontFamily:"'DM Mono',monospace",cursor:'pointer'}}>{lbl}</button>))}</div></div>
            <div><div className="mono-xs" style={{marginBottom:5}}>colour</div><div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{COLOR_OPTIONS.map(c=>(<div key={c} onClick={()=>setNewH({...newH,color:c})} style={{width:20,height:20,borderRadius:'50%',cursor:'pointer',background:c,border:newH.color===c?'2.5px solid #1a0d05':'2px solid transparent'}}/>))}</div></div>
          </div>
        </div>
        <div style={{display:'flex',gap:7}}><button className="btn-primary" onClick={handleAdd} style={{flex:1}}>Add habit</button><button className="btn-secondary" onClick={()=>setShowAdd(false)}>Cancel</button></div>
      </div>
    )}
  </>)
}
