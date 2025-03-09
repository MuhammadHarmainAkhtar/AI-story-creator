import Image from "next/image";
import React, { useState } from "react";
import { optionField } from "./StoryType";
import { UserSelectionProps } from "@/app/types";

const AgeGroup = ({ userSelection }: UserSelectionProps) => {
  const optionList = [
    {
      label: "0-2 Years",
      imageURL: "/02Years.png",
      isFree: true,
    },
    {
      label: "3-5 Years",
      imageURL: "/35Years.png",
      isFree: true,
    },
    {
      label: "5-8 Years",
      imageURL: "/58Years.png",
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();
  const onUserSelect = (item: optionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "ageGroup",
    });
  };
  return (
    <div>
      <label className="text-4xl font-bold" htmlFor="">
        3. Age Group
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

export default AgeGroup;
