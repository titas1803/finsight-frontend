import { EyeOff, Eye } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Form, type FormGroupProps } from "react-bootstrap";

type InputFieldProps = React.PropsWithChildren<{
  label: string | React.ReactNode;
  icon: React.ElementType;
  labelClassName?: string;
  error?: string;
  formGroupProps?: FormGroupProps;
}>;
export const InputField: React.FC<InputFieldProps> = ({
  children,
  icon: Icon,
  label,
  formGroupProps: { className: wrapperClassName, ...groupProps } = {
    className: "",
  },
  labelClassName,
  error,
}) => {
  return (
    <Form.Group className={`space-y-1.5 ${wrapperClassName}`} {...groupProps}>
      <Form.Label
        className={`flex items-center gap-1.5 text-xs font-semibold text-[#64748B] uppercase tracking-wider ${labelClassName}`}
      >
        <Icon size={12} />
        {label}
      </Form.Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </Form.Group>
  );
};
type InputProps = React.HTMLProps<HTMLInputElement> & {
  error: boolean;
};

export const TextInput: React.FC<InputProps> = ({
  error,
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      className={`w-full bg-[#0F1117] border rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        error
          ? "border-red-500 focus:border-red-500"
          : "border-[#2A2D3E] focus:border-[#6C63FF]"
      } ${className}`}
    />
  );
};

type PasswordInputProps = InputProps & { wrapperClassName?: string };

export const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  wrapperClassName,
  className,
  ...props
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`relative ${wrapperClassName}`}>
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`w-full bg-[#0F1117] border rounded-xl px-4 py-2.5 pr-10 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-[#2A2D3E] focus:border-[#6C63FF]"
        } ${className}`}
      />
      <button
        type="button"
        onMouseDown={() => setShow(true)}
        onMouseUp={() => setShow(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#F1F5F9] transition-colors"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
};
