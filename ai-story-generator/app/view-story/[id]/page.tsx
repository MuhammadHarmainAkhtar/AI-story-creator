"use client"
import { StoryData } from "@/config/schema";
import React  from "react";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";

const viewStory = ({ params }: any) => {
  const [story, setStory] = React.useState<any>();
  React.useEffect(() => {
    console.log(params.id);
    getStory();
  }, []);

  const getStory = async () => {
    const id = params.id;
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.storyId, id));
    console.log(result[0]);
    setStory(result[0]);
  };
  if (!story) return <p>Loading...</p>;
  return (
    <div className="h-screen bg-black text-[#7D40EF]">
      {" "}
      <div className="p-10 md:px-20 lg:px-40">
        <h1>{story?.output?.story_cover?.title}</h1>
      </div>
    </div>
  );
};

export default viewStory;
