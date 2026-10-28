import type { Comment } from '../../types'
import { DEFAULT_LIST_LIMIT, type CommentService } from '../types'
import { delay, newId } from './helpers'
import { sampleComments } from './sampleData'

export function createMockCommentService(): CommentService {
  let items: Comment[] = [...sampleComments]

  return {
    async listByResearch(researchId, options) {
      const limit = options?.limit ?? DEFAULT_LIST_LIMIT
      const result = items
        .filter((c) => c.researchId === researchId)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        .slice(0, limit)
      return delay(result)
    },
    async add(researchId, content, author) {
      const trimmed = content.trim()
      if (!trimmed) throw new Error('댓글 내용을 입력해 주세요.')
      const created: Comment = {
        id: newId('m'),
        researchId,
        authorId: author.uid,
        authorName: author.name,
        content: trimmed,
        createdAt: new Date().toISOString(),
      }
      items = [...items, created]
      return delay(created)
    },
    async remove(commentId, requester) {
      const found = items.find((c) => c.id === commentId)
      if (!found) return
      // Firestore 규칙(작성자 본인 또는 관리자만 삭제)과 같은 정책을 흉내 낸다
      if (found.authorId !== requester.uid && !requester.isAdmin) {
        throw new Error('삭제 권한이 없습니다.')
      }
      items = items.filter((c) => c.id !== commentId)
      await delay(null)
    },
  }
}
