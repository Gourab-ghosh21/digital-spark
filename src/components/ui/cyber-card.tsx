import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cyberCardVariants = cva(
  "relative rounded-lg overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: [
          "bg-card border border-border",
          "hover:border-primary/30",
        ],
        glow: [
          "bg-card/80 backdrop-blur-sm border border-primary/20",
          "hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]",
        ],
        threat: [
          "bg-destructive/5 border border-destructive/30",
          "shadow-[0_0_20px_hsl(var(--destructive)/0.1)]",
        ],
        safe: [
          "bg-success/5 border border-success/30",
          "shadow-[0_0_20px_hsl(var(--success)/0.1)]",
        ],
        warning: [
          "bg-warning/5 border border-warning/30",
          "shadow-[0_0_20px_hsl(var(--warning)/0.1)]",
        ],
        glass: [
          "bg-background/40 backdrop-blur-xl border border-white/10",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CyberCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cyberCardVariants> {
  withCorners?: boolean;
  withScanline?: boolean;
}

const CyberCard = React.forwardRef<HTMLDivElement, CyberCardProps>(
  ({ className, variant, withCorners = true, withScanline = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cyberCardVariants({ variant, className }))}
        {...props}
      >
        {/* Corner accents */}
        {withCorners && (
          <>
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
          </>
        )}
        
        {/* Scanline effect */}
        {withScanline && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-x-0 h-20 bg-gradient-to-b from-primary/5 to-transparent animate-scan" />
          </div>
        )}
        
        {children}
      </div>
    );
  }
);
CyberCard.displayName = "CyberCard";

const CyberCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CyberCardHeader.displayName = "CyberCardHeader";

const CyberCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-orbitron text-lg font-semibold uppercase tracking-wider text-primary",
      className
    )}
    {...props}
  />
));
CyberCardTitle.displayName = "CyberCardTitle";

const CyberCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CyberCardDescription.displayName = "CyberCardDescription";

const CyberCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CyberCardContent.displayName = "CyberCardContent";

export {
  CyberCard,
  CyberCardHeader,
  CyberCardTitle,
  CyberCardDescription,
  CyberCardContent,
};
