import type { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { verifyEmail as verifyEmailApi } from "@/api/auth.api";
import { RoutePaths } from "@/constants/routes";
import { SectionSpinner } from "@/components/Common/Loading";

const VerifyEmailPage: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async (token: string) => {
      try {
        await verifyEmailApi(token);
        toast.success("Email verified successfully! You can now log in.");
      } catch (err) {
        const message =
          (err as AxiosError<{ message: string }>)?.response?.data?.message ??
          "An error occurred while verifying your email.";
        toast.error(message);
      }
    };

    if (token) verifyEmail(token);
  }, [token, navigate]);

  return token ? (
    <div className="flex flex-col items-center justify-center">
      <SectionSpinner />
      <h1 className="text-2xl font-bold mb-4 text-text-primary">
        Verifying your email...
      </h1>
      <p className="text-gray-600">
        Please wait while we verify your email address.
      </p>
    </div>
  ) : (
    <Navigate to={RoutePaths.LOGIN} replace />
  );
};

export default VerifyEmailPage;
