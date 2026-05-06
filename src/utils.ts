import type { BackupBundle } from './types'
export const todayStr = (): string => new Date().toISOString().split('T')[0]
export const fmt = (d: string): string => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
export const fmtShort = (d: string): string => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
export const last7Days = (): string[] => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return d.toISOString().split('T')[0] })
export const encodeBackup = (data: BackupBundle): string => { try { return btoa(JSON.stringify(data)) } catch { return '' } }
export const decodeBackup = (s: string): BackupBundle | null => { try { return JSON.parse(atob(s.trim())) as BackupBundle } catch { return null } }
export const whrBadge = (waist?: number, hips?: number) => {
  if (!waist || !hips) return null
  const r = (waist / hips).toFixed(2); const num = parseFloat(r)
  const color = num <= 0.85 ? '#2d9d6e' : num <= 0.90 ? '#e9a825' : '#c0392b'
  return { r, color, label: num <= 0.85 ? 'Ideal ✓' : num <= 0.90 ? 'Acceptable' : 'High Risk' }
}
export const getStreak = (logs: Record<string, number>, type: string, target: number): number => {
  let streak = 0; const d = new Date()
  while (true) {
    const key = d.toISOString().split('T')[0]; const v = logs[key]
    if (v === undefined) break
    const ok = type === 'bool' ? v >= 1 : type === 'more' ? v >= target : v <= target
    if (!ok) break; streak++; d.setDate(d.getDate() - 1)
  }
  return streak
}
