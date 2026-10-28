import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'border-navy-700 text-navy-800' : 'border-transparent text-slate-600 hover:text-navy-700'
  }`

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const handleSignOut = async () => {
    await signOut()
    close()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
        <Link to="/" className="font-serif text-lg font-bold tracking-tight text-navy-800" onClick={close}>
          스포츠마케팅 연구실
        </Link>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 text-sm md:hidden"
          aria-expanded={open}
          aria-label="메뉴 열기"
          onClick={() => setOpen((o) => !o)}
        >
          메뉴
        </button>
        <nav className={`${open ? 'block' : 'hidden'} absolute left-0 top-full w-full border-b border-slate-200 bg-white px-4 py-2 md:static md:block md:w-auto md:border-0 md:p-0`}>
          <ul className="flex flex-col gap-1 md:flex-row md:items-center">
            <li><NavLink to="/" end className={linkClass} onClick={close}>홈</NavLink></li>
            <li><NavLink to="/research" className={linkClass} onClick={close}>연구</NavLink></li>
            <li><NavLink to="/courses" className={linkClass} onClick={close}>수업자료</NavLink></li>
            <li><NavLink to="/about" className={linkClass} onClick={close}>소개</NavLink></li>
            {user?.isAdmin && (
              <li><NavLink to="/admin" className={linkClass} onClick={close}>관리</NavLink></li>
            )}
            {user ? (
              <li className="flex items-center gap-2 px-3 py-2 md:py-0">
                <span className="text-sm text-slate-700">{user.name}</span>
                <button type="button" className="btn-outline !px-3 !py-1" onClick={handleSignOut}>
                  로그아웃
                </button>
              </li>
            ) : (
              <li><NavLink to="/login" className={linkClass} onClick={close}>로그인</NavLink></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
