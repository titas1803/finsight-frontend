import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePassword } from "../api/auth.api";
import { UpdateProfile } from "../api/user.api";
import type {
  UpdateProfilePayload,
  UpdatePasswordPayload,
} from "../types/auth.types";
import type { AxiosError } from "axios";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => UpdateProfile(payload),
    onError: () => toast.error("Failed to update profile"),
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => updatePassword(payload),
    onError: (err: AxiosError<{ message: string }>) => {
      const msg = err?.response?.data?.message ?? "Failed to update password";
      toast.error(msg);
    },
  });
};
