import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "./_components/NavBar";

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <NextUIProvider>
        <NavBar/>
        {children}
        </NextUIProvider>
    </ClerkProvider>
  );
};

export default UIProvider;
