import { useState, type FormEvent } from 'react'
import { ErrorMessage, Loading } from '../StateMessage'
import LinkField from '../LinkField'
import { formatDate } from '../../lib/format'
import { linksToText, parseLinks } from '../../lib/links'
import { useAsync } from '../../lib/useAsync'
import { courseService } from '../../services'
import type { Course } from '../../types'

interface FormState {
  title: string
  semester: string
  description: string
  links: string
}
const emptyForm: FormState = { title: '', semester: '', description: '', links: '' }

export default function CourseAdmin() {
  const { data, loading, error, reload } = useAsync(() => courseService.list({ limit: 50 }), [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const set = (key: keyof FormState) => (v: string) => setForm((f) => ({ ...f, [key]: v }))
  const reset = () => { setEditingId(null); setForm(emptyForm); setFormError(null) }

  const startEdit = (c: Course) => {
    setEditingId(c.id)
    setFormError(null)
    setForm({ title: c.title, semester: c.semester, description: c.description, links: linksToText(c.links) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { links, error: linkError } = parseLinks(form.links)
    if (linkError) return setFormError(linkError)
    setSaving(true)
    setFormError(null)
    try {
      const input = { title: form.title.trim(), semester: form.semester.trim(), description: form.description.trim(), links }
      if (editingId) await courseService.update(editingId, input)
      else await courseService.create(input)
      reset()
      reload()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '저장하지 못했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (c: Course) => {
    if (!window.confirm(`"${c.title}" 자료를 삭제할까요?`)) return
    try {
      await courseService.remove(c.id)
      if (editingId === c.id) reset()
      reload()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '삭제하지 못했습니다.')
    }
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="space-y-4 rounded border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-navy-900">{editingId ? '수업 자료 수정' : '새 수업 자료 작성'}</h2>
        {formError && <ErrorMessage text={formError} />}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="c-title">과목명</label>
            <input id="c-title" className="input" required value={form.title} onChange={(e) => set('title')(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="c-semester">학기</label>
            <input id="c-semester" className="input" required placeholder="2026-2학기" value={form.semester} onChange={(e) => set('semester')(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="c-desc">설명</label>
          <textarea id="c-desc" className="input min-h-[70px]" value={form.description} onChange={(e) => set('description')(e.target.value)} />
        </div>
        <LinkField value={form.links} onChange={set('links')} />
        <div className="flex gap-2">
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? '저장 중…' : editingId ? '수정 저장' : '작성하기'}</button>
          {editingId && <button type="button" className="btn-outline" onClick={reset}>수정 취소</button>}
        </div>
      </form>

      <div>
        <h2 className="mb-3 text-lg font-bold text-navy-900">등록된 수업 자료</h2>
        {loading && <Loading />}
        {error && <ErrorMessage text={error} />}
        <ul className="divide-y divide-slate-200 rounded border border-slate-200 bg-white">
          {data?.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 p-4">
              <div className="min-w-0">
                <p className="font-medium text-navy-900">{c.title} <span className="text-sm font-normal text-slate-500">· {c.semester}</span></p>
                <p className="text-xs text-slate-500">{formatDate(c.createdAt)}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-outline !py-1" onClick={() => startEdit(c)}>수정</button>
                <button type="button" className="btn-danger !py-1" onClick={() => handleDelete(c)}>삭제</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
