"use client";

import { usePathname, useRouter } from "next/navigation";

import clsx from "clsx";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import useSearchStore from "@/zustand/Search";

export default function IncludeFavorite() {
  const pathName = usePathname();
  const router = useRouter();
  const search = useSearchStore();

  const handleCheckChange = async (checked: boolean) => {
    search.setIncludeFavorite(checked);
    await search.searchCreatorsAction(
      {
        keyword: search.keyword,
        includeFavorite: checked,
        params: search.selected
      },
      () => {
        router.push(pathName);
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="check_include_favorite"
        className={clsx(
          "h-[20px] w-[20px] rounded-none",
          pathName === "/swipe"
            ? "data-[state=checked]:border-[#00AFF0] data-[state=checked]:bg-[#00AFF0]"
            : "",
          pathName === "/result"
            ? "border-[#FFFFFF] data-[state=checked]:border-[#FFFFFF] data-[state=checked]:bg-[#00AFF0]"
            : ""
        )}
        checked={search.includeFavorite}
        onCheckedChange={handleCheckChange}
      />
      <Label
        htmlFor="check_include_favorite"
        className={clsx(
          "text-[16px] font-[400] md:text-[18px]",
          pathName === "/swipe" ? "text-[#303030]" : "",
          pathName === "/result" ? "text-[#FFFFFF]" : ""
        )}
      >
        Include favorite
      </Label>
    </div>
  );
}
