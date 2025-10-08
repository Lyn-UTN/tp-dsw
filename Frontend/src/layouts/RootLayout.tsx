//esto lo hice para que el header y los margenes se apliquen a todas las paginas
import { Outlet, Link } from "react-router-dom"; //se puede usar navLink pero estoy acostumbrado a href
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

//import { Globe, Menu, UserRound } from "lucide-react";

import logo from "@/assets/logo.png";

function RootLayout() {
  return (
    <>
      <header>
        <NavigationMenu
          viewport={false}
          className="bg-blue-700 max-w-full w-full justify-start pt-1 pb-1"
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Airbng</NavigationMenuTrigger>
              <Link to="/" className="mx-4 font-extrabold">
                Airbng
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-black-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 text-sm text-black-200">
          © {new Date().getFullYear()} Airbng
        </div>
      </footer>
    </>
  );
}

export default RootLayout;
