import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import { ErrorMessage } from '../components/StateMessage'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services'

export default function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (user) return <Navigate to="/" replace />

  const run = async (action: () => Promise<unknown>) => {
    setBusy(true)
    setError(null)
    try {
      await action()
      navigate('/')
    } catch (e) {
      setError(e instanceof Error ? e.message : '로그인에 실패했습니다.')
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded border border-slate-200 bg-white p-8 shadow-sm">
      <PageTitle title="로그인">로그인하면 연구 글에 댓글을 남길 수 있습니다.</PageTitle>
      {error && <div className="mb-4"><ErrorMessage text={error} /></div>}
      <button type="button" className="btn-primary w-full !py-3" disabled={busy} onClick={() => run(signIn)}>
        Google로 로그인
      </button>

      {/* mock 전용 테스트 버튼: Firebase 서비스에는 signInAsMock이 없으므로 연동 후 자동으로 사라진다 */}
      {authService.signInAsMock && (
        <div className="mt-8 rounded border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-medium">테스트용 안내 (임시 모드)</p>
          <p className="mt-1">지금은 실제 Google 로그인이 아니라 가짜 로그인입니다. 위 버튼은 대학원생 계정으로 들어갑니다.</p>
          <button
            type="button"
            className="btn-outline mt-3"
            disabled={busy}
            onClick={() => run(() => authService.signInAsMock!('admin'))}
          >
            교수(관리자) 계정으로 로그인
          </button>
        </div>
      )}
    </div>
  )
}
