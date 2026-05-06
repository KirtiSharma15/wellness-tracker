import { useState } from 'react'
import type { WeightEntry } from '../types'
import { START_WEIGHT, TARGET_WEIGHT, MONTHLY_GOAL } from '../constants'
import { fmt, todayStr } from '../utils'
import WeightChart from './WeightChart'
interface Props { entries: WeightEntry[]; onAdd: (e: WeightEntry) => void; onDelete: (id: number) => void }
export default function WeightTab({ entries, onAdd, onDelete }: Props) {
  const [wt,setWt]=useState('');const [dt,setDt]=useState(todayStr());const [flash,setFlash]=useState(false);const [confirmDel,setConfirmDel]=useState<number|null>(null)
  const handleAdd=()=>{const w=parseFloat(wt);if(!w||w<30||w>200)return;onAdd({id:Date.now(),date:dt,weight:w});setWt('');setFlash(true);setTimeout(()=>setFlash(false),1800)}
  const latest=entries[entries.length-1]
  const lost=latest?+(START_WEIGHT-latest.weight).toFixed(1):0
  const remaining=latest?+(latest.weight-TARGET_WEIGHT).toFixed(1):START_WEIGHT-TARGET_WEIGHT
  const pct=Math.min(100,Math.max(0,(lost/(START_WEIGHT-TARGET_WEIGHT))*100))
  const expectedNow=entries.length?+(START_WEIGHT-MONTHLY_GOAL*((Date.now()-new Date(entries[0].date).getTime())/(30.44*864e5))).toFixed(1):START_WEIGHT
  const vsPace=latest?+(latest.weight-Math.max(TARGET_WEIGHT,expectedNow)).toFixed(1):null
  const stats:[string,string,string][]=[['lost',lost>0?`-${lost}`:'—','kg so far'],['to go',remaining>0?String(remaining):'✓',remaining>0?'kg':'achieved!'],['months',remaining>0?(remaining/MONTHLY_GOAL).toFixed(1):'0','remaining'],...(vsPace!==null?[['vs pace',vsPace>0?`+${vsPace}`:String(vsPace),vsPace<=0?'ahead 🎯':'behind'] as [string,string,string]]:[])]
  return (<>
    <div style={{marginBottom:14}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}><span className="mono-sm">progress to goal</span><span className="mono-sm" style={{fontWeight:500}}>{pct.toFixed(1)}%</span></div>
      <div style={{height:10,background:'#e8d8c4',borderRadius:999,overflow:'hidden'}}><div style={{height:'100%',width:`${pct}%`,background:'linear-gradient(90deg,#8b5e3c,#d4883a)',borderRadius:999,transition:'width 0.8s'}}/></div>
    </div>
    <div style={{display:'flex',gap:7,marginBottom:14,flexWrap:'wrap'}}>
      {stats.map(([label,val,sub],i)=>(<div key={i} className="stat-card"><div className="mono-xs upper">{label}</div><div className="serif-lg" style={{color:label==='vs pace'?(vsPace!<=0?'#2d9d6e':'#c0392b'):'#1a0d05'}}>{val}</div><div className="mono-xs">{sub}</div></div>))}
    </div>
    {entries.length>0&&<div className="card" style={{padding:'11px 8px 4px',marginBottom:14}}><WeightChart entries={entries}/></div>}
    <div className="card">
      <div className="mono-xs upper" style={{marginBottom:10}}>log weight</div>
      <div style={{display:'flex',gap:7,flexWrap:'wrap',alignItems:'flex-end'}}>
        <div style={{flex:1,minWidth:88}}><div className="mono-xs" style={{marginBottom:3}}>weight (kg)</div><input type="number" value={wt} onChange={e=>setWt(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleAdd()} placeholder="72.4" className="input" style={{fontSize:16,fontFamily:"'Lora',serif"}}/></div>
        <div style={{flex:1,minWidth:118}}><div className="mono-xs" style={{marginBottom:3}}>date</div><input type="date" value={dt} onChange={e=>setDt(e.target.value)} className="input"/></div>
        <button className="btn-primary" onClick={handleAdd} style={{background:flash?'#2d9d6e':'#8b5e3c'}}>{flash?'✓ saved':'Log it'}</button>
      </div>
    </div>
    {entries.length>0&&<div style={{marginTop:14}}>
      <div className="mono-xs upper" style={{marginBottom:8}}>history</div>
      <div className="list-card">
        {[...entries].reverse().map((e,i,arr)=>{const prev=arr[i+1];const diff=prev?+(e.weight-prev.weight).toFixed(1):null;return(
          <div key={e.id} className="list-row" style={{borderBottom:i<arr.length-1?'1px solid #ecdec8':'none'}}>
            <span style={{flex:1,fontSize:12,color:'#5a3a20',fontFamily:"'DM Mono',monospace"}}>{fmt(e.date)}</span>
            <span style={{fontSize:16,fontFamily:"'Lora',serif",fontStyle:'italic',color:'#1a0d05',marginRight:8}}>{e.weight} kg</span>
            {diff!==null&&<span style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:diff<0?'#2d9d6e':diff>0?'#c0392b':'#a08060',minWidth:32,textAlign:'right',marginRight:6}}>{diff>0?`+${diff}`:diff}</span>}
            {confirmDel===e.id?(<span style={{display:'flex',gap:4}}><button className="btn-del" onClick={()=>{onDelete(e.id);setConfirmDel(null)}}>del</button><button className="btn-cancel" onClick={()=>setConfirmDel(null)}>no</button></span>):(<button className="btn-x" onClick={()=>setConfirmDel(e.id)}>×</button>)}
          </div>
        )})}
      </div>
    </div>}
    {!entries.length&&<div style={{textAlign:'center',padding:'30px 0',color:'#a08060',fontFamily:"'DM Mono',monospace",fontSize:12}}><div style={{fontSize:28,marginBottom:7}}>⚖️</div>log your first weigh-in to begin</div>}
  </>)
}
