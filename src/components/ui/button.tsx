import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "cursor-pointer flex items-center justify-center gap-1 rounded-full font-semibold transition disabled:opacity-50 disabled:cursor-default",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:opacity-90",
        secondary: "bg-foreground/5 text-foreground hover:bg-foreground/8",
        outline: "bg-transparent border border-border",
      },
      size: {
        default: "text-base px-4.5 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
