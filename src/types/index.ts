// 화면과 서비스가 함께 쓰는 데이터 모양. 날짜는 ISO 문자열로 통일해
// Firestore Timestamp 변환은 Firebase 서비스 구현 안에서만 처리한다.

export interface ResourceLink {
  label: string
  url: string
}

export interface Research {
  id: string
  title: string
  summary: string
  content: string
  tags: string[]
  links: ResourceLink[] // 논문 PDF, 데이터 등 외부 URL (파일 업로드는 하지 않음)
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: string
  title: string // 과목명
  semester: string // 예: 2026-1학기
  description: string
  links: ResourceLink[] // 구글 드라이브 등 외부 URL
  createdAt: string
}

export interface Comment {
  id: string
  researchId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
}

export interface AppUser {
  uid: string
  name: string
  email: string
  isAdmin: boolean // 화면 표시용. 실제 권한은 Firestore 규칙이 최종 판단한다.
}

// 작성/수정 폼에서 쓰는 입력 타입 (id와 날짜는 서비스가 채운다)
export type ResearchInput = Pick<Research, 'title' | 'summary' | 'content' | 'tags' | 'links'>
export type CourseInput = Pick<Course, 'title' | 'semester' | 'description' | 'links'>
