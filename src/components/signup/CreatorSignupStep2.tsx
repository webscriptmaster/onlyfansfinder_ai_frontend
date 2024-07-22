"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { LuChevronLeft } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";

import Logo from "@/components/_layout/Logo";
import ButtonExt from "@/components/_uiext/ButtonExt";
import ChipInputExt, { IChip } from "@/components/_uiext/ChipInputExt";

import { SITE_TITLE } from "@/utils/constants";
import { toastError } from "@/lib/toast";
import useAuthStore from "@/zustand/Auth";

export default function CreatorSignupStep2() {
  const router = useRouter();
  const auth = useAuthStore();
  const [characteristics, setCharacteristics] = useState<IChip[]>([]);

  const handleGoBackClick = () => {
    if (auth.signupStage === 1) {
      router.push("/signin");
    } else {
      auth.setSignupStage(auth.signupStage - 1);
    }
  };

  const handleCharacteristicsChange = (chips: IChip[]) => {
    setCharacteristics(chips);
  };

  const handleContinueClick = () => {
    if (!characteristics.length) {
      toastError("You should have at least one characteristic.");
    }

    if (!!characteristics.length && auth.signupStage < auth.signupTotalStage) {
      auth.setUser({ characteristics: characteristics.map((c) => c.label) });
      auth.setSignupStage(auth.signupStage + 1);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-between px-[24px] py-[64px]">
      <div
        className="flex cursor-pointer items-center"
        onClick={handleGoBackClick}
      >
        <LuChevronLeft className="text-[28px] text-[#737373]" />
        <span className="text-[16px] font-[400] text-[#737373]">Go back</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full flex-col md:w-[450px]">
          <div className="mb-[36px] flex justify-center gap-[16px] md:hidden">
            <Logo />
            <h1 className="font-bc text-[38px] font-[500] text-[#00AFF0]">
              {SITE_TITLE}
            </h1>
          </div>

          <div className="mb-[52px] text-center text-[16px] font-[400] text-[#1A1A1A] md:text-[20px]">
            Help users find you more easily, enter some of your characteristics
            below
          </div>

          <ChipInputExt
            values={auth.user?.characteristics?.map((c) => ({
              uuid: uuidv4(),
              label: c
            }))}
            onChange={handleCharacteristicsChange}
          />

          <div className="mt-[40px]">
            <ButtonExt onClick={handleContinueClick}>Add Tags</ButtonExt>
          </div>
        </div>
      </div>

      <div className="relative h-[8px] w-full rounded-[2px] bg-[#EBEBEB]">
        <div
          className="absolute bottom-0 left-0 top-0 bg-[#ECB35E]"
          style={{
            width: `${(auth.signupStage * 100) / auth.signupTotalStage}%`
          }}
        />
      </div>
    </div>
  );
}
