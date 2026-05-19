import {
  ChangePasswordForm,
  DangerZoneCard,
  UpdateProfileForm,
} from "@/components/ProfileComponents";

export default function ProfilePage() {
  return (
    <div className="p-4 lg:p-6 max-w-215 mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#F1F5F9]">Profile</h1>
        <p className="text-sm text-[#64748B] mt-0.5">
          Manage your account details and security settings
        </p>
      </div>

      <UpdateProfileForm />
      <ChangePasswordForm />
      <DangerZoneCard />
    </div>
  );
}
