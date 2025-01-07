"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="px-10 md:px-28 lg:px-44">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="mt-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[70px] text-[#7D40EF] py-20 font-extrabold">
            Craft Magical Stories for kids in Minutes
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#7D40EF] font-light">
            Create fun and personalized stories that brings your child's
            adventures to life and spark their passion for reading. It takes
            only a few seconds!
          </p>
          {/* Use Next.js Link for navigation */}
          <Link href="/create-story" passHref>
            <Button
              size="lg"
              className="mt-5 bg-[#7D40EF] text-lg md:text-xl font-semibold"
            >
              Create Story!
            </Button>
          </Link>
        </div>
        <div className="flex justify-center mt-10">
          <Image
            src="/hero.png"
            alt="LandingPage"
            width={700}
            height={700}
            className="w-full h-auto md:w-[700px] lg:w-[800px]"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
