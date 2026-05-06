import type { FitnessMetric, Habit } from './types'
export const START_WEIGHT = 73
export const TARGET_WEIGHT = 60
export const MONTHLY_GOAL = 1
export const FITNESS_METRICS: FitnessMetric[] = [
  { id:'rhr',    label:'Resting Heart Rate', emoji:'❤️',  unit:'bpm',        better:'lower',  how:'Measure first thing in morning before getting out of bed. Count pulse for 60 seconds.',      good:'60–80 bpm is healthy. Below 60 is excellent. Above 100 = see a doctor.' },
  { id:'squats', label:'Strength',           emoji:'💪',  unit:'squats/min', better:'higher', how:'Do as many full squats as possible in 1 minute. Knees behind toes, back straight.',          good:'20–30 is good. 30+ excellent. Improve by 2–3 each month.' },
  { id:'stamina',label:'Stamina',            emoji:'🏃',  unit:'steps/3min', better:'higher', how:'Step up and down on a stair continuously for 3 minutes. Count total steps.',                  good:'More steps = better stamina. Track your monthly improvement.' },
  { id:'plank',  label:'Stability',          emoji:'🧘',  unit:'seconds',    better:'higher', how:'Forearm plank — elbows under shoulders, body straight. Time until form breaks.',              good:'30s = beginner, 60s = good, 90s+ = excellent.' },
  { id:'flex',   label:'Flexibility',        emoji:'🤸',  unit:'cm',         better:'higher', how:'Sit on floor, legs straight. Reach toward toes. + = past toes, - = short of toes.',          good:'Reaching toes = 0. Aim to improve 1–2 cm per month.' },
  { id:'waist',  label:'Waist',              emoji:'📏',  unit:'cm',         better:'lower',  how:"Tape at narrowest part of torso (just above belly button). Exhale naturally, don't suck in.", good:'Under 80 cm healthy for women. Under 88 cm acceptable.' },
  { id:'hips',   label:'Hips',               emoji:'📐',  unit:'cm',         better:'ratio',  how:'Tape at broadest part of hips/buttocks. Keep tape parallel to floor.',                        good:'Used with waist for WHR. Ideal for women: below 0.85.' },
]
export const DEFAULT_HABITS: Habit[] = [
  { id:'youtube', label:'YouTube',         emoji:'📺', unit:'min',     type:'less', target:60,   color:'#e05252' },
  { id:'reading', label:'Book Reading',    emoji:'📖', unit:'min',     type:'more', target:30,   color:'#4361ee' },
  { id:'sleep',   label:'Sleep',           emoji:'😴', unit:'hrs',     type:'more', target:7.5,  color:'#7c4dca' },
  { id:'water',   label:'Water',           emoji:'💧', unit:'glasses', type:'more', target:8,    color:'#2d9d6e' },
  { id:'steps',   label:'Steps / Walk',    emoji:'🚶', unit:'steps',   type:'more', target:8000, color:'#e9a825' },
  { id:'phone',   label:'Phone Pickups',   emoji:'📱', unit:'times',   type:'less', target:50,   color:'#f4a261' },
  { id:'surya',   label:'Suryanamaskars',  emoji:'🧘', unit:'count',   type:'more', target:5,    color:'#52b788' },
  { id:'nosugar', label:'No Packaged Food',emoji:'🚫', unit:'day',     type:'bool', target:1,    color:'#8b5e3c' },
]
export const EMOJI_OPTIONS = ['📺','📖','😴','💧','🚶','📱','🧘','🚫','🏃','🥗','☕','🎵','💻','✍️','🌿','🕐','🎯','💪','🧠','❤️']
export const COLOR_OPTIONS  = ['#e05252','#4361ee','#7c4dca','#2d9d6e','#e9a825','#f4a261','#52b788','#8b5e3c','#c77dff','#ef233c']
export const MEALS = [
  { id:1, time:'Within 20 min of waking',  emoji:'🌅', label:'Wake-Up Meal',       color:'#fffbf0', accent:'#e9a825', badge:'Meal 1',
    options:[{food:'Banana',tip:'Fresh local from LuLu/Barakat. Best for digestion & blood sugar.'},{food:'6–8 soaked almonds',tip:'Soak overnight, peel. Better mineral absorption.'},{food:'7–8 soaked raisins + kesar',tip:'Soak overnight. Good for energy & hormonal balance.'}],
    rule:'Glass of plain water FIRST. Tea/coffee ok 10–15 min AFTER — never before.'},
  { id:2, time:'~2 hours after Meal 1',    emoji:'🍳', label:'Breakfast',           color:'#f0faf5', accent:'#2d9d6e', badge:'Meal 2',
    options:[{food:'Poha with veggies + peanuts',tip:'Mustard seeds tadka in kacchi ghani oil.'},{food:'Idli / Dosa with sambar',tip:'Ready batter (MTR/ID) at Indian stores.'},{food:'Whole wheat paratha + curd + ghee',tip:'Generous ghee is fine — not the enemy.'}],
    rule:'If exercising after breakfast, wait 60 min. Never work out on empty stomach.'},
  { id:3, time:'2–3 hrs after Meal 2',     emoji:'🥜', label:'Mid-Morning Snack',   color:'#f5f0ff', accent:'#7c4dca', badge:'Meal 3',
    options:[{food:'Cashews / almonds',tip:'Raw from LuLu bulk section.'},{food:'Fresh coconut water',tip:'Whole coconuts at LuLu/Carrefour.'},{food:'Seasonal fruit',tip:'Dates, pomegranate, guava. Eat whole, solo, never juice.'}],
    rule:'Fruit: eat solo, chew never juice. Abu Dhabi: dates autumn, citrus winter, mango summer.'},
  { id:4, time:'2–3 hrs after Meal 3',     emoji:'🍛', label:'Lunch',               color:'#fff5f5', accent:'#e05252', badge:'Meal 4',
    options:[{food:'White rice + dal + sabzi',tip:'Dal-rice is prebiotic. White > brown rice for mineral absorption.'},{food:'Rotis + dal + sabzi + curd',tip:'Add ghee on roti. Add pickle for probiotics.'},{food:'Rajma / Chole / Dal makhani',tip:'Protein-rich. At every Abu Dhabi supermarket.'}],
    rule:'Always add ghee. Cook only in kacchi ghani oils — never refined oil.'},
  { id:5, time:'4–6 PM — most important!', emoji:'⭐', label:'Make-or-Break Snack', color:'#fffaf0', accent:'#f4a261', badge:'Meal 5',
    options:[{food:'Roasted chana + jaggery',tip:"Rujuta's signature. At Choithrams & LuLu Indian aisle."},{food:'Peanuts + jaggery',tip:'Budget-friendly, iron-rich.'},{food:'Chaas with jeera & hing',tip:'Homemade with curd + water + roasted cumin.'}],
    rule:'NEVER skip this. Skipping = overeating dinner + poor sleep. This meal determines your results.'},
  { id:6, time:'Post 6 PM — keep light',   emoji:'🌙', label:'Dinner',              color:'#f0f5ff', accent:'#4361ee', badge:'Meal 6',
    options:[{food:'Poha / Upma / Khichdi',tip:'Best light dinner. Easy on digestion.'},{food:'Dosa / Idli with sambar',tip:'Fermented — excellent for gut health.'},{food:'Besan cheela',tip:'High protein, 10 minutes.'}],
    rule:'Eat 2–3 hours before sleeping. If hungry at bedtime: 1 tsp gulkand or half banana only.'},
]
