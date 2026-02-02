import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cyberButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-orbitron font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary/10 text-primary border border-primary/50",
          "hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]",
          "active:scale-95",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground border border-border",
          "hover:bg-secondary/80 hover:border-primary/30",
        ],
        threat: [
          "bg-destructive/10 text-destructive border border-destructive/50",
          "hover:bg-destructive/20 hover:border-destructive hover:shadow-[0_0_30px_hsl(var(--destructive)/0.4)]",
        ],
        safe: [
          "bg-success/10 text-success border border-success/50",
          "hover:bg-success/20 hover:border-success hover:shadow-[0_0_30px_hsl(var(--success)/0.4)]",
        ],
        ghost: [
          "bg-transparent text-foreground border border-transparent",
          "hover:bg-muted hover:border-border",
        ],
        glow: [
          "bg-gradient-to-r from-primary/20 to-accent/20 text-foreground border border-primary/30",
          "hover:from-primary/30 hover:to-accent/30 hover:border-primary/50",
          "hover:shadow-[0_0_40px_hsl(var(--primary)/0.3),0_0_60px_hsl(var(--accent)/0.2)]",
        ],
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {
  loading?: boolean;
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(cyberButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-current opacity-60" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-current opacity-60" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-current opacity-60" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-current opacity-60" />
        
        {/* Loading state */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        
        <span className={cn("relative z-10", loading && "invisible")}>
          {children}
        </span>
      </button>
    );
  }
);
CyberButton.displayName = "CyberButton";

export { CyberButton, cyberButtonVariants };
