// 링크 입력란 안내 문구를 통일하기 위한 작은 폼 조각
export default function LinkField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label" htmlFor="links">링크 (한 줄에 하나, "이름 | 주소" 형식)</label>
      <textarea
        id="links"
        className="input min-h-[80px] font-mono"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'논문 PDF | https://drive.google.com/...\n데이터 | https://...'}
      />
    </div>
  )
}
