import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatDateTime } from '../lib/format'
import { useAsync } from '../lib/useAsync'
import { commentService } from '../services'
import { Empty, ErrorMessage, Loading } from './StateMessage'

export default function CommentSection({ researchId }: { researchId: string }) {
  const { user } = useAuth()
  // 댓글 조회도 limit을 둔다 (무료 읽기 한도 보호)
  const { data: comments, loading, error, reload } = useAsync(
    () => commentService.listByResearch(researchId, { limit: 100 }),
    [researchId],
  )
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || !content.trim()) return
    setSubmitting(true)
    setActionError(null)
    try {
      await commentService.add(researchId, content, user)
      setContent('')
      reload()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : '댓글을 등록하지 못했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (commentId: string) => {
    if (!user || !window.confirm('이 댓글을 삭제할까요?')) return
    setActionError(null)
    try {
      await commentService.remove(commentId, user)
      reload()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : '댓글을 삭제하지 못했습니다.')
    }
  }

  return (
    <section className="mt-12 border-t border-slate-200 pt-8" aria-labelledby="discussion-title">
      <h2 id="discussion-title" className="text-xl font-bold text-navy-900">논의 (댓글)</h2>

      {loading && <Loading text="댓글을 불러오는 중입니다…" />}
      {error && <ErrorMessage text={error} />}
      {!loading && !error && comments?.length === 0 && (
        <div className="mt-4"><Empty text="아직 댓글이 없습니다. 첫 의견을 남겨 보세요." /></div>
      )}

      <ul className="mt-4 space-y-4">
        {comments?.map((c) => (
          <li key={c.id} className="rounded border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm">
                <span className="font-semibold text-navy-900">{c.authorName}</span>
                <span className="ml-2 text-xs text-slate-500">{formatDateTime(c.createdAt)}</span>
              </p>
              {user && (user.uid === c.authorId) && (
                <button type="button" className="text-xs text-red-600 hover:underline" onClick={() => handleDelete(c.id)}>
                  삭제
                </button>
              )}
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{c.content}</p>
          </li>
        ))}
      </ul>

      {actionError && <div className="mt-4"><ErrorMessage text={actionError} /></div>}

      {user ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label htmlFor="comment" className="label">{user.name} 님의 의견</label>
          <textarea
            id="comment"
            className="input min-h-[100px]"
            value={content}
            maxLength={1000}
            onChange={(e) => setContent(e.target.value)}
            placeholder="연구에 대한 질문이나 의견을 남겨 주세요."
          />
          <button type="submit" className="btn-primary" disabled={submitting || !content.trim()}>
            {submitting ? '등록 중…' : '댓글 등록'}
          </button>
        </form>
      ) : (
        <p className="mt-6 rounded border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-navy-900">
          댓글을 작성하려면 <Link to="/login" className="font-semibold underline">로그인</Link>이 필요합니다.
        </p>
      )}
    </section>
  )
}
