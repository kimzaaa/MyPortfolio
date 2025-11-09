import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "icon";
  className?: string;
};

const base = "inline-flex items-center justify-center rounded-xl font-semibold transition";
const variants: Record<string, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
  outline: "border border-gray-300 hover:bg-gray-50 dark:border-white/20 dark:hover:bg-white/10",
  ghost: "hover:bg-gray-100 dark:hover:bg-white/10",
};
const sizes: Record<string, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4",
  icon: "h-10 w-10",
};

export function Button({ variant="default", size="md", className="", ...props }: Props) {
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
