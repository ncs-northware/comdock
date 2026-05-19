import { ScaleIcon } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-primary px-10 py-3 text-primary-foreground lg:px-20 xl:px-40">
      <Branding />
      <Navigation />
      <ThemeToggle />
    </header>
  );
}

function Branding() {
  return (
    <Link
      className="flex flex-row items-center gap-2 font-bold text-2xl"
      href="/"
    >
      <div className="flex size-9 items-center justify-center rounded-sm border bg-teal-800">
        <ScaleIcon />
      </div>
      COMDOCK
    </Link>
  );
}

function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="font-medium tracking-wide hover:bg-teal-800 focus:bg-teal-800"
            href="/companies"
          >
            Firmen
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="font-medium tracking-wide hover:bg-teal-800 focus:bg-teal-800"
            href="/persons"
          >
            Personen
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
