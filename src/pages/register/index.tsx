import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
import type { RegisterPayload } from "@/types/auth.types";
import toast from "react-hot-toast";
import { register as registerApi } from "@/api/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { RoutePaths } from "@/constants/routes";
import type { AxiosError } from "axios";
import { PasswordStrength } from "@/components/PasswordStrengthComp";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be under 50 characters")
      .regex(/^[a-z]+$/i, "First name can only contain letters"),
    lastName: z
      .string()
      .max(50, "Last name must be under 50 characters")
      .regex(/^[a-z]+$/i, "Last name can only contain letters")
      .optional()
      .or(z.literal("")),
    email: z.email("Enter a valid email address").min(1, "Email is required"),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, "Enter a valid 10-digit phone number")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(1, "PLease confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const passwordValue = useWatch({ control, name: "password" });

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      const payload: RegisterPayload = {
        firstName: data.firstName,
        lastName: data.lastName ?? undefined,
        email: data.email,
        phoneNumber: data.phoneNumber ?? undefined,
        password: data.password,
      };

      await registerApi(payload);
      navigate(RoutePaths.LOGIN);
    } catch (err) {
      const message =
        (err as AxiosError<{ message: string }>)?.response?.data?.message ??
        "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div>
      {/* Heading */}
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-1">
        Create your account
      </h1>
      <p className="text-text-muted text-sm mb-8">
        Start tracking your finances intelligently
      </p>
      <Form onSubmit={handleSubmit(onRegisterSubmit)} noValidate>
        <fieldset className="grid grid-cols-2 gap-3 mb-4">
          <Form.Group controlId="form.firstName">
            <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
              First Name <span className="text-expense">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              {...register("firstName")}
              placeholder="John"
              autoComplete="given-name"
              className={`w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.firstName ? "border-expense" : "border-border"
              }`}
            />
            {errors.firstName && (
              <p className="text-expense text-xs mt-1.5">
                {errors.firstName.message}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="form.firstName">
            <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
              Last Name
            </Form.Label>
            <Form.Control
              type="text"
              {...register("lastName")}
              placeholder="Smith"
              autoComplete="family-name"
              className={`w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.lastName ? "border-expense" : "border-border"
              }`}
            />
            {errors.lastName && (
              <p className="text-expense text-xs mt-1.5">
                {errors.lastName.message}
              </p>
            )}
          </Form.Group>
        </fieldset>
        <Form.Group className="mb-4" controlId="form.email">
          <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
            Email Address <span className="text-expense">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            placeholder="john@email.com"
            autoComplete="email"
            className={`w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
              errors.email ? "border-expense" : "border-border"
            }`}
          />
          {errors.email && (
            <Form.Text className="text-expense text-xs mt-1.5">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-4" controlId="form.phone">
          <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
            Phone Number
          </Form.Label>
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
              placeholder="0000000000"
              aria-label="Phone number"
              aria-describedby="in-code"
              className={`w-full bg-surface border rounded-xl pl-12 pr-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.phoneNumber ? "border-expense" : "border-border"
              }`}
            />
          </InputGroup>
          {errors.phoneNumber && (
            <p className="text-expense text-xs mt-1.5">
              {errors.phoneNumber.message}
            </p>
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
              autoComplete="new-password"
              className={`w-full bg-surface border rounded-xl px-4 py-3 pr-11 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.password ? "border-expense" : "border-border"
              }`}
            />
            <Button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/4 translate-y-1/3 text-text-muted hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </InputGroup>
          {errors.password && !passwordValue && (
            <p className="text-expense text-xs mt-1.5">
              {errors.password.message}
            </p>
          )}
          <PasswordStrength password={passwordValue} />
        </Form.Group>
        <Form.Group className="relative mb-6" controlId="form.confirm-password">
          <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
            Cofirm password <span className="text-expense">*</span>
          </Form.Label>
          <InputGroup className="relative">
            <Form.Control
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              className={`w-full bg-surface border rounded-xl px-4 py-3 pr-11 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.confirmPassword ? "border-expense" : "border-border"
              }`}
            />
            <Button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-3 top-1/4 translate-y-1/3 text-text-muted hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </InputGroup>
          {errors.confirmPassword && (
            <p className="text-expense text-xs mt-1.5">
              {errors.confirmPassword.message}
            </p>
          )}
        </Form.Group>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </Form>
      <p className="text-text-muted text-sm text-center mt-6">
        Already have an account?{" "}
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

export default RegisterPage;
