"use client";

import { useRouter } from "next/navigation";

import { PiMagnifyingGlass, PiPaperPlaneRightFill } from "react-icons/pi";

import { Input } from "@/components/ui/input";
import useSearchStore from "@/zustand/Search";

export default function SearchInput() {
  const router = useRouter();
  const search = useSearchStore();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search.setKeyword(e.target.value);
  };

  const handleGoClick = async () => {
    await search.searchCreatorsAction(
      {
        keyword: search.keyword,
        includeFavorite: search.includeFavorite,
        params: search.selected
      },
      () => {
        router.push("/swipe");
      }
    );
  };

  return (
    <div className="flex w-full items-center justify-between gap-[16px] rounded-[100px] bg-[#F9F9F9] p-[12px] md:w-[714px] md:p-[16px]">
      <PiMagnifyingGlass className="h-[15px] w-[15px] md:h-[20px] md:w-[20px]" />

      <Input
        className="font-ms rounded-none border-none bg-[#F9F9F9] text-[16px] text-[#000000] focus-visible:border-[#F9F9F9] focus-visible:outline-[#F9F9F9] focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[20px]"
        placeholder="Who or what are you looking for?"
        value={search.keyword}
        onChange={handleKeywordChange}
      />

      <div
        className="h-[30px] w-[30px] cursor-pointer rounded-[100%] bg-[#00AEEF] p-[7.5px] md:h-[50px] md:w-[50px] md:p-[15px]"
        onClick={handleGoClick}
      >
        <PiPaperPlaneRightFill className="h-[15px] w-[15px] text-[#FFFFFF] md:h-[20px] md:w-[20px]" />
      </div>
    </div>
  );
}
