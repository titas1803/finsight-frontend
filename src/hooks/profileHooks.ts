import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { upddatePassword } from "../api/auth.api";
import { UpdateProfile } from "../api/user.api";
import type {
  UpdateProfilePayload,
  UpdatePasswordPayload,
} from "../types/auth.types";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => UpdateProfile(payload),
    onError: () => toast.error("Failed to update profile"),
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => upddatePassword(payload),
    onError: (err: any) => {
      const msg = err?.response?.data?.message ?? "Failed to update password";
      toast.error(msg);
    },
  });
};
