# Firestore 컬렉션 구조

Firebase 연동 단계에서 사용할 데이터 구조입니다. 화면의 타입(`src/types/index.ts`)과 1:1로 대응합니다.
날짜는 Firestore에서는 `Timestamp`로 저장하고, 서비스 구현 안에서 ISO 문자열로 바꿔 화면에 전달합니다.

## `research` (연구 글)
문서 ID: 자동 생성

| 필드 | 타입 | 설명 |
|---|---|---|
| title | string | 제목 |
| summary | string | 목록에 보이는 요약 |
| content | string | 본문 (줄바꿈, http 링크 지원) |
| tags | string[] | 태그. `array-contains`로 필터링 |
| links | {label, url}[] | 논문 PDF·데이터 등 외부 URL |
| createdAt | Timestamp | 작성일 (목록 정렬 기준) |
| updatedAt | Timestamp | 수정일 |

## `courses` (수업 자료)
| 필드 | 타입 | 설명 |
|---|---|---|
| title | string | 과목명 |
| semester | string | 예: `2026-2학기` |
| description | string | 설명 |
| links | {label, url}[] | 구글 드라이브 등 외부 URL |
| createdAt | Timestamp | 등록일 (정렬 기준) |

## `comments` (논의 댓글)
연구 글 하나에 여러 댓글이 달리므로 별도 최상위 컬렉션에 두고 `researchId`로 연결합니다.

| 필드 | 타입 | 설명 |
|---|---|---|
| researchId | string | 댓글이 달린 `research` 문서 ID |
| authorId | string | 작성자 Firebase uid (규칙에서 본인 확인에 사용) |
| authorName | string | 작성 당시 표시 이름 |
| content | string | 내용 (1~1000자) |
| createdAt | Timestamp | 작성 시각 |

수정은 허용하지 않습니다. 삭제는 작성자 본인 또는 관리자만 가능합니다.

## `admins` (관리자 명단)
문서 ID: **관리자의 이메일 주소** (예: `professor@university.ac.kr`). 필드는 없어도 되지만 보기 편하게 `note: "교수"` 정도를 넣어도 좋습니다.
클라이언트에서는 쓸 수 없으므로 **Firebase 콘솔에서 직접** 추가합니다.

## 필요한 색인(Index)
- `comments`: `researchId` (==) + `createdAt` (오름차순) 복합 색인 → 처음 조회할 때 콘솔에 뜨는 링크를 눌러 생성
- `research`: `tags` (array-contains) + `createdAt` (내림차순) 복합 색인 → 마찬가지로 에러 링크로 생성

## 무료(Spark) 한도를 지키는 방법
- 일 읽기 5만 / 쓰기 2만 한도를 고려해 **모든 목록 조회에 `limit()`을 둡니다.** (`src/services/types.ts`의 `DEFAULT_LIST_LIMIT`)
- 홈은 `limit(3)`, 목록은 `limit(50)`, 댓글은 `limit(100)`.
- Cloud Functions / Cloud Storage는 사용하지 않습니다. 파일은 외부 링크로만 연결합니다.
