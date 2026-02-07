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
  title: string;
  description?: string;
  href?: string;
  icon: JSX.Element;
}) {
  return (
    <Item
      asChild
      className={cn(
        "my-5 hover:bg-primary [a]:hover:bg-primary",
        variant === "parent" && "bg-primary",
        variant === "former" && "hover:bg-muted/50 [a]:hover:bg-muted/50"
      )}
      variant={variant === "former" ? "outline" : "muted"}
    >
      <Link href={href || "#"}>
        {icon ? (
          <ItemMedia
            className={cn(
              variant === "current" &&
                "group-hover/item:border-teal-700 group-hover/item:bg-teal-800 group-hover/item:text-primary-foreground",
              variant === "parent" &&
                "border-teal-700 bg-teal-800 text-primary-foreground"
            )}
            variant="icon"
          >
            {icon}
          </ItemMedia>
        ) : (
          ""
        )}
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
    </Item>
  );
}
