import { Form } from "react-bootstrap";
import z from "zod";
import { Category, PaymentModes, TransactionType } from "../../constants/enums";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import React from "react";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../hooks/transactionHooks";
import type { Transaction } from "../../types/transaction.types";
import {
  ALL_CATEGORIES,
  ALL_PAYMENT_MODES,
  ALL_TYPES,
  CAT_COLOR,
  PAY_ICON,
  TRANSACTION_TYPE_CATEGORIES,
  TYPE_CFG,
} from "./TransactionConfigs";
import { capitalize } from "../../utils/format";
import { Calendar } from "lucide-react";

const transactionSchema = z.object({
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Invalid number")
    .refine(
      (val) => {
        const parts = val.toString().split(".");
        return parts.length === 1 || parts[1].length <= 2;
      },
      { message: "Max 2 decimal places allowed" },
    ),
  type: z.enum(TransactionType, "Select a transaction type"),
  category: z.enum(Category, "Select a transaction category"),
  paymentMode: z.enum(PaymentModes, "Select a payment mode"),
  date: z
    .string()
    .min(1, "Select a date")
    .regex(
      /^(\d{4})-(\d{2})-(\d{2})$/,
      "Please enter a date in yyyy-mm-dd format",
    ),
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

type TransactionFormFields =
  | "amount"
  | "type"
  | "category"
  | "paymentMode"
  | "date"
  | "description";

type TransactionFormProps = {
  onClose: () => void;
  updateData: Transaction | null;
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onClose,
  updateData,
}) => {
  const defaultValues: TransactionFormData = {
    amount: updateData?.amount.toString() ?? "0",
    category: updateData?.category ?? "",
    date: updateData?.date ?? "",
    paymentMode: updateData?.paymentMode ?? "",
    type: updateData?.type ?? "",
    description: updateData?.description ?? "",
  };

  const { mutate: updateTransaction } = useUpdateTransaction();
  const { mutate: createTransaction } = useCreateTransaction();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<z.input<typeof transactionSchema>, unknown, TransactionFormData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(transactionSchema),
    defaultValues,
  });

  const selectedType: TransactionType = useWatch({ control, name: "type" });
  const selectedCategory: Category = useWatch({
    control,
    name: "category",
  });

  const selectedPaymentMode: PaymentModes = useWatch({
    control,
    name: "paymentMode",
  });

  const onTransactionSubmit = (data: TransactionFormData) => {
    try {
      if (updateData) {
        updateTransaction(
          { id: updateData.id, payload: data },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      } else {
        createTransaction(
          { ...data, amount: data.amount },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      }
    } catch (err) {
      const message =
        (err as AxiosError<{ message: string }>)?.response?.data?.message ??
        "Operation failed. Please try again.";
      toast.error(message);
    }
  };

  const changeValue =
    (field: TransactionFormFields, value: string | undefined) => () => {
      setValue(field, value);
    };

  const activeCfg = TYPE_CFG[updateData?.type ?? TransactionType.EXPENSE];

  console.log();
  return (
    <>
      <Form
        className="flex-1 overflow-y-auto px-5 py-5 space-y-5"
        onSubmit={handleSubmit(onTransactionSubmit)}
        noValidate
      >
        <Form.Group className="space-y-2 type-field">
          <Form.Label
            className="text-xs font-semibold text-[#64748B] uppercase tracking-wider"
            htmlFor="transaction-type"
          >
            Type
          </Form.Label>
          <div className="grid grid-cols-3 gap-2">
            {ALL_TYPES.map((type) => {
              const cfg = TYPE_CFG[type];
              const active = selectedType === type;
              return (
                <button
                  name="transaction-type"
                  key={type}
                  type="button"
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-semibold transition-all"
                  onClick={changeValue("type", type)}
                  style={
                    active
                      ? {
                          background: cfg.color + "18",
                          borderColor: cfg.color,
                          color: cfg.color,
                        }
                      : {
                          background: "#0F1117",
                          borderColor: "#2A2D3E",
                          color: "#64748B",
                        }
                  }
                >
                  <cfg.Icon size={16} />
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </Form.Group>
        <Form.Group className="space-y-1.5" controlId="transaction.amount">
          <Form.Label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Amount
          </Form.Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm font-semibold">
              ₹
            </span>
            <Form.Control
              type="text"
              {...register("amount")}
              placeholder="0"
              className={`w-full bg-[#0F1117] border rounded-xl pl-7 pr-4 py-3 text-xl font-bold placeholder:text-[#2A2D3E] focus:outline-none transition-colors ${
                errors.amount
                  ? "border-red-500 text-red-400"
                  : "border-[#2A2D3E] focus:border-[#6C63FF]"
              }`}
              style={!errors.amount ? { color: activeCfg.color } : {}}
            />
          </div>
          {errors.amount && (
            <p className="text-xs text-red-400">{errors.amount.message}</p>
          )}
        </Form.Group>
        <Form.Group className="space-y-1.5" controlId="transaction.description">
          <Form.Label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Description
          </Form.Label>
          <Form.Control
            type="text"
            {...register("description")}
            placeholder="What was this for?"
            className={`w-full bg-[#0F1117] border rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none transition-colors ${
              errors.description
                ? "border-red-500"
                : "border-[#2A2D3E] focus:border-[#6C63FF]"
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-400">{errors.description.message}</p>
          )}
        </Form.Group>
        <Form.Group className="space-y-2" controlId="transaction.category">
          <Form.Label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Category
          </Form.Label>
          <div className="grid grid-cols-4 gap-2">
            {(TRANSACTION_TYPE_CATEGORIES[selectedType] ?? ALL_CATEGORIES).map(
              (category) => {
                const color = CAT_COLOR[category] ?? "#64748B";
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    {...register("category")}
                    type="button"
                    onClick={changeValue("category", category)}
                    className="py-2 px-1 rounded-lg border text-xs font-medium transition-all"
                    style={
                      active
                        ? {
                            background: color + "20",
                            borderColor: color,
                            color,
                          }
                        : {
                            background: "#0F1117",
                            borderColor: "#2A2D3E",
                            color: "#64748B",
                          }
                    }
                  >
                    {capitalize(category)}
                  </button>
                );
              },
            )}
            <button
              type="button"
              onClick={changeValue("category", "other")}
              className="py-2 px-1 rounded-lg border text-xs font-medium transition-all"
              style={
                selectedCategory === "other"
                  ? {
                      background: "#64748B" + "20",
                      borderColor: "#64748B",
                      color: "#64748B",
                    }
                  : {
                      background: "#0F1117",
                      borderColor: "#2A2D3E",
                      color: "#64748B",
                    }
              }
            >
              {capitalize("other")}
            </button>
          </div>
        </Form.Group>
        <Form.Group className="space-y-2" controlId="transaction.paymentMode">
          <Form.Label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Payment Mode
          </Form.Label>
          <div className="grid grid-cols-3 gap-2">
            {ALL_PAYMENT_MODES.map((mode) => {
              const active = selectedPaymentMode === mode;
              const Icon = PAY_ICON[mode];
              return (
                <button
                  type="button"
                  key={mode}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all"
                  onClick={changeValue("paymentMode", mode)}
                  style={
                    active
                      ? {
                          background: "#6C63FF18",
                          borderColor: "#6C63FF",
                          color: "#6C63FF",
                        }
                      : {
                          background: "#0F1117",
                          borderColor: "#2A2D3E",
                          color: "#64748B",
                        }
                  }
                >
                  <Icon /> {capitalize(mode)}
                </button>
              );
            })}
          </div>
        </Form.Group>
        <Form.Group className="space-y-2" controlId="transaction.date">
          <Form.Label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Date
          </Form.Label>
          <div className="relative">
            <Calendar
              size={14}
              className="absolute left-3 top-1/4 translate-y-1/4 text-[#64748B] pointer-events-none"
            />
            <Form.Control
              type="date"
              placeholder="yyyy-mm-dd"
              {...register("date")}
              className={`w-full bg-[#0F1117] border rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#F1F5F9] focus:outline-none transition-colors scheme-dark ${
                errors.date
                  ? "border-red-500"
                  : "border-[#2A2D3E] focus:border-[#6C63FF]"
              }`}
            />
          </div>
          <Form.Text className="text-[#64748B]">
            Date should be in dd-mm-yyyy format
          </Form.Text>
          {errors.date && (
            <p className="text-xs text-red-400">{errors.date.message}</p>
          )}
        </Form.Group>
        <div className="px-5 py-4 border-t border-[#2A2D3E] flex gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[#2A2D3E] text-sm font-medium text-[#64748B] hover:text-[#F1F5F9] hover:border-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2.5 rounded-xl bg-[#6C63FF] hover:bg-[#5B54E8] text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#6C63FF]/20"
          >
            {isSubmitting
              ? "Saving…"
              : updateData
                ? "Save Changes"
                : "Add Transaction"}
          </button>
        </div>
      </Form>
    </>
  );
};
