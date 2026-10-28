import type { ResourceLink } from '../types'

export default function LinkList({ links, emptyText }: { links: ResourceLink[]; emptyText?: string }) {
  if (links.length === 0) {
    return emptyText ? <p className="text-sm text-slate-500">{emptyText}</p> : null
  }
  return (
    <ul className="space-y-1">
      {links.map((l) => (
        <li key={l.url}>
          <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-navy-600 underline hover:text-navy-800">
            {l.label} ↗
          </a>
        </li>
      ))}
    </ul>
  )
}
