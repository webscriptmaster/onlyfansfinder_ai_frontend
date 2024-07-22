"use client";

import { useRouter } from "next/navigation";

import React, { useState } from "react";

import clsx from "clsx";
import { PiFireFill, PiMagnifyingGlass } from "react-icons/pi";

interface Props {
  defaultValue: boolean;
}

export default function SwitchNavigation({ defaultValue }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  const handleStateChange = () => {
    if (!value) {
      setValue((prev) => !prev);
      router.push("/swipe");
    } else {
      setValue((prev) => !prev);
      router.push("/result");
    }
  };

  return (
    <div
      className={clsx(
        "flex h-[32px] w-[72px] cursor-pointer items-center justify-between rounded-[40px] px-2 md:h-[44px] md:w-[104px]",
        !value ? "bg-[#EFEFEF]" : "bg-[#ECB35E]"
      )}
      onClick={handleStateChange}
    >
      <div
        className={clsx(
          "h-[24px] w-[24px] rounded-[50%] bg-[#ECB35E] p-[6px] text-[#FFFFFF] md:h-[36px] md:w-[36px]",
          !value ? "visible" : "invisible"
        )}
      >
        <PiFireFill className="h-[12px] w-[12px] md:h-[24px] md:w-[24px]" />
      </div>

      <div
        className={clsx(
          "h-[24px] w-[24px] rounded-[50%] bg-[#C59246] p-[6px] text-[#FFFFFF] md:h-[36px] md:w-[36px]",
          value ? "visible" : "invisible"
        )}
      >
        <PiMagnifyingGlass className="h-[12px] w-[12px] md:h-[24px] md:w-[24px]" />
      </div>
    </div>
  );
}
