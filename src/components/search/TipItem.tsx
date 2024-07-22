"use client";

import React from "react";

interface Props {
  img: string;
  title: string;
}

export default function TipItem(props: Props) {
  const { img, title } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-[12px]">
      <div className="h-[55px] w-[55px] rounded-[50%] border-[1px] border-[#FFFFFF] p-[15px] md:h-[75px] md:w-[75px]">
        <img
          className="h-[25px] w-[25px] md:h-[45px] md:w-[45px]"
          src={img}
          alt="Search Tip"
        />
      </div>

      <div
        className="font-ca text-center text-[16px] font-[400] text-[#FFFFFF] md:text-[22px]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  );
}
