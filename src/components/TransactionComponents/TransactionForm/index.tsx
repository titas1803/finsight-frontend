import { Form } from "react-bootstrap";
import z from "zod";
import {
  Category,
  PaymentModes,
  TransactionType,
} from "../../../constants/enums";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import React from "react";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../../hooks/transactinHooks";
import type { Transaction } from "../../../types/transaction.types";
import {
  ALL_TYPES,
  CAT_COLOR,
  TRANSACTION_TYPE_CATEGORIES,
  TYPE_CFG,
} from "../TransactionConfigs";
import { capitalize } from "../../../utils/format";

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
  updateData?: Transaction;
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
  const selectedCategory: TransactionType = useWatch({
    control,
    name: "category",
  });

  const onTransactionSubmit = (data: TransactionFormData) => {
    try {
      if (updateData) {
        updateTransaction({ id: updateData.id, payload: data });
      } else {
        createTransaction({ ...data, amount: data.amount });
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

  return (
    <>
      <Form
        className="flex-1 overflow-y-auto px-5 py-5 space-y-5 min-h-screen"
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
            {TRANSACTION_TYPE_CATEGORIES[selectedType].map((category) => {
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
                      ? { background: color + "20", borderColor: color, color }
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
            })}
          </div>
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
