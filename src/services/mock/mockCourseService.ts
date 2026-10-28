import type { Course } from '../../types'
import { DEFAULT_LIST_LIMIT, type CourseService } from '../types'
import { delay, newId } from './helpers'
import { sampleCourses } from './sampleData'

export function createMockCourseService(): CourseService {
  let items: Course[] = [...sampleCourses]

  return {
    async list(options) {
      const limit = options?.limit ?? DEFAULT_LIST_LIMIT
      const result = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit)
      return delay(result)
    },
    async create(input) {
      const created: Course = { ...input, id: newId('c'), createdAt: new Date().toISOString() }
      items = [created, ...items]
      return delay(created)
    },
    async update(id, input) {
      const found = items.find((c) => c.id === id)
      if (!found) throw new Error('수정할 수업 자료를 찾을 수 없습니다.')
      const updated: Course = { ...found, ...input }
      items = items.map((c) => (c.id === id ? updated : c))
      return delay(updated)
    },
    async remove(id) {
      items = items.filter((c) => c.id !== id)
      await delay(null)
    },
  }
}
