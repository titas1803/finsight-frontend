import { Form } from "react-bootstrap";
import { InputField, TextInput } from "./ProfileInputFields";
import { User, Mail, Phone, BadgeCheck, Check, Pencil, X } from "lucide-react";
import z from "zod";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUpdateProfile } from "../../hooks/profileHooks";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/format";
import type { UpdateProfilePayload } from "../../types/auth.types";
import toast from "react-hot-toast";

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}
function Avatar({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  return (
    <div className="w-20 h-20 rounded-full bg-[#6C63FF]/20 border-2 border-[#6C63FF]/40 flex items-center justify-center text-2xl font-bold text-[#6C63FF] shrink-0 select-none">
      {getInitials(firstName, lastName)}
    </div>
  );
}

const updatProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be under 50 characters")
    .regex(/^[a-z]{1,}$/i, "First name can only contain letters"),
  lastName: z
    .string()
    .max(50, "Last name must be under 50 characters")
    .regex(/^[a-z]{1,}$/i, "Last name can only contain letters")
    .optional()
    .or(z.literal("")),
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .optional()
    .or(z.literal("")),
});

type UpdateProfileFormData = z.infer<typeof updatProfileSchema>;

export const UpdateProfileForm: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { mutateAsync: updateProfileMutation, isPending } = useUpdateProfile();
  const [editing, setEditing] = useState(false);

  const defaultValues: UpdateProfileFormData = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
  };

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues,
    resolver: zodResolver(updatProfileSchema),
  });

  const firstNameVal = useWatch({ control, name: "firstName" });
  const lastNameVal = useWatch({ control, name: "lastName" });

  const handleCancel = () => {
    setEditing(false);
    reset(defaultValues);
  };

  const onErrorHandler = (errors: FieldErrors) => {
    console.log(errors, firstNameVal, lastNameVal);
  };

  const onSubmithandler = async (data: UpdateProfileFormData) => {
    const payload: UpdateProfilePayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };

    await updateProfileMutation(payload, {
      onSuccess: () => {
        if (user) {
          updateUser({
            ...user,
            firstName: payload.firstName ?? user.firstName,
            lastName: payload.lastName ?? user.lastName,
            email: payload.email ?? user.email,
            phoneNumber: payload.phoneNumber ?? user.phoneNumber,
          });
        }
        toast.success("Profile updated successfully!");
        setEditing(false);
      },
    });
  };
  return (
    <Form
      className="bg-[#1A1D27] border border-[#2A2D3E] rounded-2xl overflow-hidden"
      onSubmit={handleSubmit(onSubmithandler, onErrorHandler)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2D3E]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#6C63FF]/20 flex items-center justify-center">
            <User size={13} className="text-[#6C63FF]" />
          </div>
          <h2 className="text-sm font-bold text-[#F1F5F9]">
            Personal Information
          </h2>
        </div>

        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2D3E] text-xs font-medium text-[#64748B] hover:text-[#F1F5F9] hover:border-white/20 transition-colors"
          >
            <Pencil size={12} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2D3E] text-xs font-medium text-[#64748B] hover:text-[#F1F5F9] transition-colors disabled:opacity-50"
            >
              <X size={12} /> Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6C63FF] hover:bg-[#5B54E8] text-xs font-semibold text-white transition-colors disabled:opacity-50"
            >
              <Check size={12} />
              {isPending ? "Saving…" : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* Avatar + display info */}
      <div className="px-6 py-5 flex items-center gap-4 border-b border-[#2A2D3E]">
        <Avatar
          firstName={user?.firstName ?? ""}
          lastName={user?.lastName ?? ""}
        />
        <div>
          <p className="text-base font-bold text-[#F1F5F9]">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-[#64748B] mt-0.5">{user?.email}</p>
          {user?.createdAt && (
            <p className="text-xs text-[#64748B] mt-1.5 flex items-center gap-1.5">
              <BadgeCheck size={12} className="text-[#6C63FF]" />
              Member since {formatDate(user.createdAt)}
            </p>
          )}
        </div>
      </div>
      <fieldset className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          icon={User}
          error={errors.firstName?.message}
        >
          <TextInput
            {...register("firstName")}
            placeholder="John"
            error={!!errors.firstName}
            disabled={!editing}
          />
        </InputField>

        <InputField label="Last Name" icon={User}>
          <TextInput
            {...register("lastName")}
            placeholder="Doe"
            disabled={!editing}
            error={!!errors.lastName}
          />
        </InputField>

        <InputField label="Email" icon={Mail} error={errors.email?.message}>
          <TextInput
            {...register("email")}
            placeholder="john@example.com"
            type="email"
            error={!!errors.email}
            disabled={!editing}
          />
        </InputField>

        <InputField
          label="Phone Number"
          icon={Phone}
          error={errors.phoneNumber?.message}
        >
          <TextInput
            {...register("phoneNumber")}
            placeholder="9876543210"
            type="tel"
            error={!!errors.phoneNumber}
            disabled={!editing}
          />
        </InputField>
      </fieldset>
    </Form>
  );
};
