"use client";

import { useRouter } from "next/navigation";

import React from "react";

import ResponsiveLogo from "@/components/_layout/ResponsiveLogo";
import SearchInput from "@/components/_shared/SearchInput";
import SearchFilter from "@/components/_shared/SearchFilter";
import { Button } from "@/components/ui/button";

import { SITE_TITLE } from "@/utils/constants";
import useSearchStore from "@/zustand/Search";

import TipItem from "./TipItem";

export default function Search() {
  const router = useRouter();
  const search = useSearchStore();

  const tipItems = [
    {
      img: "/images/search/tip_cup.svg",
      title: "#1 search engine<br/>OnlyFans tool"
    },
    {
      img: "/images/search/tip_ai.svg",
      title: "Use AI to scout out<br/>top performers"
    },
    {
      img: "/images/search/tip_free.svg",
      title: "Completely<br/>FREE"
    }
  ];

  const handleSwipeClick = async () => {
    search.setSelected({
      category: "Gender",
      condition: { value: "Female", label: "Female" }
    });

    await search.searchCreatorsAction(
      {
        keyword: search.keyword,
        includeFavorite: search.includeFavorite,
        params: [
          ...search.selected,
          {
            category: "Gender",
            condition: { value: "Female", label: "Female" }
          }
        ]
      },
      () => {
        router.push("/swipe");
      }
    );
  };

  return (
    <section className="flex min-h-[calc(100vh-64px)] w-full flex-col overflow-x-hidden">
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-[20px] mt-[48px] flex items-center justify-center gap-[12px] md:gap-[24px]">
          <ResponsiveLogo className="h-[45px] w-[45px] md:h-[90px] md:w-[90px]" />

          <h1 className="font-bc text-[38px] font-[500] text-[#00AFF0] md:text-[90px]">
            {SITE_TITLE}
          </h1>
        </div>

        <div className="mb-[32px] flex justify-center">
          <div className="font-ms hidden text-center text-[22px] font-[500] text-[#1A1A1A] md:block">
            The Ultimate{" "}
            <span className="text-[#00AFF0]">OnlyFans Creator</span>
            <br />
            Search Engine
          </div>

          <div className="font-ms block text-center text-[16px] font-[500] text-[#1A1A1A] md:hidden">
            The Ultimate{" "}
            <span className="text-[#00AFF0]">OnlyFans Creator</span>
            <br />
            Search Engine
          </div>
        </div>

        <div className="mb-[48px] flex w-full flex-col items-center gap-[32px] px-[16px] md:px-0">
          <Button
            className="font-ms relative h-[48px] w-full bg-[#00AFF0] text-center text-[16px] font-[500] text-[#FFFFFF] hover:bg-[#1796D4] md:h-[60px] md:w-[714px] md:text-[20px]"
            onClick={handleSwipeClick}
          >
            Swipe
            <span className="absolute right-0 top-0 flex h-4 w-4 translate-x-[50%] translate-y-[-50%]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5733] opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-[#FF5733]" />
            </span>
          </Button>

          <SearchInput />

          <SearchFilter />
        </div>
      </div>

      <div className="flex h-[200px] w-full flex-row items-center justify-center gap-[35px] bg-[#00AFF0] md:h-[240px] md:gap-[70px]">
        {tipItems.map((item) => (
          <TipItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
