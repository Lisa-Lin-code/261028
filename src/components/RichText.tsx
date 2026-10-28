import { Fragment } from 'react'

// 마크다운 라이브러리 없이 "줄바꿈 + 자동 링크"만 지원한다.
// dangerouslySetInnerHTML을 쓰지 않고 React 요소로만 만들어 스크립트 삽입(XSS)을 막는다.
const URL_PATTERN = /(https?:\/\/[^\s]+)/g

export default function RichText({ text }: { text: string }) {
  return (
    <div className="space-y-1 leading-8 text-slate-700">
      {text.split('\n').map((line, i) => (
        <p key={i} className={line.trim() ? '' : 'h-3'}>
          {line.split(URL_PATTERN).map((part, j) =>
            /^https?:\/\//.test(part) ? (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-navy-600 underline">
                {part}
              </a>
            ) : (
              <Fragment key={j}>{part}</Fragment>
            ),
          )}
        </p>
      ))}
    </div>
  )
}
