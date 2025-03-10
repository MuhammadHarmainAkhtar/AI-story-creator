"use client";
import { StoryData } from "@/config/schema";
import React, { useEffect, useState, useRef } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";
import { useParams } from "next/navigation";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";
import Link from "next/link";

interface ChapterContent {
  chapters: Array<{
    chapter_title: string;
    story_text?: string;
    story?: string;
    chapter_text?: string;
    storyText?: string;
    content?: string;
    moral?: string;
  }>;
}

interface Story {
  id: number;
  storyId: string | null;
  storySubject: string | null;
  storyType: string | null;
  ageGroup: string | null;
  imageStyle: string | null;
  output: ChapterContent[] | string | null;
  coverImage: string | null;
  userEmail: string | null;
  userName: string | null;
  userImage: string | null;
}

interface PageFlip {
  pageFlip: () => {
    flipPrev: () => void;
    flipNext: () => void;
  };
}

interface StoryPage {
  type: "chapter" | "content";
  chapterNumber?: number;
  chapterTitle?: string;
  content: string[];
}

function ViewStory() {
  const params = useParams();
  const id = params.id as string;
  const [story, setStory] = useState<Story | null>(null);
  const [storyPages, setStoryPages] = useState<StoryPage[]>([]);
  console.log("StoryPages", storyPages);
  const bookRef = useRef<PageFlip | null>(null);

  useEffect(() => {
    if (!id) return;

    const getStory = async () => {
      try {
        const result = await db
          .select()
          .from(StoryData)
          .where(eq(StoryData.storyId, id));

        console.log("Raw DB Result:", result);

        if (result[0]) {
          const storyData = result[0] as Story;
          console.log("Story Data:", storyData);
          setStory(storyData);

          if (storyData.output) {
            let storyContent: ChapterContent[] = [];

            console.log("Raw output:", storyData.output);

            if (typeof storyData.output === "string") {
              try {
                storyContent = JSON.parse(storyData.output);
                console.log("Parsed content structure:", {
                  isArray: Array.isArray(storyContent),
                  length: storyContent?.length,
                  firstItem: storyContent?.[0],
                  hasChapters: storyContent?.[0]?.chapters,
                  chaptersLength: storyContent?.[0]?.chapters?.length
                });
              } catch (error) {
                console.error("Failed to parse story output:", error);
                return;
              }
            } else {
              storyContent = storyData.output as ChapterContent[];
              console.log("Non-string output structure:", {
                isArray: Array.isArray(storyContent),
                length: storyContent?.length,
                firstItem: storyContent?.[0],
                hasChapters: storyContent?.[0]?.chapters,
                chaptersLength: storyContent?.[0]?.chapters?.length
              });
            }

            const formattedPages: StoryPage[] = [];

            // Process each chapter
            if (Array.isArray(storyContent)) {
              let globalChapterIndex = 0;
              storyContent.forEach((story) => {
                // Get all chapters, regardless of structure
                const chapters = story.chapters || [story];
                
                chapters.forEach((chapter) => {
                  // Find the first string value that's not chapter_title or moral
                  const storyText = Object.entries(chapter).reduce((text, [key, value]) => {
                    if (['chapter_title', 'moral', 'image_prompt', 'imagePrompt', 'prompt'].includes(key)) return text;
                    if (typeof value === 'string' && value.trim().length > 0) {
                      // Filter out any content that looks like an image prompt
                      const cleanText = value
                        .split('\n')
                        .filter(line => {
                          const lowerLine = line.toLowerCase();
                          return !lowerLine.includes('image prompt') && 
                                 !lowerLine.includes('prompt:') && 
                                 !lowerLine.includes('generate an image') &&
                                 !lowerLine.includes('create an image') &&
                                 !lowerLine.includes('illustration:') &&
                                 !lowerLine.includes('image:');
                        })
                        .join('\n')
                        .trim();
                      
                      return cleanText || text;
                    }
                    return text;
                  }, '');
                  
                  formattedPages.push({
                    type: "chapter",
                    chapterNumber: globalChapterIndex + 1,
                    chapterTitle: chapter.chapter_title || `Chapter ${globalChapterIndex + 1}`,
                    content: [storyText],
                  });

                  // Split chapter text into paragraphs
                  if (storyText) {
                    const paragraphs = storyText
                      .split(/\n+/)
                      .map((p: string) => p.trim())
                      .filter((p: string) => p.length > 0);

                    // Group paragraphs into content pages
                    let currentPage: string[] = [];
                    paragraphs.forEach((paragraph: string) => {
                      if (
                        currentPage.length >= 2 ||
                        currentPage.join("\n").length > 600
                      ) {
                        formattedPages.push({
                          type: "content",
                          content: currentPage,
                        });
                        currentPage = [paragraph];
                      } else {
                        currentPage.push(paragraph);
                      }
                    });

                    // Add remaining paragraphs as last page if any
                    if (currentPage.length > 0) {
                      formattedPages.push({
                        type: "content",
                        content: currentPage,
                      });
                    }
                  }
                  globalChapterIndex++;
                });
              });

              console.log("Final formatted pages:", formattedPages);
              setStoryPages(formattedPages);
            } else {
              console.error("Story content is not an array:", storyContent);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch story:", error);
      }
    };

    getStory();
  }, [id]);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="loading-spinner" />
          <p className="text-gray-400">Loading your magical story...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-4 sm:py-8 px-2 sm:px-4"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-12">
        <Link href="/dashboard">
          <Button
            className="mb-4 sm:mb-8 bg-primary/10 text-primary hover:bg-primary/20"
            startContent={<FaArrowLeft />}
            size="sm"
          >
            Back to Dashboard
          </Button>
        </Link>
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
            {story.storySubject}
          </h1>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <span className="text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-primary/10 text-primary">
              {story.storyType}
            </span>
            <span className="text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-primary/10 text-primary">
              Age: {story.ageGroup}
            </span>
          </div>
        </div>
      </div>

      {/* Book Section */}
      <div className="max-w-5xl mx-auto">
        <Card className="glass p-2 sm:p-4 md:p-8">
          <div className="flex flex-col items-center gap-6">
            <div
              className="w-full max-w-3xl mx-auto"
              style={{ height: window.innerWidth < 640 ? "380px" : "500px" }}
            >
              <HTMLFlipBook
                width={window.innerWidth < 640 ? 280 : 400}
                height={window.innerWidth < 640 ? 380 : 500}
                size="stretch"
                minWidth={250}
                maxWidth={500}
                minHeight={300}
                maxHeight={600}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                className="book-render"
                ref={bookRef}
                style={{ background: "none" }}
                startPage={0}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={true}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {/* Cover Page */}
                <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-4 sm:p-8 rounded-lg shadow-xl h-full">
                  <div className="absolute inset-0 bg-black/20 rounded-lg" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <FaBookOpen className="text-4xl sm:text-6xl text-white/80" />
                    <div>
                      <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
                        {story.storySubject}
                      </h2>
                      <p className="text-sm sm:text-base text-white/80">
                        A magical story for {story.ageGroup}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Story Pages */}
                {storyPages.map((page, index) => (
                  <div
                    key={index}
                    className="bg-white/95 p-3 sm:p-8 rounded-lg shadow-xl overflow-y-auto h-full"
                  >
                    {page.type === "chapter" ? (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-2 sm:mb-4">
                          Chapter {page.chapterNumber}
                        </h2>
                        <h3 className="text-xl sm:text-2xl text-gray-700 italic">
                          {page.chapterTitle}
                        </h3>
                      </div>
                    ) : (
                      <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-primary prose-p:text-gray-700 h-full overflow-y-auto">
                        {page.content.map((paragraph: string, i: number) => (
                          <p
                            key={i}
                            className="text-black mb-3 sm:mb-6 leading-relaxed text-sm sm:text-base"
                          >
                            {paragraph}
                          </p>
                        ))}
                        <div className="text-right text-gray-400 mt-4 sm:mt-8 text-sm">
                          Page {index}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4 mt-4">
              <Button
                className="bg-primary/10 text-primary hover:bg-primary/20"
                onClick={() => bookRef.current?.pageFlip().flipPrev()}
                size="lg"
              >
                Previous
              </Button>
              <Button
                className="bg-primary text-white"
                onClick={() => bookRef.current?.pageFlip().flipNext()}
                size="lg"
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

export default ViewStory;
