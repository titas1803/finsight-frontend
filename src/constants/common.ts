export const TOKENS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};
export type TOKENS = (typeof TOKENS)[keyof typeof TOKENS];
