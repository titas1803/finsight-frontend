import type { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail as verifyEmailApi } from "@/api/auth.api";
import { RoutePaths } from "@/constants/routes";
import { SectionSpinner } from "@/components/Common/Loading";

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const goToLogin = () => {
      navigate(RoutePaths.LOGIN, { replace: true });
    };
    const verifyEmail = async (token: string) => {
      try {
        await verifyEmailApi(token);
        console.log("Email verified successfully! Redirecting to login page.");
        toast.success("Email verified successfully! You can now log in.");
        goToLogin();
      } catch (err) {
        const message =
          (err as AxiosError<{ message: string }>)?.response?.data?.message ??
          "An error occurred while verifying your email.";
        console.error("Error occurred while verifying email:", message);
        toast.error(message);

        setTimeout(() => {
          goToLogin();
        }, 3000);
      }
    };

    if (token) verifyEmail(token);
    else {
      console.warn("No token found in URL. Redirecting to login page.");
      goToLogin();
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <SectionSpinner />
      <h1 className="text-2xl font-bold mb-4 text-text-primary">
        Verifying your email...
      </h1>
      <p className="text-gray-600">
        Please wait while we verify your email address.
      </p>
    </div>
  );
};

export default VerifyEmailPage;
