export interface WeightEntry { id: number; date: string; weight: number }
export type BetterDirection = 'higher' | 'lower' | 'ratio'
export interface FitnessMetric { id: string; label: string; emoji: string; unit: string; better: BetterDirection; how: string; good: string }
export interface FitnessEntry { date: string; value: number }
export type FitnessLogs = Record<string, FitnessEntry[]>
export type HabitGoalType = 'more' | 'less' | 'bool'
export interface Habit { id: string; label: string; emoji: string; unit: string; type: HabitGoalType; target: number; color: string }
export type HabitLogs = Record<string, Record<string, number>>
export interface BackupBundle { entries: WeightEntry[]; fitnessLogs: FitnessLogs; habitLogs: HabitLogs; habits: Habit[] }
