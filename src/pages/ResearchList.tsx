import { useSearchParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import ResearchCard from '../components/ResearchCard'
import { Empty, ErrorMessage, Loading } from '../components/StateMessage'
import { useAsync } from '../lib/useAsync'
import { researchService } from '../services'

export default function ResearchList() {
  // 선택한 태그를 주소(?tag=)에 담아 두면 새로고침/공유해도 필터가 유지된다
  const [params, setParams] = useSearchParams()
  const tag = params.get('tag') ?? undefined
  const { data, loading, error } = useAsync(() => researchService.list({ tag, limit: 50 }), [tag])

  return (
    <>
      <PageTitle title="연구">연구 결과와 진행 중인 연구를 모았습니다. 태그를 누르면 같은 주제만 볼 수 있습니다.</PageTitle>

      {tag && (
        <p className="mb-6 flex items-center gap-3 text-sm">
          <span className="tag">#{tag}</span> 태그로 보는 중
          <button type="button" className="text-navy-600 underline" onClick={() => setParams({})}>필터 해제</button>
        </p>
      )}

      {loading && <Loading />}
      {error && <ErrorMessage text={error} />}
      {data?.length === 0 && <Empty text={tag ? '이 태그의 연구가 아직 없습니다.' : '등록된 연구가 아직 없습니다.'} />}
      <div className="grid gap-4">
        {data?.map((r) => (
          <ResearchCard key={r.id} research={r} onTagClick={(t) => setParams({ tag: t })} />
        ))}
      </div>
    </>
  )
}
