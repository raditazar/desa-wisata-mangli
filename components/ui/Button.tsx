import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const variantStyles = {
  primary: "bg-[#1a2517] text-white hover:bg-[#243420]",
  secondary: "bg-[#acc8a2] text-[#1a2517] hover:bg-[#96b88a]",
  outline: "border-2 border-[#1a2517] text-[#1a2517] hover:bg-[#1a2517] hover:text-white",
};

const sizeStyles = {
  sm: "h-10 px-6 text-sm",
  md: "h-12 px-8 text-base",
  lg: "h-16 px-10 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  onClick,
  disabled = false,
  className,
  type = "button",
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-full font-semibold font-sans transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
