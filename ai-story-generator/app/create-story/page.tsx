"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StorySubject from "./_components/StorySubject";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/button";
import { chatSession } from "@/config/GeminiAi";
import { StoryData } from "@/config/schema";
import { db } from "@/config/db";
import { useUser } from "@clerk/nextjs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
// @ts-expect-error: uuid4 lacks proper type definitions
import uuid4 from "uuid4";
import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/card";

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}

export interface formDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

const CreateStory = () => {
  const [formData, setFormData] = useState<Partial<formDataType>>({});
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prev) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
  };

  const generateStory = async () => {
    if (!formData?.storySubject || !formData?.storyType || !formData?.ageGroup || !formData?.imageStyle) {
      notifyError("Please fill in all fields");
      return;
    }

    setLoading(true);
    const newPrompt = CREATE_STORY_PROMPT?.replace(
      "{ageGroup}",
      formData.ageGroup
    )
      .replace("{storyType}", formData.storyType)
      .replace("{storySubject}", formData.storySubject)
      .replace("{imageStyle}", formData.imageStyle);

    if (!newPrompt) {
      notifyError("Failed to generate prompt");
      setLoading(false);
      return;
    }

    try {
      const result = await chatSession.sendMessage(newPrompt);
      const savedStory = await saveInDb(result?.response.text());
      if (savedStory?.[0]?.storyId) {
        notify("Story Generated Successfully!");
        router.push(`/view-story/${savedStory[0].storyId}`);
      }
    } catch (error) {
      console.error(error);
      notifyError("Failed to generate story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveInDb = async (output: string) => {
    const storyId = uuid4();
    try {
      return await db
        .insert(StoryData)
        .values({
          storyId: storyId,
          ageGroup: formData.ageGroup,
          imageStyle: formData.imageStyle,
          storySubject: formData.storySubject,
          storyType: formData.storyType,
          output: JSON.parse(output),
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userImage: user?.imageUrl,
          userName: user?.fullName,
          createdAt: new Date(),
        })
        .returning({ storyId: StoryData?.storyId });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="bottom-right" theme="dark" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text">
            Create Your Story
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock your creativity with AI: Craft stories like never before! Let
            our AI bring your imagination to life, one story at a time.
          </p>
        </div>

        <Card className="glass">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StorySubject userSelection={onHandleUserSelection} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <StoryType userSelection={onHandleUserSelection} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <AgeGroup userSelection={onHandleUserSelection} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ImageStyle userSelection={onHandleUserSelection} />
              </motion.div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                size="lg"
                isDisabled={loading}
                onClick={generateStory}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8"
              >
                {loading ? (
                  <div className="loading-spinner" />
                ) : (
                  "Generate Story"
                )}
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateStory;
