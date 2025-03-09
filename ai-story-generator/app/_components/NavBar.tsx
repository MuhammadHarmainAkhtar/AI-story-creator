"use client";
import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { useUser, UserButton } from "@clerk/nextjs";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  href: string;
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "Home", href: "/" },
    { name: "Create Story", href: "/create-story" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <NextUINavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-background/70 backdrop-blur-lg border-b border-white/10"
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent className="basis-1/5" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <motion.p 
              className="font-bold text-xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AI Story Creator
            </motion.p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-3/5 hidden sm:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name} className="relative">
            <NextLink
              className={`px-4 py-2 rounded-full transition-all duration-300 relative group ${
                isActive(item.href)
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
              href={item.href}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive(item.href) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="basis-1/5 hidden sm:flex" justify="end">
        <NavbarItem className="flex gap-2">
          {!isSignedIn ? (
            <Button
              as={NextLink}
              className="bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg hover:shadow-primary/50 transition-all duration-300"
              href="/sign-in"
              variant="flat"
            >
              Sign In
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <motion.p 
                className="text-foreground/60"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Welcome, {user?.firstName || 'User'}
              </motion.p>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-purple-500 opacity-75 blur group-hover:opacity-100 transition duration-300" />
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 relative z-10"
                    }
                  }}
                />
              </div>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu className="pt-6 backdrop-blur-xl bg-background/90">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <NextLink
              className={`w-full py-3 px-4 rounded-lg transition-all duration-300 relative group ${
                isActive(item.href)
                  ? "text-primary bg-primary/10"
                  : "text-foreground/60 hover:text-foreground hover:bg-foreground/10"
              }`}
              href={item.href}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive(item.href) && (
                <motion.div
                  layoutId="mobile-navbar-indicator"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </NextLink>
          </NavbarMenuItem>
        ))}
        {!isSignedIn && (
          <NavbarMenuItem>
            <Button
              as={NextLink}
              className="bg-gradient-to-r from-primary to-purple-500 text-white w-full mt-4 shadow-lg hover:shadow-primary/50 transition-all duration-300"
              href="/sign-in"
              variant="flat"
              size="lg"
            >
              Sign In
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
}
