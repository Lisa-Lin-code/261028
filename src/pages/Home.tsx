import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import ResearchCard from '../components/ResearchCard'
import { Empty, ErrorMessage, Loading } from '../components/StateMessage'
import { useAsync } from '../lib/useAsync'
import { courseService, researchService } from '../services'

export default function Home() {
  // 홈은 가장 많이 열리는 페이지이므로 limit 3으로 읽기 횟수를 최소화한다
  const research = useAsync(() => researchService.list({ limit: 3 }), [])
  const courses = useAsync(() => courseService.list({ limit: 3 }), [])

  return (
    <div className="space-y-14">
      <section className="rounded-xl bg-navy-800 px-6 py-12 text-white md:px-10">
        <p className="text-sm text-navy-200">Sports Marketing Research Lab</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">스포츠마케팅 연구실</h1>
        <p className="mt-4 max-w-2xl text-navy-100">
          스포츠마케팅 연구 결과와 수업 자료를 한곳에 모아 두고, 대학원생과 함께 논의하는 공간입니다.
          연구 글에 댓글로 의견을 남기려면 로그인해 주세요.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/research" className="btn bg-white text-navy-800 hover:bg-navy-50">연구 보기</Link>
          <Link to="/about" className="btn border border-white/40 text-white hover:bg-white/10">교수 소개</Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-navy-800">최신 연구</h2>
          <Link to="/research" className="text-sm text-navy-600 hover:underline">전체 보기 →</Link>
        </div>
        {research.loading && <Loading />}
        {research.error && <ErrorMessage text={research.error} />}
        {research.data?.length === 0 && <Empty text="등록된 연구가 아직 없습니다." />}
        <div className="grid gap-4 md:grid-cols-3">
          {research.data?.map((r) => <ResearchCard key={r.id} research={r} />)}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-navy-800">최신 수업 자료</h2>
          <Link to="/courses" className="text-sm text-navy-600 hover:underline">전체 보기 →</Link>
        </div>
        {courses.loading && <Loading />}
        {courses.error && <ErrorMessage text={courses.error} />}
        {courses.data?.length === 0 && <Empty text="등록된 수업 자료가 아직 없습니다." />}
        <div className="grid gap-4 md:grid-cols-3">
          {courses.data?.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>
    </div>
  )
}
