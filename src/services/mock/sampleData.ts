import type { Comment, Course, Research } from '../../types'
import { daysAgo } from './helpers'

// 스포츠마케팅 주제의 임시 샘플 데이터 (실제 연구 내용이 아님)
export const sampleResearch: Research[] = [
  {
    id: 'r1',
    title: '프로스포츠 팬 몰입도가 굿즈 구매의도에 미치는 영향',
    summary: '프로야구 팬 400명을 대상으로 팬 몰입도와 공식 굿즈 구매의도의 관계를 분석했습니다.',
    content:
      '본 연구는 프로야구 팬의 몰입도(팀 동일시, 경기 관람 빈도)가 공식 굿즈 구매의도에 미치는 영향을 살펴봅니다.\n\n주요 결과\n- 팀 동일시가 높을수록 구매의도가 유의하게 높았다.\n- 온라인 커뮤니티 활동이 두 변수 사이를 부분 매개했다.\n\n설문 문항과 분석 코드는 아래 첨부 링크에서 확인할 수 있습니다. 자세한 배경은 https://example.com/background 를 참고하세요.',
    tags: ['팬 몰입도', '소비자 행동', '프로야구'],
    links: [
      { label: '논문 PDF (임시)', url: 'https://example.com/paper1.pdf' },
      { label: '설문 데이터 (임시)', url: 'https://example.com/data1.csv' },
    ],
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
  },
  {
    id: 'r2',
    title: '스포츠 스폰서십의 브랜드 이미지 전이 효과',
    summary: '메가 스포츠 이벤트 스폰서십이 기업 브랜드 이미지에 전이되는 과정을 정리한 문헌 고찰입니다.',
    content:
      '이미지 전이 이론을 바탕으로 최근 10년간의 스폰서십 연구를 정리했습니다.\n\n논의하고 싶은 질문\n1. 스폰서와 이벤트의 적합성(fit)을 어떻게 측정할 것인가?\n2. 국내 리그 맥락에서 해외 연구 결과를 그대로 적용해도 되는가?',
    tags: ['스폰서십', '브랜드', '문헌고찰'],
    links: [{ label: '문헌 목록 (임시)', url: 'https://example.com/review-list' }],
    createdAt: daysAgo(12),
    updatedAt: daysAgo(10),
  },
  {
    id: 'r3',
    title: 'MZ세대의 e스포츠 관람 동기와 지속 시청 의도',
    summary: 'e스포츠 시청자의 관람 동기 요인을 탐색하고 지속 시청 의도와의 관계를 검증했습니다.',
    content:
      '온라인 설문(n=320)을 통해 관람 동기를 5개 요인으로 구분했습니다.\n\n- 경기 기술 학습\n- 선수·팀 동일시\n- 사회적 교류\n- 오락·몰입\n- 대리 성취\n\n후속 연구로 연령대별 비교 분석을 계획 중입니다.',
    tags: ['e스포츠', '관람 동기', '소비자 행동'],
    links: [],
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20),
  },
]

export const sampleCourses: Course[] = [
  {
    id: 'c1',
    title: '스포츠마케팅론',
    semester: '2026-2학기',
    description: '스포츠 상품과 서비스의 마케팅 전략 기초',
    links: [
      { label: '강의계획서 (임시)', url: 'https://drive.google.com/example-syllabus' },
      { label: '1~4주차 자료 (임시)', url: 'https://drive.google.com/example-week1-4' },
    ],
    createdAt: daysAgo(3),
  },
  {
    id: 'c2',
    title: '스포츠 소비자 행동 연구',
    semester: '2026-2학기',
    description: '대학원 세미나: 소비자 행동 이론과 연구 설계',
    links: [{ label: '읽기 자료 (임시)', url: 'https://drive.google.com/example-reading' }],
    createdAt: daysAgo(8),
  },
  {
    id: 'c3',
    title: '스포츠 스폰서십 사례 분석',
    semester: '2026-1학기',
    description: '국내외 스폰서십 사례 발표 수업',
    links: [{ label: '사례 발표 양식 (임시)', url: 'https://drive.google.com/example-case' }],
    createdAt: daysAgo(150),
  },
]

export const sampleComments: Comment[] = [
  {
    id: 'm1',
    researchId: 'r1',
    authorId: 'mock-student',
    authorName: '김대학원 (대학원생)',
    content: '매개효과 검증에 부트스트래핑을 쓰셨는지 궁금합니다.',
    createdAt: daysAgo(4),
  },
  {
    id: 'm2',
    researchId: 'r1',
    authorId: 'mock-admin',
    authorName: '홍길동 교수',
    content: '네, 5,000회 부트스트래핑을 사용했습니다. 코드는 첨부 자료에 포함할 예정입니다.',
    createdAt: daysAgo(3),
  },
  {
    id: 'm3',
    researchId: 'r2',
    authorId: 'mock-student',
    authorName: '김대학원 (대학원생)',
    content: '적합성 측정 척도 후보를 정리해서 다음 세미나에 공유하겠습니다.',
    createdAt: daysAgo(9),
  },
]
