// ★ 화면 컴포넌트는 반드시 이 파일에서만 서비스를 가져다 쓴다.
// Firebase 연동 시에는 아래 mock import 한 줄(과 export 부분)만
// './firebase' 구현으로 바꾸면 화면 코드는 수정할 필요가 없다.
import { createMockAuthService } from './mock/mockAuthService'
import { createMockCommentService } from './mock/mockCommentService'
import { createMockCourseService } from './mock/mockCourseService'
import { createMockResearchService } from './mock/mockResearchService'
import type { AuthService, CommentService, CourseService, ResearchService } from './types'

export const authService: AuthService = createMockAuthService()
export const researchService: ResearchService = createMockResearchService()
export const courseService: CourseService = createMockCourseService()
export const commentService: CommentService = createMockCommentService()

export type { AuthService, CommentService, CourseService, ResearchService } from './types'
