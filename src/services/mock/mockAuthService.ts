import type { AppUser } from '../../types'
import type { AuthService } from '../types'
import { delay } from './helpers'

// 새로고침 후에도 로그인이 유지되도록 localStorage에 임시 저장한다. (Firebase 연동 후에는 불필요)
const STORAGE_KEY = 'mock-auth-user'

const MOCK_USERS: Record<'admin' | 'student', AppUser> = {
  admin: { uid: 'mock-admin', name: '홍길동 교수', email: 'professor@example.com', isAdmin: true },
  student: { uid: 'mock-student', name: '김대학원 (대학원생)', email: 'student@example.com', isAdmin: false },
}

function load(): AppUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AppUser) : null
  } catch {
    return null // 저장소를 못 쓰는 환경(사생활 보호 모드 등)에서도 앱은 동작해야 한다
  }
}

function save(user: AppUser | null): void {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* 무시 */
  }
}

export function createMockAuthService(): AuthService {
  let current: AppUser | null = load()
  const listeners = new Set<(user: AppUser | null) => void>()

  const set = (user: AppUser | null) => {
    current = user
    save(user)
    listeners.forEach((cb) => cb(user))
  }

  return {
    getCurrentUser: () => current,
    onAuthChange(callback) {
      listeners.add(callback)
      callback(current)
      return () => listeners.delete(callback)
    },
    async signInWithGoogle() {
      // mock에서는 일반(대학원생) 계정으로 로그인한 것으로 처리한다
      const user = await delay(MOCK_USERS.student)
      set(user)
      return user
    },
    async signInAsMock(role) {
      const user = await delay(MOCK_USERS[role])
      set(user)
      return user
    },
    async signOut() {
      await delay(null, 100)
      set(null)
    },
  }
}
