"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { eq } from "drizzle-orm";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaBookOpen, FaPlus, FaMagic, FaClock } from "react-icons/fa";

function formatDate(date) {
  if (!date) return "";
  const now = new Date();
  const storyDate = new Date(date);
  const diffTime = Math.abs(now - storyDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return storyDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Dashboard() {
  const { user } = useUser();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        if (user?.primaryEmailAddress?.emailAddress) {
          const result = await db
            .select()
            .from(StoryData)
            .where(
              eq(StoryData.userEmail, user.primaryEmailAddress.emailAddress)
            );
          setStories(result);
        }
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    if (user) {
      fetchStories();
    } else {
      setLoading(false);
      setInitialized(true);
    }
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="relative w-20 h-20">
            <div
              className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin"
              style={{ borderTopColor: "var(--primary)" }}
            />
            <FaMagic className="absolute inset-0 m-auto text-4xl text-primary/50" />
          </div>
          <p className="text-gray-400 text-lg">
            Summoning your magical stories...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center sm:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-2"
              variants={itemVariants}
            >
              Your Magical Collection
            </motion.h1>
            <motion.p className="text-gray-400 text-lg" variants={itemVariants}>
              {stories.length > 0
                ? `You have created ${stories.length} wonderful ${
                    stories.length === 1 ? "story" : "stories"
                  }`
                : "Begin your storytelling journey today"}
            </motion.p>
          </div>
          <motion.div variants={itemVariants}>
            <Button
              as={Link}
              href="/create-story"
              size="lg"
              startContent={<FaPlus />}
              className="bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              Create New Story
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {stories.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass border border-white/10 shadow-2xl backdrop-blur-xl">
                <div className="p-12 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-500 opacity-20 animate-pulse" />
                    <FaBookOpen className="absolute inset-0 m-auto text-6xl text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
                    Start Your Story Collection
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                    Transform your imagination into magical stories that will
                    captivate young minds. Create your first story and begin
                    building your collection today.
                  </p>
                  <Button
                    as={Link}
                    href="/create-story"
                    size="lg"
                    startContent={<FaMagic />}
                    className="bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    Begin Your Journey
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stories.map((story, index) => (
                <motion.div key={story.storyId} variants={itemVariants} layout>
                  <Link href={`/view-story/${story.storyId}`}>
                    <Card className="group relative overflow-hidden backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold text-black group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3">
                              {story.storySubject}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                                {story.storyType}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20">
                                Age: {story.ageGroup}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <FaClock className="text-primary/50" />
                              <span>{formatDate(story.createdAt)}</span>
                            </div>
                          </div>
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 animate-pulse group-hover:from-primary/30 group-hover:to-purple-500/30" />
                            <FaBookOpen className="absolute inset-0 m-auto text-2xl text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
