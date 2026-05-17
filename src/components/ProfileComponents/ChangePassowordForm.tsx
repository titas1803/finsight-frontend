import { AlertTriangle, KeyRound, ShieldCheck } from "lucide-react";
import { useUpdatePassword } from "../../hooks/profileHooks";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { InputField, PasswordInput } from "./ProfileInputFields";
import { Lock } from "lucide-react";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { PasswordStrength } from "../PasswordStrengthComp";
const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(1, "PLease confirm your password"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password and old password shouldn't match",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const defaultValues: ChangePasswordFormData = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const ChangePasswordForm: React.FC = () => {
  const { isSuccess, mutateAsync: updatePasswordMutation } =
    useUpdatePassword();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ChangePasswordFormData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  });

  const newPasswordVal = useWatch({ control, name: "newPassword" });
  const submitHandler = async (data: ChangePasswordFormData) => {
    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    await updatePasswordMutation(payload, {
      onSuccess: () => {
        toast.success("Password changed successfully!");
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="bg-[#1A1D27] border border-[#2A2D3E] rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-[#2A2D3E]">
        <div className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center">
          <KeyRound size={13} className="text-amber-400" />
        </div>
        <h2 className="text-sm font-bold text-[#F1F5F9]">Change Password</h2>
      </div>
      <Form
        className="px-6 py-5 space-y-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        {isSuccess && (
          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <p className="text-sm text-emerald-400">
              Password updated. Use your new password next time you log in.
            </p>
          </div>
        )}

        <InputField
          label="Current Password"
          icon={Lock}
          error={errors.oldPassword?.message}
          formGroupProps={{ controlId: "passwordForm.oldPassword" }}
        >
          <PasswordInput
            {...register("oldPassword")}
            placeholder="Enter current password"
            error={!!errors.oldPassword?.message}
          />
        </InputField>

        <InputField
          label="New Password"
          icon={Lock}
          error={errors.newPassword?.message}
        >
          <PasswordInput
            {...register("newPassword")}
            placeholder="Enter new password"
            error={!!errors.newPassword}
          />
          <PasswordStrength password={newPasswordVal} />
        </InputField>

        <InputField
          label="Confirm New Password"
          icon={Lock}
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            {...register("confirmPassword")}
            placeholder="Repeat new password"
            error={!!errors.confirmPassword}
          />
        </InputField>

        <div className="flex items-start gap-2.5 px-3 py-2.5 bg-[#0F1117] border border-[#2A2D3E] rounded-lg">
          <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-[#64748B]">
            You will remain logged in on this device. Other active sessions will
            be invalidated on their next request.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-xl bg-[#6C63FF] hover:bg-[#5B54E8] text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#6C63FF]/20"
        >
          {isSubmitting ? "Updating…" : "Update Password"}
        </button>
      </Form>
    </div>
  );
};
