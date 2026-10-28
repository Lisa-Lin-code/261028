import type {
  AppUser,
  Comment,
  Course,
  CourseInput,
  Research,
  ResearchInput,
} from '../types'

// 무료 한도(Firestore 일 읽기 5만)를 아끼기 위해 목록 조회는 항상 limit을 둔다.
// limit을 생략하면 구현체가 DEFAULT_LIST_LIMIT을 적용한다.
export const DEFAULT_LIST_LIMIT = 50

export interface ListOptions {
  limit?: number
}

export interface AuthService {
  getCurrentUser(): AppUser | null
  /** 로그인 상태가 바뀔 때마다 호출된다. 반환값은 구독 해제 함수. */
  onAuthChange(callback: (user: AppUser | null) => void): () => void
  signInWithGoogle(): Promise<AppUser>
  signOut(): Promise<void>
  /** mock 전용: 관리자/일반 계정으로 바로 로그인해 보는 테스트 기능. Firebase 구현에는 없다. */
  signInAsMock?(role: 'admin' | 'student'): Promise<AppUser>
}

export interface ResearchService {
  /** 최신순. tag를 주면 해당 태그만. */
  list(options?: ListOptions & { tag?: string }): Promise<Research[]>
  get(id: string): Promise<Research | null>
  create(input: ResearchInput): Promise<Research>
  update(id: string, input: ResearchInput): Promise<Research>
  remove(id: string): Promise<void>
}

export interface CourseService {
  list(options?: ListOptions): Promise<Course[]>
  create(input: CourseInput): Promise<Course>
  update(id: string, input: CourseInput): Promise<Course>
  remove(id: string): Promise<void>
}

export interface CommentService {
  /** 오래된 순(대화 흐름). 한 연구당 댓글도 limit으로 제한한다. */
  listByResearch(researchId: string, options?: ListOptions): Promise<Comment[]>
  add(researchId: string, content: string, author: AppUser): Promise<Comment>
  /** 삭제 권한(본인/관리자)은 Firestore 규칙이 최종 판단한다. mock은 같은 규칙을 흉내 낸다. */
  remove(commentId: string, requester: AppUser): Promise<void>
}
