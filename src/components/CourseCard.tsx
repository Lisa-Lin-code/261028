import { formatDate } from '../lib/format'
import type { Course } from '../types'
import LinkList from './LinkList'

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="rounded border border-slate-200 border-t-2 border-t-navy-700 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">{course.semester}</p>
      <h3 className="mt-1 text-lg font-semibold text-navy-900">{course.title}</h3>
      {course.description && <p className="mt-1 text-sm text-slate-600">{course.description}</p>}
      <div className="mt-3 text-sm">
        <LinkList links={course.links} emptyText="등록된 자료 링크가 없습니다." />
      </div>
      <p className="mt-3 text-xs text-slate-400">등록일 {formatDate(course.createdAt)}</p>
    </article>
  )
}
