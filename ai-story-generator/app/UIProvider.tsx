import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./_components/NavBar";

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <NextUIProvider>
        <Navbar />
        {children}
      </NextUIProvider>
    </ClerkProvider>
  );
};

export default UIProvider;
