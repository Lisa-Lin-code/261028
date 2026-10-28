import { useState, type FormEvent } from 'react'
import { ErrorMessage, Loading } from '../StateMessage'
import LinkField from '../LinkField'
import { formatDate } from '../../lib/format'
import { linksToText, parseLinks, parseTags } from '../../lib/links'
import { useAsync } from '../../lib/useAsync'
import { researchService } from '../../services'
import type { Research } from '../../types'

interface FormState {
  title: string
  summary: string
  content: string
  tags: string
  links: string
}
const emptyForm: FormState = { title: '', summary: '', content: '', tags: '', links: '' }

export default function ResearchAdmin() {
  const { data, loading, error, reload } = useAsync(() => researchService.list({ limit: 50 }), [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const set = (key: keyof FormState) => (v: string) => setForm((f) => ({ ...f, [key]: v }))
  const reset = () => { setEditingId(null); setForm(emptyForm); setFormError(null) }

  const startEdit = (r: Research) => {
    setEditingId(r.id)
    setFormError(null)
    setForm({ title: r.title, summary: r.summary, content: r.content, tags: r.tags.join(', '), links: linksToText(r.links) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { links, error: linkError } = parseLinks(form.links)
    if (linkError) return setFormError(linkError)
    setSaving(true)
    setFormError(null)
    try {
      const input = { title: form.title.trim(), summary: form.summary.trim(), content: form.content, tags: parseTags(form.tags), links }
      if (editingId) await researchService.update(editingId, input)
      else await researchService.create(input)
      reset()
      reload()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '저장하지 못했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (r: Research) => {
    if (!window.confirm(`"${r.title}" 글을 삭제할까요?`)) return
    try {
      await researchService.remove(r.id)
      if (editingId === r.id) reset()
      reload()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '삭제하지 못했습니다.')
    }
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 p-5">
        <h2 className="text-lg font-bold text-navy-800">{editingId ? '연구 글 수정' : '새 연구 글 작성'}</h2>
        {formError && <ErrorMessage text={formError} />}
        <div>
          <label className="label" htmlFor="r-title">제목</label>
          <input id="r-title" className="input" required value={form.title} onChange={(e) => set('title')(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="r-summary">요약</label>
          <textarea id="r-summary" className="input min-h-[70px]" required value={form.summary} onChange={(e) => set('summary')(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="r-content">본문 (줄바꿈과 http 링크가 표시됩니다)</label>
          <textarea id="r-content" className="input min-h-[200px]" required value={form.content} onChange={(e) => set('content')(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="r-tags">태그 (쉼표로 구분)</label>
          <input id="r-tags" className="input" value={form.tags} onChange={(e) => set('tags')(e.target.value)} placeholder="스폰서십, 소비자 행동" />
        </div>
        <LinkField value={form.links} onChange={set('links')} />
        <div className="flex gap-2">
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? '저장 중…' : editingId ? '수정 저장' : '작성하기'}</button>
          {editingId && <button type="button" className="btn-outline" onClick={reset}>수정 취소</button>}
        </div>
      </form>

      <div>
        <h2 className="mb-3 text-lg font-bold text-navy-800">등록된 연구 글</h2>
        {loading && <Loading />}
        {error && <ErrorMessage text={error} />}
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200">
          {data?.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 p-4">
              <div className="min-w-0">
                <p className="font-medium text-navy-800">{r.title}</p>
                <p className="text-xs text-slate-500">{formatDate(r.createdAt)}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-outline !py-1" onClick={() => startEdit(r)}>수정</button>
                <button type="button" className="btn-danger !py-1" onClick={() => handleDelete(r)}>삭제</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
