import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authService } from '../services'
import type { AppUser } from '../types'

interface AuthContextValue {
  user: AppUser | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(authService.getCurrentUser())
  // Firebase는 첫 로그인 상태 확인이 비동기이므로 loading을 둔다 (mock은 즉시 끝남)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return authService.onAuthChange((next) => {
      setUser(next)
      setLoading(false)
    })
  }, [])

  const value: AuthContextValue = {
    user,
    loading,
    signIn: async () => {
      await authService.signInWithGoogle()
    },
    signOut: () => authService.signOut(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.')
  return ctx
}
