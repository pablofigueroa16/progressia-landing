const STORAGE_KEY = 'progressia.learn.beginner.completed'
export const LEARN_PROGRESS_EVENT = 'progressia.learn.updated'

export function getCompletedBeginnerLessonIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x) => typeof x === 'string')
  } catch {
    return []
  }
}

export function setCompletedBeginnerLessonIds(ids: string[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))))
}

export function markBeginnerLessonCompleted(id: string) {
  const ids = getCompletedBeginnerLessonIds()
  if (ids.includes(id)) return
  setCompletedBeginnerLessonIds([...ids, id])
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(LEARN_PROGRESS_EVENT))
  }
}


