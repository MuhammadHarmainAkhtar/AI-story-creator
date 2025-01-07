"use client";
import React, { useState } from "react";
import StorySubject from "./_components/StorySubject";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/button";

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
  const onHandleUserSelection = (data: fieldData) => {
    console.log(data);
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
    console.log(formData);
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
          <Button className="bg-[#7D40EF] md:text-xl font-semibold p-10 text-2xl">
            Generate Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
