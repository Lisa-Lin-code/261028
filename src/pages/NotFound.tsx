import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-xl font-semibold text-navy-800">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="mt-4 inline-block text-navy-600 underline">홈으로 돌아가기</Link>
    </div>
  )
}
