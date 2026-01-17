import { BuildingIcon } from "lucide-react";
import Link from "next/link";
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
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Item
      asChild
      className="hover:bg-primary [a]:hover:bg-primary"
      variant="muted"
    >
      <Link href={href}>
        <ItemMedia
          className="group-hover/item:border-teal-700 group-hover/item:bg-teal-800 group-hover/item:text-primary-foreground"
          variant="icon"
        >
          <BuildingIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="group-hover/item:text-primary-foreground">
            {title}
          </ItemTitle>
          <ItemDescription className="group-hover/item:text-primary-foreground/85">
            {description}
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
