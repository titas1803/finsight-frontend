import { Button, Form, InputGroup } from "react-bootstrap";
import z from "zod";
import { Category, PaymentModes, TransactionType } from "../../constants/enums";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import React from "react";
import { capitalize } from "../../utils/format";
import { Loader2 } from "lucide-react";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../hooks/transactinHooks";

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

type TransactionFormProps = {
  updateData?: { id: string; oldData: TransactionFormData };
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
  updateData,
}) => {
  const { mutate: updateTransaction } = useUpdateTransaction();
  const { mutate: createTransaction } = useCreateTransaction();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<z.input<typeof transactionSchema>, unknown, TransactionFormData>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      ...updateData?.oldData,
      date: updateData?.oldData?.date ?? new Date().toISOString().split("T")[0],
    },
    resolver: zodResolver(transactionSchema),
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

  return (
    <>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-1">
        {updateData?.id ? "Update the transaction" : "Create a new transaction"}
      </h1>
      <p className="text-text-muted text-sm mb-8">
        Add a new transaction to keep tracking your finances intelligently
      </p>

      <Form
        onSubmit={handleSubmit(onTransactionSubmit)}
        noValidate
        className="space-y-5"
      >
        <fieldset className="grid grid-cols-3 gap-3 mb-4">
          <Form.Group controlId="transaction.amount">
            <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
              Transaction amount <span className="text-expense">*</span>
            </Form.Label>
            <InputGroup className="mb-3 relative">
              <InputGroup.Text
                id="amount"
                className="absolute left-4 top-1/3 -translate-y-1/2 text-text-muted text-sm"
              >
                ₹
              </InputGroup.Text>
              <Form.Control
                {...register("amount")}
                type="text"
                placeholder="00.00"
                aria-label="Transaction amount"
                aria-describedby="amount"
                className={`w-full bg-surface border rounded-xl pl-12 pr-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                  errors.amount ? "border-expense" : "border-border"
                }`}
              />
              {errors.amount && (
                <p className="text-expense text-xs mt-1.5">
                  {errors.amount.message}
                </p>
              )}
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="transaction.type">
            <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
              Select a transaction type <span className="text-expense">*</span>
            </Form.Label>
            <Form.Select
              {...register("type")}
              className={`w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.amount ? "border-expense" : "border-border"
              }`}
            >
              <option value="">-No Selection-</option>
              {Object.values(TransactionType).map((opt) => (
                <option value={opt}>{capitalize(opt)}</option>
              ))}
            </Form.Select>
            {errors.type && (
              <p className="text-expense text-xs mt-1.5">
                {errors.type.message}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="transaction.category">
            <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
              Select a transaction category{" "}
              <span className="text-expense">*</span>
            </Form.Label>
            <Form.Select
              {...register("category")}
              className={`w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.amount ? "border-expense" : "border-border"
              }`}
            >
              <option value="">-No Selection-</option>
              {Object.values(Category).map((opt) => (
                <option value={opt}>{capitalize(opt)}</option>
              ))}
            </Form.Select>
            {errors.category && (
              <p className="text-expense text-xs mt-1.5">
                {errors.category.message}
              </p>
            )}
          </Form.Group>
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-3 mb-4">
          <Form.Group controlId="transaction.paymentMode">
            <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
              Select a Payment mode <span className="text-expense">*</span>
            </Form.Label>
            <Form.Select
              {...register("paymentMode")}
              className={`w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.amount ? "border-expense" : "border-border"
              }`}
            >
              <option value="">-No Selection-</option>
              {Object.values(PaymentModes).map((opt) => (
                <option value={opt}>{capitalize(opt)}</option>
              ))}
            </Form.Select>
            {errors.paymentMode && (
              <p className="text-expense text-xs mt-1.5">
                {errors.paymentMode.message}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="transaction.date">
            <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
              Transaction date <span className="text-expense">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="yyyy-mm-dd"
              {...register("date")}
              className={`w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.amount ? "border-expense" : "border-border"
              }`}
            />
          </Form.Group>
          <Form.Group controlId="transaction.description">
            <Form.Label className="block text-text-muted text-xs uppercase tracking-wider mb-1.5">
              Transaction description
            </Form.Label>

            <Form.Control
              type="textarea"
              {...register("description")}
              className={`w-full bg-surface border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary ${
                errors.amount ? "border-expense" : "border-border"
              }`}
            />
          </Form.Group>
        </fieldset>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {updateData?.id
                ? "Updating transaction"
                : "Creating a transaction"}
            </>
          ) : updateData?.id ? (
            "Update transaction"
          ) : (
            "Create a transaction"
          )}
        </Button>
      </Form>
    </>
  );
};
