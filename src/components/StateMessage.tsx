// 로딩/오류/빈 목록 안내 문구를 한 곳에서 통일해서 보여준다.
export function Loading({ text = '불러오는 중입니다…' }: { text?: string }) {
  return <p className="py-8 text-center text-slate-500" role="status">{text}</p>
}

export function ErrorMessage({ text }: { text: string }) {
  return <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{text}</p>
}

export function Empty({ text }: { text: string }) {
  return <p className="rounded-md bg-slate-50 py-8 text-center text-slate-500">{text}</p>
}
