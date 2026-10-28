import type { ReactNode } from 'react'

export default function PageTitle({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-8 border-b border-slate-200 pb-4">
      <h1 className="text-2xl font-bold text-navy-800 md:text-3xl">{title}</h1>
      {children && <p className="mt-2 text-slate-600">{children}</p>}
    </div>
  )
}
