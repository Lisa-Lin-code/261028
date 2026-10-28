import type { ResourceLink } from '../types'

// 관리자 폼에서 "라벨 | URL" 한 줄씩 입력받아 링크 목록으로 바꾼다.
// javascript: 같은 위험한 주소를 막기 위해 http(s)만 허용한다.
export function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export function parseLinks(text: string): { links: ResourceLink[]; error?: string } {
  const links: ResourceLink[] = []
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  for (const line of lines) {
    const [label, ...rest] = line.split('|')
    const url = rest.join('|').trim()
    if (!url || !label.trim()) {
      return { links, error: `"${line}" → "이름 | https://주소" 형식으로 입력해 주세요.` }
    }
    if (!isHttpUrl(url)) {
      return { links, error: `"${url}" 은(는) http:// 또는 https:// 로 시작하는 주소여야 합니다.` }
    }
    links.push({ label: label.trim(), url })
  }
  return { links }
}

export function linksToText(links: ResourceLink[]): string {
  return links.map((l) => `${l.label} | ${l.url}`).join('\n')
}

export function parseTags(text: string): string[] {
  return Array.from(new Set(text.split(',').map((t) => t.trim()).filter(Boolean)))
}
