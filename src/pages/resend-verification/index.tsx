import { resendVerification } from "@/api/auth.api";
import { RoutePaths } from "@/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Mail } from "lucide-react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import z from "zod";

const resendVerificationSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type ResendVerificationFormData = z.infer<typeof resendVerificationSchema>;

const ResendVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const defaultEmail = location.state?.email ?? "";

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ResendVerificationFormData>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  const gotToLogin = (email: string) => {
    navigate(RoutePaths.LOGIN, {
      state: { email },
      replace: true,
    });
  };

  const onSubmit = async (data: ResendVerificationFormData) => {
    try {
      await resendVerification(data.email);
      toast.success("Verification email resent! Please check your inbox.");
      gotToLogin(data.email);
    } catch (err) {
      console.error("Error resending verification email:", err);
      toast.error(
        err instanceof AxiosError && err.response?.data?.message
          ? err.response.data.message
          : "Failed to resend verification email. Please try again.",
      );
      if (
        err instanceof AxiosError &&
        err.response?.data?.message
          .toLowerCase()
          .includes("Email already verified".toLowerCase())
      ) {
        gotToLogin(data.email);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        <Form.Group controlId={`form.resend-email`} className="mb-4">
          <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
            Confirm Email Address
            <span className="text-expense">*</span>
          </Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="arjun@example.com"
            autoComplete="email"
            className={`w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
              errors.email ? "border-expense" : "border-border"
            }`}
          />
          {errors.email && (
            <p className="text-expense text-xs mt-1.5">
              {errors.email?.message}
            </p>
          )}
        </Form.Group>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          Resend Verification Email <Mail className="w-4 h-4" />
        </Button>
      </Form>
      <p className="text-text-muted text-sm text-center mt-6">
        Already verified?{" "}
        <Link
          to={RoutePaths.LOGIN}
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default ResendVerificationPage;
