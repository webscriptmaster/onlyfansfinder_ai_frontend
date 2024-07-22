"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LuChevronLeft, LuEye, LuEyeOff } from "react-icons/lu";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Logo from "@/components/_layout/Logo";
import ButtonExt from "@/components/_uiext/ButtonExt";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SITE_TITLE } from "@/utils/constants";
import useAuthStore from "@/zustand/Auth";

const FormSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password should be at least 6 characters"
    }),
    confirm: z.string().min(6, {
      message: "Repeat password should be at least 6 characters"
    })
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"]
  });

type FormSchemaType = z.infer<typeof FormSchema>;

export default function CustomerSignupStep3() {
  const router = useRouter();
  const auth = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirm: ""
    }
  });

  const handleGoBackClick = () => {
    if (auth.signupStage === 1) {
      router.push("/signin");
    } else {
      auth.setSignupStage(auth.signupStage - 1);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (values: FormSchemaType) => {
    auth.registerAction(
      {
        ...auth.user,
        password: values.password
      },
      router
    );
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex w-full flex-col md:w-[450px]">
            <div className="mb-[36px] flex justify-center gap-[16px] md:hidden">
              <Logo />
              <h1 className="font-bc text-[38px] font-[500] text-[#00AFF0]">
                {SITE_TITLE}
              </h1>
            </div>

            <div className="text-center text-[16px] font-[400] text-[#1A1A1A] md:text-[20px]">
              Create your password and start sharing your content
            </div>

            <div className="mt-[52px]">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative w-full">
                      <Input
                        className="h-[48px] md:h-[72px]"
                        type={!showPassword ? "password" : "text"}
                        placeholder="Password"
                        {...field}
                      />

                      <div
                        className="absolute right-[12px] top-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                        onClick={handleShowPassword}
                      >
                        {!showPassword ? (
                          <LuEye className="text-[20px] text-[#737373]" />
                        ) : (
                          <LuEyeOff className="text-[20px] text-[#737373]" />
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[24px]">
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative w-full">
                      <Input
                        className="h-[48px] md:h-[72px]"
                        type={!showPassword ? "password" : "text"}
                        placeholder="Repeat Password"
                        {...field}
                      />

                      <div
                        className="absolute right-[12px] top-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                        onClick={handleShowPassword}
                      >
                        {!showPassword ? (
                          <LuEye className="text-[20px] text-[#737373]" />
                        ) : (
                          <LuEyeOff className="text-[20px] text-[#737373]" />
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[40px]">
              <ButtonExt type="submit">
                <span className="hidden md:block">
                  Create password and start now!
                </span>
                <span className="block md:hidden">Start now</span>
              </ButtonExt>
            </div>
          </div>
        </form>
      </Form>

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
