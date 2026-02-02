import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface CyberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-orbitron uppercase tracking-wider text-muted-foreground">
            {label}
          </label>
        )}
        <div className="relative group">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity blur-xl" />
          
          <div className="relative flex items-center">
            {icon && (
              <span className="absolute left-4 text-muted-foreground group-focus-within:text-primary transition-colors">
                {icon}
              </span>
            )}
            
            <input
              type={isPassword && showPassword ? "text" : type}
              className={cn(
                "w-full h-12 px-4 bg-muted/50 border border-border rounded-lg font-mono text-foreground",
                "placeholder:text-muted-foreground/50",
                "focus:outline-none focus:border-primary/50 focus:bg-muted/70",
                "focus:shadow-[0_0_20px_hsl(var(--primary)/0.15),inset_0_0_20px_hsl(var(--primary)/0.05)]",
                "transition-all duration-300",
                icon && "pl-12",
                isPassword && "pr-12",
                error && "border-destructive/50 focus:border-destructive",
                className
              )}
              ref={ref}
              {...props}
            />
            
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
          
          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/30 group-focus-within:border-primary/60 transition-colors" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/30 group-focus-within:border-primary/60 transition-colors" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/30 group-focus-within:border-primary/60 transition-colors" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/30 group-focus-within:border-primary/60 transition-colors" />
        </div>
        
        {error && (
          <p className="text-xs text-destructive font-mono">{error}</p>
        )}
      </div>
    );
  }
);
CyberInput.displayName = "CyberInput";

export { CyberInput };
