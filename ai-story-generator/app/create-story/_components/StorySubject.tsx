import React from "react";
import {Textarea} from "@nextui-org/input"
import { UserSelectionProps } from "@/app/types";

const StorySubject = ({ userSelection }: UserSelectionProps) => {
  return (
    <div>
      <label className="text-4xl font-bold" htmlFor="">1. Subject of the story</label>
      <Textarea placeholder="Write the subject of the story which you want to generate." 
      size="lg"
      classNames={{
        input: "resize-y min-h-[230px] text-2xl p-5"
      }}
      className="mt-5 max-w-lg"
      onChange={(e)=>userSelection({
        fieldValue: e.target.value,
        fieldName: "storySubject"
      })}
      />
    </div>
  );
};

export default StorySubject;
