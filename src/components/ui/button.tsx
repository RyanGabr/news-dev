import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "cursor-pointer flex items-center justify-center gap-1 font-medium transition disabled:opacity-50 disabled:cursor-default",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:opacity-90",
        secondary:
          "bg-secondary-foreground text-foreground hover:bg-foreground/6 dark:hover:bg-foreground/10",
        outline: "bg-transparent border border-border",
        ghost: "hover:bg-secondary-foreground font-normal",
        link: "hover:underline font-normal text-muted-foreground",
      },
      size: {
        default: "text-base px-4 py-2",
        sm: "text-sm px-3 py-2",
        link: "p-0 text-sm",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          buttonVariants({ variant, size, rounded, className }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
