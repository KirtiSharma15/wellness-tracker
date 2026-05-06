const PREFIX = 'wellness_'
export function lsGet<T>(key: string): T | null {
  try { const r = localStorage.getItem(PREFIX + key); return r ? JSON.parse(r) as T : null } catch { return null }
}
export function lsSet<T>(key: string, value: T): void {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)) } catch(e) { console.warn('localStorage write failed', e) }
}
export const KEYS = { weightEntries: 'weight_entries', fitnessLogs: 'fitness_logs', habitLogs: 'habit_logs', habitDefs: 'habit_defs' } as const
