import { useState } from 'react'
import { MEALS } from '../constants'
export default function DietTab() {
  const [openMeal,setOpenMeal]=useState<number|null>(null)
  return (<>
    <div className="info-box amber" style={{marginBottom:14}}><strong style={{fontFamily:"'Lora',serif"}}>Rujuta's philosophy:</strong> Eat local, seasonal & traditional. No calorie counting. No skipping meals. All ingredients available in Abu Dhabi.</div>
    {MEALS.map(m=>(<div key={m.id} className="meal-card" style={{background:m.color,borderColor:openMeal===m.id?m.accent+'60':m.accent+'25'}} onClick={()=>setOpenMeal(openMeal===m.id?null:m.id)}>
      <div style={{display:'flex',alignItems:'center',padding:'12px 13px',gap:9}}>
        <span style={{fontSize:19,flexShrink:0}}>{m.emoji}</span>
        <div style={{flex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2,flexWrap:'wrap'}}><span style={{fontSize:9,fontFamily:"'DM Mono',monospace",background:m.accent,color:'white',borderRadius:999,padding:'2px 6px'}}>{m.badge}</span><span style={{fontSize:13,fontFamily:"'Lora',serif",fontWeight:600,color:'#1a0d05'}}>{m.label}</span></div>
          <div style={{fontSize:10,color:'#7a6050',fontFamily:"'DM Mono',monospace"}}>{m.time}</div>
        </div>
        <span style={{color:m.accent,fontSize:13,display:'block',transform:openMeal===m.id?'rotate(180deg)':'none',transition:'transform 0.2s'}}>▾</span>
      </div>
      {openMeal===m.id&&(<div style={{padding:'0 13px 13px',borderTop:`1px solid ${m.accent}20`}}>
        <div style={{marginTop:9,marginBottom:8}}>{m.options.map((opt,i)=>(<div key={i} style={{display:'flex',gap:7,marginBottom:8,alignItems:'flex-start'}}><span style={{color:m.accent,fontSize:11,marginTop:2,flexShrink:0}}>◆</span><div><div style={{fontSize:12,fontFamily:"'Lora',serif",fontWeight:600,color:'#1a0d05',marginBottom:2}}>{opt.food}</div><div style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:'#7a6050',lineHeight:1.5}}>{opt.tip}</div></div></div>))}</div>
        <div style={{background:m.accent+'18',border:`1px solid ${m.accent}40`,borderRadius:7,padding:'8px 10px',fontSize:11,fontFamily:"'DM Mono',monospace",color:'#5a3a20',lineHeight:1.6}}>💡 {m.rule}</div>
      </div>)}
    </div>))}
    <div style={{background:'#f0f8f4',border:'1.5px solid #52b78840',borderRadius:12,padding:12,marginTop:16}}>
      <h4 style={{fontFamily:"'Lora',serif",fontSize:13,color:'#1a5c38',margin:'0 0 9px',fontWeight:600}}>🛒 Abu Dhabi Grocery Guide</h4>
      {[['LuLu Hypermarket','Bulk rice, dals, poha, atta, ghee, spices, coconut. 19+ branches.'],['Choithrams','Jaggery, kacchi ghani oils, kesar, MTR batter. Free same-day delivery.'],['Barakat Fresh','Indian vegetables delivered — karela, methi, drumstick. barakatfresh.ae'],['Quoodo','Online: specialty masalas, besan, halim seeds.'],['Carrefour / Spinneys','Organic produce, imported nuts, good paneer & curd.']].map(([s,d],i,arr)=>(<div key={i} style={{display:'flex',gap:6,marginBottom:i<arr.length-1?7:0,alignItems:'flex-start'}}><span style={{color:'#2d9d6e',fontSize:10,flexShrink:0,marginTop:1,fontFamily:"'DM Mono',monospace"}}>→</span><div style={{fontSize:11,fontFamily:"'DM Mono',monospace",lineHeight:1.5}}><span style={{fontFamily:"'Lora',serif",fontSize:12,fontWeight:600,color:'#1a5c38'}}>{s}: </span><span style={{color:'#3a6a4a'}}>{d}</span></div></div>))}
    </div>
  </>)
}
