import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function DescriptionList({ className, ...props }: ComponentProps<"dl">) {
  return (
    <dl className={cn("devide-y devide-white/10", className)} {...props} />
  );
}

export function DescriptionListRow({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("px-4 py-6 sm:gap-4 sm:px-0", className)} {...props} />
  );
}

export function DescriptionTerm({ className, ...props }: ComponentProps<"dt">) {
  return <dt className={cn("font-medium text-sm", className)} {...props} />;
}

export function DescriptionElement({
  className,
  ...props
}: ComponentProps<"dd">) {
  return (
    <dd
      className={cn("mt-1 text-muted-foreground text-sm sm:mt-0", className)}
      {...props}
    />
  );
}
