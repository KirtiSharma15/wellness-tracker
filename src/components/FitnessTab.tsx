import { useState } from 'react'
import type { FitnessLogs } from '../types'
import { FITNESS_METRICS } from '../constants'
import { fmt, whrBadge, todayStr } from '../utils'
import { Sparkline } from './Charts'
interface Props { fitnessLogs: FitnessLogs; onSave: (logs: FitnessLogs) => void }
export default function FitnessTab({ fitnessLogs, onSave }: Props) {
  const [inputs,setInputs]=useState<Record<string,string>>({});const [date,setDate]=useState(todayStr());const [flash,setFlash]=useState(false);const [openMetric,setOpenMetric]=useState<string|null>(null)
  const handleSave=()=>{
    if(!FITNESS_METRICS.some(m=>inputs[m.id]!==undefined&&inputs[m.id]!==''))return
    const u={...fitnessLogs}
    FITNESS_METRICS.forEach(m=>{const v=parseFloat(inputs[m.id]);if(!isNaN(v)){if(!u[m.id])u[m.id]=[];u[m.id]=u[m.id].filter(e=>e.date!==date);u[m.id].push({date,value:v});u[m.id].sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime())}})
    onSave(u);setInputs({});setFlash(true);setTimeout(()=>setFlash(false),1800)
  }
  const latestWaist=(fitnessLogs.waist||[]).at(-1)?.value;const latestHips=(fitnessLogs.hips||[]).at(-1)?.value;const whr=whrBadge(latestWaist,latestHips)
  return (<>
    <div className="info-box green" style={{marginBottom:14}}><strong style={{fontFamily:"'Lora',serif"}}>Rujuta says:</strong> These 7 markers tell you far more about metabolic health — hormonal, heart, blood sugar — than the scale ever will.</div>
    {whr&&<div className="card" style={{display:'flex',alignItems:'center',gap:11,marginBottom:13}}><span style={{fontSize:22}}>📊</span><div style={{flex:1}}><div className="mono-xs upper">Waist-to-Hip Ratio</div><div style={{fontSize:21,fontFamily:"'Lora',serif",fontStyle:'italic',color:'#1a0d05'}}>{whr.r}</div></div><div style={{background:whr.color+'20',border:`1.5px solid ${whr.color}`,borderRadius:999,padding:'4px 11px',fontSize:12,fontFamily:"'DM Mono',monospace",color:whr.color,fontWeight:500}}>{whr.label}</div></div>}
    <div className="card">
      <div className="mono-xs upper" style={{marginBottom:10}}>log fitness check-in</div>
      <div style={{marginBottom:10}}><div className="mono-xs" style={{marginBottom:3}}>date</div><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input" style={{width:'100%'}}/></div>
      <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:11}}>
        {FITNESS_METRICS.map(m=>(<div key={m.id} style={{flex:'1 1 calc(50% - 7px)',minWidth:130}}><div className="mono-xs" style={{marginBottom:2}}>{m.emoji} {m.label} ({m.unit})</div><input type="number" value={inputs[m.id]||''} onChange={e=>setInputs({...inputs,[m.id]:e.target.value})} placeholder="—" className="input" style={{fontSize:14,fontFamily:"'Lora',serif"}}/></div>))}
      </div>
      <button className="btn-primary" onClick={handleSave} style={{background:flash?'#2d9d6e':'#8b5e3c',width:'100%'}}>{flash?'✓ Saved!':'Save check-in'}</button>
      <div className="mono-xs" style={{marginTop:7,textAlign:'center',color:'#a08060'}}>Fill only what you measured today — not all fields required.</div>
    </div>
    <div className="mono-xs upper" style={{marginBottom:9,marginTop:14}}>history & trends</div>
    {FITNESS_METRICS.map(m=>{
      const hist=fitnessLogs[m.id]||[];const lat=hist.at(-1);const prev=hist.at(-2);const diff=lat&&prev?+(lat.value-prev.value).toFixed(1):null;const imp=diff===null?null:(m.better==='higher'?diff>=0:diff<=0)
      return(<div key={m.id} className="metric-card">
        <div style={{display:'flex',alignItems:'center',padding:'11px 13px',gap:9,cursor:'pointer'}} onClick={()=>setOpenMetric(openMetric===m.id?null:m.id)}>
          <span style={{fontSize:19,flexShrink:0}}>{m.emoji}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontFamily:"'Lora',serif",fontWeight:600,color:'#1a0d05',marginBottom:1}}>{m.label}</div>
            {lat?(<div style={{display:'flex',alignItems:'center',gap:7,flexWrap:'wrap'}}><span style={{fontSize:15,fontFamily:"'Lora',serif",fontStyle:'italic',color:'#1a0d05'}}>{lat.value} <span style={{fontSize:9,color:'#a08060',fontStyle:'normal',fontFamily:"'DM Mono',monospace"}}>{m.unit}</span></span>{diff!==null&&<span style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:imp?'#2d9d6e':'#c0392b'}}>{diff>0?`+${diff}`:diff}</span>}</div>):(<div style={{fontSize:11,color:'#b0a090',fontFamily:"'DM Mono',monospace"}}>not measured yet</div>)}
          </div>
          {hist.length>=2&&<Sparkline history={hist} better={m.better}/>}
          {hist.length>0&&<span style={{color:'#c8a882',fontSize:13,transform:openMetric===m.id?'rotate(180deg)':'none',transition:'transform 0.2s',display:'block',flexShrink:0}}>▾</span>}
        </div>
        {openMetric===m.id&&(<div style={{padding:'0 13px 13px',borderTop:'1px solid #e8d4bc'}}>
          <div style={{background:'#f5f0e8',borderRadius:7,padding:'8px 10px',marginTop:9,marginBottom:9}}>
            <div style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:'#5a3a20',lineHeight:1.6,marginBottom:5}}><strong style={{color:'#1a0d05'}}>How: </strong>{m.how}</div>
            <div style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:'#3a6a4a',lineHeight:1.6}}><strong style={{color:'#1a5c38'}}>Benchmark: </strong>{m.good}</div>
          </div>
          {hist.length>0&&<div className="list-card">{[...hist].reverse().map((h,i,arr)=>{const p=arr[i+1];const d=p?+(h.value-p.value).toFixed(1):null;const imp2=d===null?null:(m.better==='higher'?d>=0:d<=0);return(<div key={i} className="list-row" style={{borderBottom:i<arr.length-1?'1px solid #ecdec8':'none'}}><span style={{flex:1,fontSize:11,color:'#5a3a20',fontFamily:"'DM Mono',monospace"}}>{fmt(h.date)}</span><span style={{fontSize:14,fontFamily:"'Lora',serif",fontStyle:'italic',color:'#1a0d05',marginRight:7}}>{h.value} <span style={{fontSize:9,fontStyle:'normal',color:'#a08060',fontFamily:"'DM Mono',monospace"}}>{m.unit}</span></span>{d!==null&&<span style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:imp2?'#2d9d6e':'#c0392b',minWidth:28,textAlign:'right'}}>{d>0?`+${d}`:d}</span>}</div>)})}</div>}
        </div>)}
      </div>)
    })}
  </>)
}
