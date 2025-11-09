import React from "react";
type Props = React.HTMLAttributes<HTMLSpanElement> & { variant?: "secondary" | "outline" };
export function Badge({ variant="secondary", className="", ...props }: Props) {
  const styles = variant === "outline"
    ? "border border-black/10 dark:border-white/20 text-gray-800 dark:text-white"
    : "bg-gray-200 text-gray-900 dark:bg-white/10 dark:text-white";
  return <span className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-medium ${styles} ${className}`} {...props} />;
}
