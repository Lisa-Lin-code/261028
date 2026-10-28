import type { ReactNode } from 'react'

export default function PageTitle({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-10 border-b border-slate-300 pb-5">
      <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">{title}</h1>
      {children && <p className="mt-2 max-w-2xl text-slate-600">{children}</p>}
    </div>
  )
}
