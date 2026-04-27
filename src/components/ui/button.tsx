import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold tracking-wide transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-800",
        secondary:
          "bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20",
        outline:
          "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white",
        ghost:
          "text-slate-600 hover:text-slate-900",
        accent:
          "bg-orange-600 text-white hover:bg-orange-700 shadow-[0_0_0_0_rgba(234,88,12,0.4)] hover:shadow-[0_0_0_10px_rgba(234,88,12,0)]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-14 px-8 py-3",
        sm: "h-10 px-6 text-xs",
        lg: "h-16 px-12 text-base",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
