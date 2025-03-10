"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-gradient-to-b from-background to-background/50 overflow-hidden">
      <div className="container lg:-mt-10 mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:space-y-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Craft Magical Stories for Kids in Minutes
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl">
              Create fun and personalized stories that bring your child&apos;s
              adventures to life and spark their passion for reading. It takes
              only a few seconds!
            </p>
            <div className="flex flex-wrap gap-3 lg:gap-4">
              <Button
                as={Link}
                href="/create-story"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
              >
                Start Creating
              </Button>
              <Button
                as={Link}
                href="/dashboard"
                size="lg"
                variant="bordered"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
              >
                View Stories
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Instant Stories</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-[min(100vw,50vw)] mx-auto">
              <Image
                src="/hero.png"
                alt="AI Story Creator Hero"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full filter blur-3xl opacity-30 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
