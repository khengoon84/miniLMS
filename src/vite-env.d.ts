/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORKSHOP_ACCESS_CODE?: string;
  readonly [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
