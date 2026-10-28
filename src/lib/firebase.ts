import { getApps, initializeApp, type FirebaseApp } from 'firebase/app'

// 환경변수(.env.local / Netlify 환경변수)로만 초기화한다. 코드에 설정값을 직접 쓰지 않는다.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
}

// 값이 하나라도 비어 있으면 초기화하지 않는다. (mock 모드에서 에러 없이 동작하기 위함)
export const isFirebaseConfigured = Object.values(config).every(Boolean)

// 아직 어디에서도 사용하지 않는다. Firebase 서비스 구현(src/services/firebase/)이 생기면 여기서 가져다 쓴다.
// Spark 무료 요금제 유지를 위해 Storage / Functions 는 초기화하지 않는다.
export const firebaseApp: FirebaseApp | null = isFirebaseConfigured
  ? (getApps()[0] ?? initializeApp(config))
  : null
