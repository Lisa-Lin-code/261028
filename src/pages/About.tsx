import PageTitle from '../components/PageTitle'

// 임시 소개 정보: 실제 내용으로 교체하세요.
const profile = {
  name: '홍길동',
  affiliation: '○○대학교 스포츠마케팅학과',
  fields: ['스포츠 소비자 행동', '스포츠 스폰서십', 'e스포츠 마케팅'],
  email: 'professor@example.com',
  office: '○○관 000호',
  intro:
    '이 글은 임시 소개글입니다. 스포츠마케팅 분야의 연구와 교육을 하고 있으며, 대학원생들과 함께 연구 결과를 나누고 토론하는 것을 중요하게 생각합니다.\n\n연구 주제, 경력, 수상 내역 등을 이곳에 소개해 주세요.',
}

export default function About() {
  return (
    <>
      <PageTitle title="교수 소개" />
      <div className="grid gap-8 md:grid-cols-3">
        <dl className="space-y-4 rounded-lg border border-slate-200 p-5 text-sm md:col-span-1">
          <div><dt className="text-slate-500">이름</dt><dd className="text-lg font-semibold text-navy-800">{profile.name}</dd></div>
          <div><dt className="text-slate-500">소속</dt><dd>{profile.affiliation}</dd></div>
          <div>
            <dt className="text-slate-500">연구 분야</dt>
            <dd className="mt-1 flex flex-wrap gap-2">{profile.fields.map((f) => <span key={f} className="tag">{f}</span>)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">연락처</dt>
            <dd><a className="text-navy-600 underline" href={`mailto:${profile.email}`}>{profile.email}</a></dd>
            <dd>{profile.office}</dd>
          </div>
        </dl>
        <div className="space-y-3 leading-8 text-slate-700 md:col-span-2">
          {profile.intro.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </>
  )
}
