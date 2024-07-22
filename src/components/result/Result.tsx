"use client";

import Link from "next/link";

import React from "react";

import { format } from "date-fns";

import IncludeFavorite from "@/components/_shared/IncludeFavorite";
import SwitchNavigation from "@/components/_shared/SwitchNavigation";
import SearchInput from "@/components/_shared/SearchInput";
import SearchFilter from "@/components/_shared/SearchFilter";

import useSearchStore from "@/zustand/Search";

import CreatorListItem from "./CreatorListItem";

export default function Result() {
  const search = useSearchStore();

  return (
    <section className="flex min-h-[calc(100vh-64px)] w-full flex-col overflow-x-hidden">
      <div className="flex items-center bg-[#00AFF0] px-[32px] py-[32px]">
        <div className="flex flex-1 justify-between">
          <IncludeFavorite />

          <SwitchNavigation defaultValue={false} />
        </div>
      </div>

      <div className="flex w-full justify-center bg-[#00AFF0] px-[32px]">
        <div className="flex w-full flex-col gap-[16px] md:w-auto">
          <SearchInput />

          <SearchFilter />

          <div className="flex flex-wrap gap-[16px] pb-[28px]" />
        </div>
      </div>

      <div className="mb-[56px] mt-[24px] flex flex-col gap-[16px] px-[20px] lg:px-[10%]">
        <div className="text-[16px] font-[400] text-[#515151] md:text-[18px]">
          About {search.result.length} result
        </div>

        <div className="flex gap-[8px] text-[16px] font-[500] text-[#1796D4] md:text-[18px]">
          <Link className="underline" href="/">
            Onlyfans
          </Link>
          <span>&gt;</span>
          <Link className="underline" href="/">
            Top
          </Link>
          <span>&gt;</span>
          <Link className="underline" href="/">
            profiles
          </Link>
        </div>
      </div>

      <div className="mb-[40px] flex flex-col gap-[12px] px-[20px] lg:px-[10%]">
        <div className="font-ms text-[22px] font-[400] text-[#1A1A1A] md:text-[35px]">
          🔥 50 Best Free trial, Today in {new Date().getFullYear()}
        </div>

        <div className="text-[16px] font-[400] text-[#515151]">
          Last updated: {format(new Date(), "PPP")}
        </div>
      </div>

      <div className="mb-[40px] flex flex-col gap-[30px] px-[20px] md:mb-[80px] md:gap-[60px] lg:px-[10%]">
        {search.result?.map((value) => (
          <CreatorListItem key={value._id} {...value} />
        ))}
      </div>
    </section>
  );
}
