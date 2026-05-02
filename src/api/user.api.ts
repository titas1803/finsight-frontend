import { UserUrls } from "../constants/enums";
import type { UpdateProfilePayload } from "../types/auth.types";
import api from "./client";

export const UpdateProfile = async (payload: UpdateProfilePayload) => {
  const { data } = await api.patch(`/${UserUrls.UPDATE}`, payload);

  return data;
};
