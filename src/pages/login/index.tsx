import React, { Activity, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, InputGroup } from "react-bootstrap";
import type { LoginPayload } from "@/types/auth.types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { login as loginApi } from "@/api/auth.api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoutePaths } from "@/constants/routes";
import { SectionSpinner } from "@/components/Common/Loading";

const loginSchema = z
  .object({
    loginMethod: z.enum(["email", "phone"]),
    email: z.string().optional(),
    phoneNumber: z.string().max(10).optional(),
    password: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.loginMethod === "email") {
      if (!data.email || data.email.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Email is required",
          path: ["email"],
        });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        ctx.addIssue({
          code: "custom",
          message: "Enter a valid email address",
          path: ["email"],
        });
      }
    }

    if (data.loginMethod === "phone") {
      if (!data.phoneNumber || data.phoneNumber.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Phone number is required",
          path: ["phoneNumber"],
        });
      } else if (!/^\d{10}$/.test(data.phoneNumber)) {
        ctx.addIssue({
          code: "custom",
          message: "Enter a valid 10-digit phone number",
          path: ["phoneNumber"],
        });
      }
    }
  });

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from =
    (location.state as { from?: string })?.from ?? RoutePaths.OVERVIEW;

  const defaultEmail = location.state?.email ?? "";

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginMethod: "email",
      email: defaultEmail,
      phoneNumber: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      const payload: LoginPayload =
        data.loginMethod === "email"
          ? { email: data.email!, password: data.password }
          : { phoneNumber: data.phoneNumber!, password: data.password };

      const response = await loginApi(payload);
      login(response);
      toast.success(`Welcome back, ${response.user.firstName}!`);
      navigate(from, { replace: true });
    } catch (err) {
      const message =
        (err as AxiosError<{ message: string }>)?.response?.data?.message ??
        "Login failed. Please try again.";

      const UnVerifedEmailMessage = "Email not verified";
      if (message.toLowerCase().includes(UnVerifedEmailMessage.toLowerCase())) {
        toast.error(
          "Your email is not verified. Please verify your email before logging in.",
        );
        navigate(RoutePaths.RESEND_VERIFICATION, {
          state: {
            email: loginMethod === "email" ? data.email : undefined,
          },
        });
      } else {
        toast.error(message);
      }
    }
  };

  const handleMethodSwitch = (method: "email" | "phone") => {
    setLoginMethod(method);
    setValue("loginMethod", method);
    if (method === "email") setValue("phoneNumber", "");
    else setValue("email", "");
  };

  return (
    <>
      <Activity mode={isSubmitting ? "visible" : "hidden"}>
        <div className="h-full w-full">
          <SectionSpinner />
          <h4 className="text-white text-lg font-medium text-center">
            Logging in...
          </h4>
        </div>
      </Activity>
      <Activity mode={isSubmitting ? "hidden" : "visible"}>
        <section>
          <h1 className="text-xl font-bold text-text-primary">Welcome back</h1>
          <p className="text-text-muted text-xs mb-6">
            Sign in to your account to continue
          </p>
          <div className="flex bg-surface rounded-xl p-1 mb-6 border border-border">
            <button
              type="button"
              onClick={() => handleMethodSwitch("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                loginMethod === "email"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Mail size={14} />
              Email
            </button>
            <button
              type="button"
              onClick={() => handleMethodSwitch("phone")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                loginMethod === "phone"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Phone size={14} />
              Phone
            </button>
          </div>
          <Form onSubmit={handleSubmit(handleLoginSubmit)} noValidate>
            <input type="hidden" {...register("loginMethod")} />
            <Form.Group controlId={`form.${loginMethod}`} className="mb-4">
              <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
                {loginMethod === "email" ? "Email Address" : "Phone Number"}{" "}
                <span className="text-expense">*</span>
              </Form.Label>
              {loginMethod === "email" ? (
                <>
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
                </>
              ) : (
                <>
                  <InputGroup className="mb-3 relative">
                    <InputGroup.Text
                      id="in-code"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm"
                    >
                      +91
                    </InputGroup.Text>
                    <Form.Control
                      {...register("phoneNumber")}
                      type="tel"
                      placeholder="9876543210"
                      aria-label="Phone number"
                      aria-describedby="in-code"
                      className={`w-full bg-surface border rounded-xl pl-12 pr-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                        errors.phoneNumber ? "border-expense" : "border-border"
                      }`}
                    />
                  </InputGroup>
                  {errors.phoneNumber && (
                    <p className="text-expense text-xs mt-1.5">
                      {errors.phoneNumber?.message}
                    </p>
                  )}
                </>
              )}
            </Form.Group>
            <Form.Group className="relative mb-4" controlId="form.password">
              <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
                Enter your password <span className="text-expense">*</span>
              </Form.Label>
              <InputGroup className="relative">
                <Form.Control
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full bg-surface border rounded-xl px-4 py-3 pr-11 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                    errors.password ? "border-expense" : "border-border"
                  }`}
                />
              </InputGroup>
              <Button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 translate-y-1/3 text-text-muted hover:text-text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </Form.Group>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Form>
          <p className="text-text-muted text-sm text-center mt-6">
            Don't have a account yet?{" "}
            <Link
              to={RoutePaths.REGISTER}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Create now
            </Link>
          </p>
        </section>
      </Activity>
    </>
  );
};

export default LoginPage;
