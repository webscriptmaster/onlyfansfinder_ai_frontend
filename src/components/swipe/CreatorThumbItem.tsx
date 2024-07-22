"use client";

import React from "react";

import { PiCameraFill, PiHeartFill, PiVideoCameraFill } from "react-icons/pi";

import { IUser } from "@/types/interfaces";

export default function CreatorThumbItem(props: IUser) {
  const { isStatic, avatar, name, items, includes, likes, pictures, videos } =
    props;

  const handleErrorImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = "/logo/logo.svg";
  };

  return (
    <div className="flex gap-[16px]">
      <img
        className="h-[100px] w-[100px] rounded-[50%]"
        src={
          isStatic
            ? `${process.env.NEXT_PUBLIC_API_SERVER}/${avatar}`
            : `${avatar}`
        }
        loading="lazy"
        alt="Creator Avatar"
        onError={handleErrorImage}
      />

      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center">
          <a
            href={includes ?? ""}
            target="_blank"
            className="font-ms mr-[8px] text-[16px] font-[600] text-[#00AEEF] underline"
          >
            {name}
          </a>
          <div className="text-[16px] font-[600]">
            {(items ?? []).join(" ")}
          </div>
        </div>

        <div className="flex items-center">
          <a
            href={includes ?? ""}
            target="_blank"
            className="text-[16px] font-[400] text-[#515151]"
          >
            {includes ?? ""}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-[10px]">
          <div className="flex items-center gap-[8px]">
            <PiHeartFill className="h-[12px] w-[12px] text-[#515151]" />
            <div className="font-ms text-[13px] font-[400] text-[#515151]">
              {likes}
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            <PiCameraFill className="h-[12px] w-[12px] text-[#515151]" />
            <div className="font-ms text-[13px] font-[400] text-[#515151]">
              {pictures}
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            <PiVideoCameraFill className="h-[12px] w-[12px] text-[#515151]" />
            <div className="font-ms text-[13px] font-[400] text-[#515151]">
              {videos}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
