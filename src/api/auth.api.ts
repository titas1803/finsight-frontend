import { AuthUrls } from "../constants/enums";
import type {
  RegisterResponse,
  RegisterPayload,
  LoginPayload,
  LoginResponse,
  UpdatePasswordPayload,
  User,
} from "../types/auth.types";
import api from "./client";

export const register = async (payload: RegisterPayload) => {
  const { data } = await api.post<RegisterResponse>(
    `/${AuthUrls.REGISTER}`,
    payload,
  );
  return data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post<LoginResponse>(`/${AuthUrls.LOGIN}`, payload);
  return data;
};

export const logout = async (): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>(`/${AuthUrls.LOGOUT}`);
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<{ user: User }>(`/${AuthUrls.ME}`, {
    withCredentials: true,
  });
  return data;
};

export const refreshTokens = async (refreshToken: string) => {
  const { data } = await api.post<{
    refreshToken: string;
    accessToken: string;
  }>(`/${AuthUrls.REFRESHTOKEN}`, { refreshToken });
  return data;
};

export const upddatePassword = async (
  payload: UpdatePasswordPayload,
): Promise<{ message: string }> => {
  const { data } = await api.patch<{ message: string }>(
    `/${AuthUrls.UPDATEPASSWORD}`,
    payload,
  );
  return data;
};
