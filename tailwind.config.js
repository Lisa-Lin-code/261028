/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 진한 남색 포인트 컬러 (학술 사이트 느낌)
        navy: {
          50: '#f1f4f9',
          100: '#dde4f0',
          200: '#b9c8e0',
          500: '#2f4a7d',
          600: '#1f3a6b',
          700: '#172c54',
          800: '#10213f',
          900: '#0a1629',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'Georgia', '"Apple Myungjo"', 'serif'],
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', '"Malgun Gothic"', '"Apple SD Gothic Neo"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
