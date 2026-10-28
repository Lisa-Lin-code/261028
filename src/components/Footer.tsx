export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-slate-500">
        <p className="font-medium text-slate-700">스포츠마케팅 연구실</p>
        <p>연구·수업 자료 공유 및 대학원생 논의 공간</p>
        <p className="mt-2">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  )
}
