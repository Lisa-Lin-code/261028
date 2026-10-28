# 스포츠마케팅 연구실 웹사이트

스포츠마케팅 연구·수업 자료를 모아 두고, 대학원생과 연구 결과를 논의하는 웹사이트입니다.

> **현재 단계(MVP)**: Firebase 없이 "임시(mock) 데이터"로 동작합니다. 글을 작성하거나 댓글을 달아도 **새로고침하면 샘플 상태로 돌아갑니다.** 이것은 정상입니다. Firebase를 연결하면 실제로 저장됩니다.

- 기술: Vite + React 18 + TypeScript + Tailwind CSS + React Router
- 배포: Netlify (정적 호스팅) / 데이터(추후): Firebase 무료 Spark 요금제

---

## (a) 내 컴퓨터에서 실행하기

1. [Node.js](https://nodejs.org) **LTS 버전**을 설치합니다. (이미 설치했다면 건너뛰세요)
2. 터미널을 열고 이 폴더로 이동합니다.
   ```bash
   cd 261028
   ```
3. 필요한 프로그램을 설치합니다. (처음 한 번만, 몇 분 걸릴 수 있습니다)
   ```bash
   npm install
   ```
4. 개발 서버를 켭니다.
   ```bash
   npm run dev
   ```
5. 터미널에 나온 주소(보통 `http://localhost:5173`)를 브라우저에서 엽니다. 끄려면 터미널에서 `Ctrl + C`.

### 임시 로그인으로 기능 확인하기
- `/login`에서 **Google로 로그인** → 대학원생 계정(댓글 작성·본인 댓글 삭제 가능)
- **교수(관리자) 계정으로 로그인** → 상단 메뉴에 "관리"가 나타나고 `/admin`에서 글 작성·수정·삭제 가능

배포 결과물이 정상적으로 만들어지는지 확인하려면:
```bash
npm run build
```

---

## (b) GitHub에 올리기

1. [github.com](https://github.com)에서 로그인 → 오른쪽 위 **+ → New repository**로 빈 저장소를 만듭니다. (README 추가 옵션은 끄세요)
2. 터미널에서 아래를 **한 줄씩** 입력합니다. (`내아이디/저장소이름`은 본인 것으로 바꾸세요)
   ```bash
   git init
   ```
   ```bash
   git add .
   ```
   ```bash
   git commit -m "첫 커밋"
   ```
   ```bash
   git branch -M main
   ```
   ```bash
   git remote add origin https://github.com/내아이디/저장소이름.git
   ```
   ```bash
   git push -u origin main
   ```
3. `.env`, `.env.local`, `node_modules`, `dist`는 `.gitignore`에 들어 있어 올라가지 않습니다. (비밀 값 보호)

---

## (c) Netlify에서 배포하기

1. [netlify.com](https://www.netlify.com)에 GitHub 계정으로 가입/로그인합니다.
2. **Add new site → Import an existing project → GitHub**를 선택하고, 위에서 만든 저장소를 고릅니다.
3. 빌드 설정은 `netlify.toml`에 이미 들어 있어 자동으로 채워집니다. (빌드 명령 `npm run build`, 게시 폴더 `dist`)
4. **Deploy**를 누르면 몇 분 뒤 `https://무작위이름.netlify.app` 주소로 사이트가 열립니다.
5. 이후에는 GitHub에 `git push`만 하면 자동으로 다시 배포됩니다.

---

## (d) 배포 후 Firebase 연동 체크리스트

> 무료 **Spark 요금제만** 사용합니다. 요금제 업그레이드(Blaze)를 권하는 화면이 나와도 누르지 마세요. Cloud Functions와 Cloud Storage는 쓰지 않습니다.

- [ ] 1. [Firebase 콘솔](https://console.firebase.google.com)에서 **프로젝트 만들기** (Spark 요금제 유지, Google Analytics는 꺼도 됩니다)
- [ ] 2. 프로젝트 설정 → **웹 앱(`</>`) 등록**. 화면에 나오는 `firebaseConfig` 값 6개를 메모해 둡니다.
- [ ] 3. **Authentication → 로그인 방법 → Google 사용 설정**
- [ ] 4. Authentication → 설정 → **승인된 도메인**에 Netlify 주소(`무작위이름.netlify.app`)를 추가 (`localhost`는 기본 포함)
- [ ] 5. **Firestore Database 만들기** (프로덕션 모드, 가까운 지역 선택)
- [ ] 6. Firestore → **규칙** 탭에 이 저장소의 `firestore.rules` 내용을 붙여 넣고 **게시**
- [ ] 7. Netlify → Site configuration → **Environment variables**에 아래 6개 등록 후 재배포
  - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`,
    `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`
  - 내 컴퓨터에서 테스트하려면 `.env.example`을 복사해 `.env.local`을 만들고 같은 값을 넣습니다.
- [ ] 8. Firestore에 **`admins` 컬렉션**을 만들고, **문서 ID를 교수님의 구글 이메일 주소**로 하여 문서를 추가 (필드는 `note: "교수"` 등 아무거나)
- [ ] 9. 코드 연결: `src/services/firebase/` 구현을 추가하고 `src/services/index.ts`의 import를 교체 (Claude에게 "Firebase 연동 단계 진행해줘"라고 요청하면 됩니다)

### 관리자 권한에 대한 중요한 안내
화면에서 "관리" 메뉴를 숨기는 것은 편의 기능일 뿐 **보안이 아닙니다.** 누가 글을 쓰고 지울 수 있는지는 **Firestore 보안 규칙(`firestore.rules`)이 최종적으로 결정**합니다. 규칙은 `admins` 컬렉션에 이메일이 등록된 사람만 연구·수업 자료를 쓸 수 있도록 되어 있고, `admins` 컬렉션은 앱에서 수정할 수 없어 **Firebase 콘솔에서만** 관리합니다.

---

## 폴더 구조

```
src/
├─ pages/        화면(홈, 연구, 수업자료, 소개, 로그인, 관리자)
├─ components/   공통 부품(상단 메뉴, 댓글, 카드 등)
├─ services/     데이터 접근 계층 ← 가장 중요
│  ├─ types.ts   인터페이스(Auth/Research/Course/Comment)
│  ├─ index.ts   화면이 사용하는 유일한 입구 (여기만 바꾸면 Firebase로 교체)
│  └─ mock/      임시 메모리 구현 + 샘플 데이터
├─ types/        데이터 타입
├─ context/      로그인 상태(AuthContext)
└─ lib/          firebase 초기화 틀, 날짜·링크 유틸
```

데이터 구조는 `docs/firestore-schema.md`를 참고하세요.
