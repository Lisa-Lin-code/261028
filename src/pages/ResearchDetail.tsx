import { Link, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import LinkList from '../components/LinkList'
import RichText from '../components/RichText'
import { ErrorMessage, Loading } from '../components/StateMessage'
import { formatDate } from '../lib/format'
import { useAsync } from '../lib/useAsync'
import { researchService } from '../services'

export default function ResearchDetail() {
  const { id = '' } = useParams()
  const { data: research, loading, error } = useAsync(() => researchService.get(id), [id])

  if (loading) return <Loading />
  if (error) return <ErrorMessage text={error} />
  if (!research) {
    return (
      <div className="py-10 text-center">
        <p className="text-slate-600">요청하신 연구 글을 찾을 수 없습니다.</p>
        <Link to="/research" className="mt-4 inline-block text-navy-600 underline">연구 목록으로</Link>
      </div>
    )
  }

  return (
    <article>
      <Link to="/research" className="text-sm text-navy-600 hover:underline">← 연구 목록</Link>
      <h1 className="mt-3 text-2xl font-bold text-navy-800 md:text-3xl">{research.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{formatDate(research.createdAt)}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {research.tags.map((t) => (
          <Link key={t} to={`/research?tag=${encodeURIComponent(t)}`} className="tag hover:bg-navy-100">#{t}</Link>
        ))}
      </div>

      <div className="mt-8"><RichText text={research.content} /></div>

      <section className="mt-10 rounded-lg border border-slate-200 p-5">
        <h2 className="mb-3 text-lg font-bold text-navy-800">첨부 링크</h2>
        <LinkList links={research.links} emptyText="첨부된 링크가 없습니다." />
      </section>

      <CommentSection researchId={research.id} />
    </article>
  )
}
