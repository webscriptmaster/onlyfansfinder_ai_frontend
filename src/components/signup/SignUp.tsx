"use client";

import { SITE_TITLE, USER_ROLES } from "@/utils/constants";
import Logo from "@/components/_layout/Logo";

import useAuthStore from "@/zustand/Auth";
import CustomerSignupStep1 from "./CustomerSignupStep1";
import CustomerSignupStep3 from "./CustomerSignupStep3";

import CreatorSignupStep1 from "./CreatorSignupStep1";
import CreatorSignupStep2 from "./CreatorSignupStep2";
import CreatorSignupStep3 from "./CreatorSignupStep3";
import CreatorSignupStep4 from "./CreatorSignupStep4";

export default function SignUp() {
  const auth = useAuthStore();

  return (
    <section className="flex min-h-screen w-full overflow-x-hidden">
      <div className="hidden flex-1 flex-col items-center bg-[#00AFF0] bg-[url('/images/signin/bg.png')] bg-left-bottom bg-no-repeat md:flex">
        <div className="mt-[132px] flex flex-wrap justify-center gap-[16px]">
          <Logo />
          <h1 className="font-bc text-[30px] font-[500] text-[#FFFFFF] lg:text-[50px]">
            {SITE_TITLE}
          </h1>
        </div>

        <div className="font-ms mt-[40px] px-[32px] text-[20px] font-[500] text-[#FFFFFF] lg:text-[30px]">
          {auth.role === USER_ROLES.CUSTOMER
            ? "The best online creators in one place"
            : "The best online platform to prove who you are"}
        </div>
      </div>

      {auth.role === USER_ROLES.CUSTOMER && auth.signupStage === 1 && (
        <CustomerSignupStep1 />
      )}

      {auth.role === USER_ROLES.CUSTOMER && auth.signupStage === 2 && (
        <CustomerSignupStep3 />
      )}

      {auth.role === USER_ROLES.CREATOR && auth.signupStage === 1 && (
        <CreatorSignupStep1 />
      )}

      {auth.role === USER_ROLES.CREATOR && auth.signupStage === 2 && (
        <CreatorSignupStep2 />
      )}

      {auth.role === USER_ROLES.CREATOR && auth.signupStage === 3 && (
        <CreatorSignupStep3 />
      )}

      {auth.role === USER_ROLES.CREATOR && auth.signupStage === 4 && (
        <CreatorSignupStep4 />
      )}
    </section>
  );
}
