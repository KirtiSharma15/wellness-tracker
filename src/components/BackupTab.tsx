import { useState } from 'react'
import type { BackupBundle } from '../types'
import { encodeBackup, decodeBackup } from '../utils'
interface Props { bundle: BackupBundle; onRestore: (b: BackupBundle) => void }
export default function BackupTab({ bundle, onRestore }: Props) {
  const [input,setInput]=useState('');const [status,setStatus]=useState<'ok'|'err'|null>(null);const [copied,setCopied]=useState(false)
  const hasData=bundle.entries.length>0||Object.keys(bundle.fitnessLogs).length>0||Object.keys(bundle.habitLogs).length>0
  const copy=()=>{navigator.clipboard?.writeText(encodeBackup(bundle)).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000)}
  const restore=()=>{const p=decodeBackup(input);if(!p){setStatus('err');return};onRestore(p);setStatus('ok');setInput('');setTimeout(()=>setStatus(null),2500)}
  return (<>
    <div className="card" style={{marginBottom:11}}><h3 style={{fontFamily:"'Lora',serif",fontSize:15,margin:'0 0 5px',color:'#1a0d05'}}>💾 How backup works</h3><p style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:'#7a6050',lineHeight:1.65,margin:0}}>Backup includes weight entries, fitness metrics & all habit logs. Copy the code → paste into Evernote → restore anytime on any device.</p></div>
    <div style={{background:'#f0f8f4',border:'1.5px solid #52b78850',borderRadius:13,padding:14,marginBottom:11}}>
      <div className="mono-xs upper" style={{color:'#1a5c38',marginBottom:8,fontWeight:500}}>Step 1 — Save your data</div>
      {!hasData?(<div className="mono-xs">No data yet. Log some entries first.</div>):(<>
        <div className="mono-xs" style={{color:'#3a6a4a',marginBottom:8,lineHeight:1.5}}>{bundle.entries.length} weight entries · {Object.keys(bundle.fitnessLogs).length} fitness metrics · {Object.keys(bundle.habitLogs).length} habit trackers</div>
        <div style={{background:'#e8f5ee',border:'1px solid #52b78860',borderRadius:7,padding:'8px 10px',fontFamily:"'DM Mono',monospace",fontSize:10,color:'#1a5c38',wordBreak:'break-all',marginBottom:8,lineHeight:1.6,userSelect:'all'}}>{encodeBackup(bundle)}</div>
        <button className="btn-primary" onClick={copy} style={{background:copied?'#2d9d6e':'#1a5c38',width:'100%'}}>{copied?'✓ Copied!':'📋 Copy backup code'}</button>
      </>)}
    </div>
    <div style={{background:'#fff5f5',border:'1.5px solid #e0525250',borderRadius:13,padding:14}}>
      <div className="mono-xs upper" style={{color:'#8a2020',marginBottom:8,fontWeight:500}}>Step 2 — Restore on any device</div>
      <textarea value={input} onChange={e=>{setInput(e.target.value);setStatus(null)}} placeholder="Paste your backup code here…" rows={3} style={{width:'100%',padding:'8px 10px',border:'1.5px solid #dcc8b0',borderRadius:7,fontSize:12,fontFamily:"'DM Mono',monospace",background:'#fdf6ee',color:'#1a0d05',resize:'none',marginBottom:7}}/>
      {status==='ok'&&<div style={{fontSize:11,color:'#2d9d6e',fontFamily:"'DM Mono',monospace",marginBottom:6}}>✓ Restored! Switch to any tab.</div>}
      {status==='err'&&<div style={{fontSize:11,color:'#c0392b',fontFamily:"'DM Mono',monospace",marginBottom:6}}>✗ Invalid code. Paste the exact backup code.</div>}
      <button className="btn-primary" onClick={restore} disabled={!input.trim()} style={{background:input.trim()?'#8b5e3c':'#d4c4b0',width:'100%',cursor:input.trim()?'pointer':'default'}}>🔄 Restore from backup</button>
    </div>
    <div style={{marginTop:12,padding:'10px 12px',background:'#fffbf0',border:'1px solid #f4c06a40',borderRadius:10,fontSize:11,color:'#7a6030',fontFamily:"'DM Mono',monospace",lineHeight:1.6}}>💡 After every log session: Backup tab → copy → paste into Evernote "Wellness Tracker Backup" note.</div>
  </>)
}
