import { useState, useEffect } from 'react'
import type { WeightEntry, FitnessLogs, HabitLogs, Habit, BackupBundle } from './types'
import { DEFAULT_HABITS, START_WEIGHT, TARGET_WEIGHT } from './constants'
import { lsGet, lsSet, KEYS } from './storage'
import WeightTab  from './components/WeightTab'
import FitnessTab from './components/FitnessTab'
import HabitsTab  from './components/HabitsTab'
import DietTab    from './components/DietTab'
import BackupTab  from './components/BackupTab'

type Tab = 'tracker' | 'fitness' | 'habits' | 'diet' | 'backup'
const TABS: { key: Tab; label: string }[] = [
  { key: 'tracker', label: '⚖️ Weight'  },
  { key: 'fitness', label: '🏃 Fitness' },
  { key: 'habits',  label: '🌟 Habits'  },
  { key: 'diet',    label: '🥗 Diet'    },
  { key: 'backup',  label: '💾 Backup'  },
]

export default function App() {
  const [tab,setTab]           = useState<Tab>('tracker')
  const [entries,setEntries]   = useState<WeightEntry[]>([])
  const [fitness,setFitness]   = useState<FitnessLogs>({})
  const [habitLogs,setHLogs]   = useState<HabitLogs>({})
  const [habits,setHabits]     = useState<Habit[]>(DEFAULT_HABITS)

  useEffect(() => {
    setEntries(lsGet<WeightEntry[]>(KEYS.weightEntries) ?? [])
    setFitness(lsGet<FitnessLogs>(KEYS.fitnessLogs)    ?? {})
    setHLogs(lsGet<HabitLogs>(KEYS.habitLogs)          ?? {})
    setHabits(lsGet<Habit[]>(KEYS.habitDefs)           ?? DEFAULT_HABITS)
  }, [])

  const saveEntries = (e: WeightEntry[]) => { setEntries(e); lsSet(KEYS.weightEntries, e) }
  const saveFitness = (f: FitnessLogs)   => { setFitness(f); lsSet(KEYS.fitnessLogs, f) }
  const saveHLogs   = (h: HabitLogs)     => { setHLogs(h);   lsSet(KEYS.habitLogs, h) }
  const saveHabits  = (h: Habit[])       => { setHabits(h);  lsSet(KEYS.habitDefs, h) }

  const handleAddWeight    = (e: WeightEntry) => saveEntries([...entries, e].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
  const handleDeleteWeight = (id: number)     => saveEntries(entries.filter(e => e.id !== id))
  const handleRestore = (b: BackupBundle) => {
    if (b.entries)     saveEntries(b.entries)
    if (b.fitnessLogs) saveFitness(b.fitnessLogs)
    if (b.habitLogs)   saveHLogs(b.habitLogs)
    if (b.habits)      saveHabits(b.habits)
  }

  const bundle: BackupBundle = { entries, fitnessLogs: fitness, habitLogs, habits }

  return (
    <div style={{ minHeight:'100vh', background:'#fdf6ee', margin:0, fontFamily:'Georgia,serif' }}>
      <div style={{ background:'#1a0d05', color:'#fdf6ee', padding:'20px 16px 0', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ maxWidth:580, margin:'0 auto' }}>
          <div style={{ fontSize:10, letterSpacing:'0.2em', color:'#c8a070', fontFamily:"'DM Mono',monospace", textTransform:'uppercase', marginBottom:3 }}>
            weight · fitness · habits · rujuta
          </div>
          <h1 style={{ margin:'0 0 1px', fontSize:22, fontFamily:"'Lora',serif", fontWeight:600 }}>
            {START_WEIGHT} → {TARGET_WEIGHT} kg
          </h1>
          <p style={{ margin:'0 0 11px', fontSize:11, color:'#c8a070', fontFamily:"'DM Mono',monospace" }}>
            1 kg/month · vegetarian · abu dhabi
          </p>
          <div style={{ display:'flex', gap:2, overflowX:'auto', paddingBottom:1 }}>
            {TABS.map(({ key, label }) => (
              <button key={key} onClick={() => setTab(key)}
                style={{ border:'none', cursor:'pointer', whiteSpace:'nowrap', padding:'7px 12px', fontSize:11, borderRadius:'7px 7px 0 0', fontFamily:"'DM Mono',monospace", background:tab===key?'#fdf6ee':'transparent', color:tab===key?'#1a0d05':'#c8a070', fontWeight:tab===key?600:400, transition:'all 0.18s' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth:580, margin:'0 auto', padding:'16px 15px 80px' }}>
        {tab==='tracker' && <WeightTab  entries={entries}        onAdd={handleAddWeight} onDelete={handleDeleteWeight} />}
        {tab==='fitness' && <FitnessTab fitnessLogs={fitness}   onSave={saveFitness} />}
        {tab==='habits'  && <HabitsTab  habits={habits}          habitLogs={habitLogs} onSaveLogs={saveHLogs} onSaveHabits={saveHabits} />}
        {tab==='diet'    && <DietTab />}
        {tab==='backup'  && <BackupTab  bundle={bundle}          onRestore={handleRestore} />}
      </div>
    </div>
  )
}
