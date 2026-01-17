import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Logo from "./logo";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-primary p-3 px-40 text-primary-foreground">
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
      <div className="w-10">
        <Logo />
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
            className="font-medium tracking-wide hover:bg-teal-800"
            href="/companies"
          >
            Firmen
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="font-medium tracking-wide hover:bg-teal-800"
            href="/persons"
          >
            Personen
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
