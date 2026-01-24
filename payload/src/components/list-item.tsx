import Link from "next/link";
import type { JSX } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export function ListItem({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon?: JSX.Element;
}) {
  return (
    <Item
      asChild
      className="my-5 hover:bg-primary [a]:hover:bg-primary"
      variant="muted"
    >
      <Link href={href}>
        {icon ? (
          <ItemMedia
            className="group-hover/item:border-teal-700 group-hover/item:bg-teal-800 group-hover/item:text-primary-foreground"
            variant="icon"
          >
            {icon}
          </ItemMedia>
        ) : (
          ""
        )}
        <ItemContent className="truncate">
          <ItemTitle className="flow-root w-full truncate text-nowrap group-hover/item:text-primary-foreground">
            {title}
          </ItemTitle>
          <ItemDescription className="truncate text-nowrap group-hover/item:text-primary-foreground/85">
            {description}
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
