"use client";
import Image from "next/image";
import React, { useState } from "react";

export interface optionField {
  label: string;
  imageURL: string;
  isFree: boolean;
}
const StoryType = ({userSelection}:any) => {
  const optionList = [
    {
      label: "Story book",
      imageURL: "/story.png",
      isFree: true,
    },
    {
      label: "Bed book",
      imageURL: "/bedstory.png",
      isFree: true,
    },
    {
      label: "Educational book",
      imageURL: "/educational.png",
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();
  const onUserSelect = (item: optionField) => {
    setSelectedOption(item.label);
    userSelection({
        fieldValue: item?.label,
        fieldName: "storyType"
    })
  };
  return (
    <div>
      <label className="text-4xl font-bold" htmlFor="">
        2. Story Type
      </label>
      <div className="grid grid-cols-3 gap-5 mt-3 cursor-pointer p-1">
        {optionList.map((item, index) => (
          <div
            key={index}
            className={`relative grayscale hover:grayscale-0 ${
              selectedOption === item.label
                ? "grayscale-0 border-2 rounded-3xl border-[#7D40EF]"
                : "grayscale"
            }`}
            onClick={() => onUserSelect(item)}
          >
            <h1 className="absolute bottom-5 text-white text-center w-full text-2xl">
              {item.label}
            </h1>
            <Image
              src={item.imageURL}
              alt={item.label}
              width={300}
              height={500}
              className="object-cover h-[260px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryType;
