export default function Footer() {
  return (
    <footer className="mt-16 border-t border-navy-900 bg-navy-900">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-navy-200">
        <p className="font-serif text-base font-semibold text-white">스포츠마케팅 연구실</p>
        <p>연구·수업 자료 공유 및 대학원생 논의 공간</p>
        <p className="mt-4 text-xs text-navy-200/70">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  )
}
