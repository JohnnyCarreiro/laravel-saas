import { cn } from "@/lib/utils";
import type React from "react";

type WrapperProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("pt-12", className)} {...props}>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-gray-100 text-gray-800 shadow-sm sm:rounded-lg dark:bg-gray-800 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};
