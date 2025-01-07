"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const NavBar = () => {
  const NavItems = [
    { name: "Home", path: "/" },
    { name: "Create Story", path: "/create-story" },
    { name: "Explore Stories", path: "/explore-stories" },
    { name: "Contact Us", path: "/contact-us" },
  ];
  const {user, isSignedIn} = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar maxWidth="full" className="p-4 shadow-lg shadow-[#7D40EF] bg-black" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          className={`sm:hidden ${isMenuOpen ? "text-white" : "text-[#7D40EF]"}`} // Conditional color change
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <Image src={"/NavbarLogo.svg"} alt="Logo" width={50} height={50} />
          <h1 className="font-bold text-3xl text-[#7D40EF] ml-3">Fictional Kid's Stories</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="gap-8 text-[#7D40EF] hidden sm:flex" justify="center">
        {NavItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link className="hover:underline text-2xl" href={item.path}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <Link href={'/dashboard'}><Button className="bg-[#7D40EF] font-bold">
          {isSignedIn?"Dashboard":"Get Started"}
          </Button></Link>
          <UserButton/>
      </NavbarContent>

      <NavbarMenu className="mt-10">
        {NavItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link href={item.path}>{item.name}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
