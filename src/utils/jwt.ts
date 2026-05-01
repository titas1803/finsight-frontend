// utils/jwt.ts
export const getTokenExpiry = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ?? null;
  } catch {
    return null;
  }
};
export function isTokenExpired(
  token: string,
  bufferSeconds: number = 0,
): boolean {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  return Date.now() >= expiry * 1000 - bufferSeconds;
}
