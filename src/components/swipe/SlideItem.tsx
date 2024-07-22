"use client";

import numeral from "numeral";
import { PiTagFill } from "react-icons/pi";

import { IUser } from "@/types/interfaces";

export default function SlideItem(props: IUser & { loadable: boolean }) {
  const { isStatic, avatar, name, age, loadable, cost } = props;

  const handleErrorImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = "/logo/logo.svg";
  };

  return (
    <div className="relative h-[640px] w-[380px] rounded-[20px] bg-white md:w-[520px]">
      {loadable && (
        <>
          <img
            className="h-full w-full rounded-[20px]"
            src={
              isStatic
                ? `${process.env.NEXT_PUBLIC_API_SERVER}/${avatar}`
                : `${avatar}`
            }
            alt="Creator Avatar"
            onError={handleErrorImage}
          />

          <div className="swiper-tinder-label swiper-tinder-label-yes">
            Like
          </div>
          <div className="swiper-tinder-label swiper-tinder-label-no">Nope</div>

          <div className="absolute bottom-0 w-full">
            <div className="flex flex-col gap-[20px] rounded-[20px] bg-gradient-to-t from-gray-900 to-transparent p-[32px]">
              <div className="flex items-center">
                <div className="font-ms text-[35px] font-[600] text-[#FFFFFF] md:text-[45px]">
                  {name?.split(" ")[0]}
                </div>

                <div className="font-ms mx-[20px] text-[30px] font-[300] text-[#FFFFFF] md:text-[45px]">
                  {age}
                </div>

                <div className="flex items-center gap-[8px] rounded-[12px] bg-[#ECB35E] px-[8px] py-[4px]">
                  <PiTagFill className="h-[16px] w-[16px] text-[#FFFFFF]" />
                  <span className="font-ms text-[14px] font-[600] text-[#FFFFFF]">
                    {cost && cost > 0 ? numeral(cost).format("$0.00") : "Free"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-[8px]">
                <span className="font-ms rounded-full bg-[#777777] px-[8px] text-[12px] font-[400] text-[#FFFFFF] md:text-[15px]">
                  Top
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="swiper-tinder-label swiper-tinder-label-yes opacity-0">
                  <div className="flex flex-col items-center justify-center gap-[8px]">
                    <img
                      src="/images/icon/like.svg"
                      className="h-[64px] w-[64px]"
                      alt="Like Icon"
                    />
                    <span className="font-ms text-[12px] font-[400] text-[#FFFFFF] md:text-[15px]">
                      more like this
                    </span>
                  </div>
                </div>

                <div className="swiper-tinder-label swiper-tinder-label-no opacity-0">
                  <div className="flex flex-col items-center justify-center gap-[8px]">
                    <img
                      src="/images/icon/dislike.svg"
                      className="h-[64px] w-[64px]"
                      alt="Dislike Icon"
                    />
                    <span className="font-ms text-[12px] font-[400] text-[#FFFFFF] md:text-[15px]">
                      less like this
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
