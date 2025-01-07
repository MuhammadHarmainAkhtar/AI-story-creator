"use client";
import React, { useState, useEffect } from "react";
import StorySubject from "./_components/StorySubject";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/button";
import { chatSession } from "@/config/GeminiAi";
import { StoryData } from "@/config/schema";
import { db } from "@/config/db";
//@ts-ignore
import uuid4 from "uuid4";
import CustomLoader from "./_components/CustomLoader";

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
  const [formData, setFormData] = useState<formDataType>();
  const [finalPrompt, setFinalPrompt] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onHandleUserSelection = (data: fieldData) => {
    console.log(data);
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
    console.log(formData);
  };

  const generateStory = async () => {
    setLoading(true);
    const newPrompt = CREATE_STORY_PROMPT?.replace(
      "{ageGroup}",
      formData?.ageGroup ?? ""
    )
      .replace("{storyType}", formData?.storyType ?? "")
      .replace("{storySubject}", formData?.storySubject ?? "")
      .replace("{imageStyle}", formData?.imageStyle ?? "");
    setFinalPrompt(newPrompt ?? "");
    try {
      const result = await chatSession.sendMessage(newPrompt);
      console.log(result?.response.text());
      const resp = await saveInDb(result?.response.text());
      console.log(resp);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const saveInDb = async (output: string) => {
    const storyId = uuid4();
    setLoading(true);
    try {
      const result = await db
        .insert(StoryData)
        .values({
          storyId: storyId,
          ageGroup: formData?.ageGroup,
          imageStyle: formData?.imageStyle,
          storySubject: formData?.storySubject,
          storyType: formData?.storyType,
          output: JSON.parse(output),
        })
        .returning({ storyId: StoryData?.storyId });
      setLoading(false);
      return result;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black text-[#7D40EF] ">
      <div className="p-10 md:px-20 lg:px-40">
        <h1 className="font-extrabold text-[70px] text-center ">
          CREATE YOUR STORY
        </h1>
        <p className="text-2xl text-center">
          Unlock your creativity with AI: Craft stories like never before! Let
          our AI bring your imagination to life, one story at a time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14 text-inherit">
          {/* STORY SUBJECT  */}
          <StorySubject userSelection={onHandleUserSelection} />

          {/* STORY TYPE  */}
          <StoryType userSelection={onHandleUserSelection} />

          {/* AGE GROUP  */}
          <AgeGroup userSelection={onHandleUserSelection} />

          {/* IMAGE STYLE */}
          <ImageStyle userSelection={onHandleUserSelection} />
        </div>
        <div className="flex justify-end">
          <Button
            disabled={loading}
            onClick={generateStory}
            className="bg-[#7D40EF] md:text-xl font-semibold p-10 text-2xl"
          >
            Generate Story
          </Button>
          <CustomLoader loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
