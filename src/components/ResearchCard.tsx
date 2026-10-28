import { Link } from 'react-router-dom'
import { formatDate } from '../lib/format'
import type { Research } from '../types'

interface Props {
  research: Research
  // 목록 페이지에서만 태그 클릭 필터링을 켠다 (홈에서는 undefined)
  onTagClick?: (tag: string) => void
}

export default function ResearchCard({ research, onTagClick }: Props) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5 shadow-sm transition hover:border-navy-200 hover:shadow-md">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{formatDate(research.createdAt)}</p>
      <h3 className="mt-1 text-lg font-semibold text-navy-900">
        <Link to={`/research/${research.id}`} className="hover:underline">{research.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-slate-600">{research.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {research.tags.map((tag) =>
          onTagClick ? (
            <button key={tag} type="button" className="tag hover:bg-navy-100" onClick={() => onTagClick(tag)}>
              #{tag}
            </button>
          ) : (
            <span key={tag} className="tag">#{tag}</span>
          ),
        )}
      </div>
    </article>
  )
}
