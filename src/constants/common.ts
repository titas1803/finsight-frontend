import type { RefreshTokenResponse } from "../types/auth.types";

export const TOKENS: Record<string, keyof RefreshTokenResponse> = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};
export type TOKENS = (typeof TOKENS)[keyof typeof TOKENS];
