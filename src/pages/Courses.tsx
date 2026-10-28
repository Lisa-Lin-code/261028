import CourseCard from '../components/CourseCard'
import PageTitle from '../components/PageTitle'
import { Empty, ErrorMessage, Loading } from '../components/StateMessage'
import { useAsync } from '../lib/useAsync'
import { courseService } from '../services'

export default function Courses() {
  const { data, loading, error } = useAsync(() => courseService.list({ limit: 50 }), [])
  return (
    <>
      <PageTitle title="수업 자료">학기별 수업 자료입니다. 자료는 외부 링크(구글 드라이브 등)로 연결됩니다.</PageTitle>
      {loading && <Loading />}
      {error && <ErrorMessage text={error} />}
      {data?.length === 0 && <Empty text="등록된 수업 자료가 아직 없습니다." />}
      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
    </>
  )
}
