import Link from "next/link";
import type { JSX, ReactNode } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

export function ListItem({
  title,
  topline,
  description,
  href,
  icon,
  variant = "muted",
}: {
  title: string;
  topline?: ReactNode;
  description?: string;
  href: string;
  icon?: JSX.Element;
  variant?: "muted" | "outline";
}) {
  return (
    <Item
      asChild
      className={cn(
        "hover:bg-primary [a]:hover:bg-primary",
        variant === "outline" && "hover:bg-muted/50 [a]:hover:bg-muted/50"
      )}
      variant={variant}
    >
      <Link href={href}>
        {icon && (
          <ItemMedia
            className="group-hover/item:border-teal-700 group-hover/item:bg-teal-800 group-hover/item:text-primary-foreground"
            variant="icon"
          >
            {icon}
          </ItemMedia>
        )}
        <ItemContent className="truncate">
          {topline && (
            <ItemDescription className="truncate text-nowrap group-hover/item:text-primary-foreground/85">
              {topline}
            </ItemDescription>
          )}
          <ItemTitle className="flow-root w-full truncate text-nowrap group-hover/item:text-primary-foreground">
            {title}
          </ItemTitle>
          {description && (
            <ItemDescription className="truncate text-nowrap group-hover/item:text-primary-foreground/85">
              {description}
            </ItemDescription>
          )}
        </ItemContent>
      </Link>
    </Item>
  );
}
