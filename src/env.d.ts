/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_CONFIG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 