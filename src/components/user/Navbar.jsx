import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavbarMenu() {

  const [open, setOpen] = useState(false);

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Transactions", path: "/dashboard#transactions" },
    { title: "Dashboard", path: "/dashboard#overview" },
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.title}
          asChild
          variant="ghost"
          className={
            mobile
              ? "w-full justify-start text-base rounded-full text-gray-700 hover:bg-gray-100"
              : "font-semibold text-sm rounded-full px-4 hover:bg-[#66B12D] hover:text-primary-foreground"
          }
          onClick={() => setOpen(false)}
        >
          <Link to={item.path}>{item.title}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <header>
        <nav className="flex h-14 items-center gap-4 px-4 border rounded-full bg-white shadow-md backdrop-blur-sm bg-opacity-80">
          {/* Logo */}
          <a href="#" className="inline-flex items-center gap-2">
            <img
              src="/images/logo.png"
              className="w-8 h-8 rounded-full"
              alt="logo"
            />
            <h3 className="text-xl font-medium relative">WalletWiz
             <span className="inline-block w-1.5 h-1.5 bg-lime-600 rounded-full ml-0.5"></span>
             </h3>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-1 flex-1 justify-center">
            <NavLinks />
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex justify-end">
            <Button 
            asChild
              className="rounded-full bg-black text-white px-5 hover:bg-gray-800">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="ml-auto lg:hidden">
              <Button
                variant="outline"
                size="icon"
                aria-label="Open Menu"
                className="rounded-full"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[75%] max-w-sm flex-col px-6 py-6"
            >
              <SheetTitle>
                <a href="#" className="inline-flex items-center gap-2">
                  <img
                    src="/images/logo.png"
                    className="w-7 h-7 rounded-full"
                    alt="logo"
                  />
                </a>
              </SheetTitle>

              <div className="mt-6 flex flex-col gap-2">
                <NavLinks mobile />
                <Button
                asChild
                className="rounded-full bg-black text-white mt-4 hover:bg-gray-800"
                onClick={() => setOpen(false)}
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </div>
  );
}
