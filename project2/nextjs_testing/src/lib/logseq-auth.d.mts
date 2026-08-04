export const LOGSEQ_COOKIE_NAME: string;
export const LOGSEQ_SESSION_MAX_AGE: number;

export function verifyPassword(
  candidate: string,
  configuredPassword: string,
): Promise<boolean>;

export function createSessionToken(
  secret: string,
  now?: number,
  maxAgeSeconds?: number,
): Promise<string>;

export function verifySessionToken(
  token: string | undefined,
  secret: string,
  now?: number,
): Promise<boolean>;

export function isProtectedLogseqPath(pathname: string): boolean;
export function logseqHostname(host: string): string | null;
export function safeReturnPath(value?: string): string;
