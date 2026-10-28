import type { Research } from '../../types'
import { DEFAULT_LIST_LIMIT, type ResearchService } from '../types'
import { delay, newId } from './helpers'
import { sampleResearch } from './sampleData'

export function createMockResearchService(): ResearchService {
  // 메모리 저장: 새로고침하면 샘플 데이터로 되돌아간다
  let items: Research[] = [...sampleResearch]

  return {
    async list(options) {
      const limit = options?.limit ?? DEFAULT_LIST_LIMIT
      const tag = options?.tag
      const result = items
        .filter((r) => !tag || r.tags.includes(tag))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, limit)
      return delay(result)
    },
    async get(id) {
      return delay(items.find((r) => r.id === id) ?? null)
    },
    async create(input) {
      const now = new Date().toISOString()
      const created: Research = { ...input, id: newId('r'), createdAt: now, updatedAt: now }
      items = [created, ...items]
      return delay(created)
    },
    async update(id, input) {
      const found = items.find((r) => r.id === id)
      if (!found) throw new Error('수정할 연구 글을 찾을 수 없습니다.')
      const updated: Research = { ...found, ...input, updatedAt: new Date().toISOString() }
      items = items.map((r) => (r.id === id ? updated : r))
      return delay(updated)
    },
    async remove(id) {
      items = items.filter((r) => r.id !== id)
      await delay(null)
    },
  }
}
