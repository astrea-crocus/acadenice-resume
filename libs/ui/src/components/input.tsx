import { cn } from "@reactive-resume/utils";
import { forwardRef } from "react";

export type InputProps = {
  hasError?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError = false, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      autoComplete="off"
      className={cn(
        "flex h-9 w-full rounded border px-3 py-0.5 !text-sm ring-0 ring-offset-transparent transition-colors [appearance:textfield] placeholder:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",

        "border-acade-secondary-200 bg-background dark:border-acade-secondary-800",

        "hover:bg-gradient-to-b hover:from-acade-secondary-200/20 hover:to-acade-secondary-200/20",
        "dark:hover:from-acade-secondary-800/20 dark:hover:to-acade-secondary-800/20",

        "focus:border-acade-secondary-500 focus:bg-gradient-to-b focus:from-acade-secondary-200/10 focus:to-acade-secondary-200/10 focus-visible:outline-none focus-visible:ring-0",
        "dark:focus:from-acade-secondary-800/10 dark:focus:to-acade-secondary-800/10",

        "file:border-0 file:pt-1 file:text-sm file:font-medium",
        hasError ? "border-error" : "border-acade-secondary-200 dark:border-acade-secondary-800",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
