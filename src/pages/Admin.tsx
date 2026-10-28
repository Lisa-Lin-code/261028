import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import CourseAdmin from '../components/admin/CourseAdmin'
import ResearchAdmin from '../components/admin/ResearchAdmin'
import PageTitle from '../components/PageTitle'
import { Loading } from '../components/StateMessage'
import { useAuth } from '../context/AuthContext'

export default function Admin() {
  const { user, loading } = useAuth()
  const [tab, setTab] = useState<'research' | 'courses'>('research')

  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace />

  // 주의: 이 검사는 화면을 숨기는 용도일 뿐이다.
  // 실제 쓰기 권한은 Firestore 보안 규칙(firestore.rules의 admins 컬렉션 확인)이 최종 판단한다.
  if (!user.isAdmin) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg font-semibold text-navy-800">관리자만 접근할 수 있는 페이지입니다.</p>
        <p className="mt-2 text-slate-600">관리자 계정으로 로그인해 주세요.</p>
      </div>
    )
  }

  const tabClass = (active: boolean) =>
    `rounded px-4 py-2 text-sm font-medium ${active ? 'bg-navy-700 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'}`

  return (
    <>
      <PageTitle title="관리자">연구 글과 수업 자료를 작성·수정·삭제합니다.</PageTitle>
      <div className="mb-6 flex gap-2">
        <button type="button" className={tabClass(tab === 'research')} onClick={() => setTab('research')}>연구 글</button>
        <button type="button" className={tabClass(tab === 'courses')} onClick={() => setTab('courses')}>수업 자료</button>
      </div>
      {tab === 'research' ? <ResearchAdmin /> : <CourseAdmin />}
    </>
  )
}
