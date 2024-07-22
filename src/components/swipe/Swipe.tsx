"use client";

import React, { useEffect, useState } from "react";

import { PiCaretDown } from "react-icons/pi";

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

import EffectTinder from "@/lib/effect-tinder/effect-tinder.esm";

import IncludeFavorite from "@/components/_shared/IncludeFavorite";
import SwitchNavigation from "@/components/_shared/SwitchNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";

import { IUser } from "@/types/interfaces";
import useSearchStore from "@/zustand/Search";
import useFavoriteStore from "@/zustand/Favorite";

import SlideItem from "./SlideItem";
import CreatorThumbItem from "./CreatorThumbItem";

import "swiper/css";
import "swiper/css/pagination";
import "@/lib/effect-tinder/effect-tinder.css";

interface CustomSwiperOptions extends SwiperOptions {
  onTinderSwipe: (s: any, direction: any) => void;
}

export default function Swipe() {
  const search = useSearchStore();
  const favorite = useFavoriteStore();

  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [result, setResult] = useState<IUser[]>([]);

  const swiperOptions: CustomSwiperOptions = {
    modules: [Pagination, EffectTinder],
    effect: "tinder",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    pagination: {
      clickable: false,
      dynamicBullets: true,
      dynamicMainBullets: 4
    },
    onTinderSwipe: (s, direction) => {
      setActiveIndex((prev) => prev + 1);

      if (direction === "left") {
        favorite.dislikeCreatorAction({
          creatorId: search.result[s.activeIndex - 1]?._id
        });
      }

      if (direction === "right") {
        favorite.likeCreatorAction({
          creatorId: search.result[s.activeIndex - 1]?._id
        });
      }
    }
  };

  const handleLoadMore = async () => {
    await search.searchMoreAction({
      keyword: search.keyword,
      includeFavorite: search.includeFavorite,
      params: search.selected
    });
  };

  useEffect(() => {
    if (activeIndex % 10 === 9) {
      setResult((prev) => [
        ...prev,
        ...search.result.slice(activeIndex + 1, activeIndex + 11)
      ]);
    }
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
    setResult(search.result.slice(0, 10));
    swiperInstance?.slideTo(0, 0);
  }, [search.result]);

  return (
    <section className="flex min-h-[calc(100vh-64px)] w-full flex-col overflow-x-hidden">
      <div className="flex h-[100px]">
        <div className="hidden w-[412px] items-center gap-[8px] pl-[32px] md:flex md:bg-[#F6F6F6]" />

        <div className="flex flex-1 items-center justify-between px-[32px]">
          <IncludeFavorite />

          <SwitchNavigation defaultValue />
        </div>
      </div>

      <div className="flex flex-1">
        <div className="hidden min-w-[412px] max-w-[412px] flex-col pl-[32px] md:flex md:bg-[#F6F6F6]">
          <ScrollArea className="max-h-[calc(100vh-100px-64px)]" type="always">
            <h2 className="font-ms text-[18px] font-[500] text-[#1A1A1A]">
              Recently seen
            </h2>

            <div className="mb-[40px] mt-[28px] flex flex-col gap-[32px]">
              {search.result.map((f) => (
                <CreatorThumbItem key={f._id} {...f} />
              ))}
            </div>

            <div className="mb-[40px] flex justify-center">
              <div
                className="font-ms flex cursor-pointer items-center gap-[8px] text-[15px] font-[300] text-[#1A1A1A]"
                onClick={handleLoadMore}
              >
                View more <PiCaretDown />
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-hidden">
          <Swiper
            onSwiper={setSwiperInstance}
            className="h-[640px] w-[380px] md:w-[520px]"
            {...swiperOptions}
          >
            {result.map((value, idx) => (
              <SwiperSlide key={value._id}>
                <SlideItem
                  {...value}
                  loadable={Math.abs(idx - activeIndex) < 3}
                />
              </SwiperSlide>
            ))}

            <SwiperSlide>
              <div className="flex h-[640px] w-[380px] items-center justify-center rounded-[20px] border bg-white md:w-[520px]">
                <h1 className="font-bc text-center text-[35px] text-[#00AFF0] md:text-[45px]">
                  There are no more recommendations.
                </h1>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
