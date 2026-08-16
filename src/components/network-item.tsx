import Link from "next/link";
import type { JSX } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

export function NetworkItem({
  variant,
  title,
  description,
  href,
  icon,
}: {
  variant: "parent" | "current" | "former";
  title: string | number;
  description?: string;
  href?: string;
  icon: JSX.Element;
}) {
  return (
    <Item
      className={cn(
        "hover:bg-primary [a]:hover:bg-primary",
        variant === "parent" && "bg-primary",
        variant === "former" && "hover:bg-muted/50 [a]:hover:bg-muted/50"
      )}
      render={
        <Link href={href || "#"}>
          <ItemMedia
            className={cn(
              variant === "current" &&
                "group-hover/item:text-primary-foreground",
              variant === "parent" && "text-primary-foreground",
              variant === "former" && "text-muted-foreground"
            )}
            variant="icon"
          >
            {icon}
          </ItemMedia>
          <ItemContent
            className={cn("truncate", variant === "former" && "italic")}
          >
            <ItemTitle
              className={cn(
                "flow-root w-full truncate text-nowrap",
                variant === "current" &&
                  "group-hover/item:text-primary-foreground",
                variant === "parent" && "text-primary-foreground",
                variant === "former" && "text-muted-foreground"
              )}
            >
              {title}
            </ItemTitle>
            {description && (
              <ItemDescription
                className={cn(
                  "truncate text-nowrap",
                  variant === "current" &&
                    "group-hover/item:text-primary-foreground/85"
                )}
              >
                {description}
              </ItemDescription>
            )}
          </ItemContent>
        </Link>
      }
      variant={variant === "former" ? "outline" : "muted"}
    />
  );
}
