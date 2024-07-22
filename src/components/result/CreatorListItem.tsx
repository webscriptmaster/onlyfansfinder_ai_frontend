"use client";

import React from "react";

import numeral from "numeral";
import {
  PiCameraFill,
  PiHeartFill,
  PiTagFill,
  PiVideoCameraFill
} from "react-icons/pi";

import { IUser } from "@/types/interfaces";

export default function CreatorListItem(props: IUser) {
  const {
    isStatic,
    avatar,
    name,
    items,
    includes,
    likes,
    pictures,
    videos,
    cost,
    description,
    shares
  } = props;

  const handleErrorImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = "/logo/logo.svg";
  };

  return (
    <div className="flex flex-col gap-0 rounded-[15px] shadow-[0px_1px_2px_0px_#00000026,0px_4px_4px_0px_#00000021,0px_9px_6px_0px_#00000014,0px_17px_7px_0px_#00000005,0px_26px_7px_0px_#00000000] md:flex-row md:gap-[36px] md:rounded-none md:shadow-none">
      <img
        className="w-full rounded-[15px] md:h-[200px] md:min-h-[200px] md:w-[200px] md:min-w-[200px] md:rounded-[50%]"
        src={
          isStatic
            ? `${process.env.NEXT_PUBLIC_API_SERVER}/${avatar}`
            : `${avatar}`
        }
        onError={handleErrorImage}
        alt="Creator Avatar"
      />

      <div className="flex flex-col gap-[12px] p-[16px] md:gap-[20px] md:p-0">
        <div className="hidden items-center md:flex">
          <a
            href={includes ?? ""}
            target="_blank"
            className="font-ms mr-[8px] text-[20px] font-[600] text-[#00AEEF] underline"
          >
            {name}
          </a>
          <div className="mr-[20px] text-[20px] font-[600]">
            {(items ?? []).join(" ")}
          </div>
          <div className="mr-[20px] text-[20px] font-[400] text-[#515151]">
            |
          </div>
          <a
            href={includes ?? ""}
            target="_blank"
            className="text-[20px] font-[400] text-[#515151]"
          >
            {includes ?? ""}
          </a>
        </div>

        <div className="flex items-center md:hidden">
          <a
            href={includes ?? ""}
            target="_blank"
            className="font-ms mr-[8px] text-[18px] font-[600] text-[#00AEEF] underline"
          >
            {name}
          </a>
          <div className="text-[18px] font-[600]">{items?.join(" ")}</div>
        </div>

        <div className="flex items-center md:hidden">
          <a
            href={includes ?? ""}
            target="_blank"
            className="text-[16px] font-[400] text-[#515151]"
          >
            {includes ?? ""}
          </a>
        </div>

        <div className="flex items-center">
          <PiHeartFill className="h-[16px] w-[16px] text-[#515151] md:h-[20px] md:w-[20px]" />
          <div className="font-ms ml-[12px] mr-[24px] text-[14px] font-[400] text-[#515151] md:text-[20px]">
            {likes}
          </div>

          <PiCameraFill className="h-[16px] w-[16px] text-[#515151] md:h-[20px] md:w-[20px]" />
          <div className="font-ms ml-[12px] mr-[24px] text-[14px] font-[400] text-[#515151] md:text-[20px]">
            {pictures ?? Math.round(Math.random() * 10000)}
          </div>

          <PiVideoCameraFill className="h-[16px] w-[16px] text-[#515151] md:h-[20px] md:w-[20px]" />
          <div className="font-ms ml-[12px] mr-[24px] text-[14px] font-[400] text-[#515151] md:text-[20px]">
            {videos ?? Math.round(Math.random() * 100)}
          </div>

          <PiTagFill className="h-[16px] w-[16px] text-[#515151] md:h-[20px] md:w-[20px]" />
          <div className="font-ms ml-[12px] rounded-[10px] bg-[#EcB35E] px-[8px] text-[14px] font-[400] text-[#FFFFFF] md:text-[16px]">
            {cost && cost > 0 ? numeral(cost).format("$0.00") : "Free"}
          </div>
        </div>

        <div
          className="text-[14px] font-[400] text-[#515151] md:text-[18px]"
          dangerouslySetInnerHTML={{ __html: description ?? "" }}
        />

        <div className="flex gap-[16px] md:gap-[20px]">
          {shares?.twitter && (
            <img
              className="h-[16px] w-[16px] md:h-[20px] md:w-[20px]"
              src="images/share/twitter.svg"
              alt="Share Twitter"
            />
          )}

          {shares?.instagram && (
            <img
              className="h-[16px] w-[16px] md:h-[20px] md:w-[20px]"
              src="images/share/instagram.svg"
              alt="Share Instagram"
            />
          )}

          {shares?.tiktok && (
            <img
              className="h-[16px] w-[16px] md:h-[20px] md:w-[20px]"
              src="images/share/tiktok.svg"
              alt="Share Tiktok"
            />
          )}
        </div>
      </div>
    </div>
  );
}
