"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Logo from "@/components/_layout/Logo";
import ButtonExt from "@/components/_uiext/ButtonExt";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";

import { SITE_TITLE, USER_ROLES } from "@/utils/constants";
import useAuthStore from "@/zustand/Auth";

const SignInSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters"
  })
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

export default function SignIn() {
  const router = useRouter();
  const auth = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignInRoleClick = () => {
    auth.setRole(
      auth.role === USER_ROLES.CUSTOMER
        ? USER_ROLES.CREATOR
        : USER_ROLES.CUSTOMER
    );
  };

  const onSubmit = (values: SignInSchemaType) => {
    auth.loginAction(values, router);
  };

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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col items-center justify-center px-[24px]"
        >
          <div className="flex w-full flex-col md:w-[450px]">
            <div className="flex justify-center gap-[16px] md:hidden">
              <Logo />
              <h1 className="font-bc text-[38px] font-[500] text-[#00AFF0]">
                {SITE_TITLE}
              </h1>
            </div>

            <div className="font-ms mt-[80px] block px-[48px] text-center text-[20px] font-[500] text-[#00AFF0] md:hidden">
              {auth.role === USER_ROLES.CUSTOMER
                ? "The best online creators in one place"
                : "The best online platform to prove who you are"}
            </div>

            <div className="mt-[80px] text-center text-[18px] font-[500] text-[#1A1A1A] md:hidden">
              Log in
            </div>

            <div className="hidden text-[25px] font-[400] text-[#1A1A1A] md:block">
              {auth.role === USER_ROLES.CUSTOMER
                ? "Customer sign-in"
                : "Creator sign-in"}
            </div>

            <div className="mt-[12px] md:mt-[24px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        className="h-[48px] md:h-[72px]"
                        type="email"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[12px] md:mt-[36px]">
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

            <div className="mt-[28px] md:mt-[36px]">
              <ButtonExt type="submit">Login</ButtonExt>
            </div>

            <div className="mt-[20px] flex justify-between gap-[8px] text-[16px] font-[400] text-[#00AFF0] md:mt-[32px] md:text-[20px]">
              <div className="cursor-pointer" onClick={handleSignInRoleClick}>
                {auth.role === USER_ROLES.CUSTOMER
                  ? "Creator Sign-In"
                  : "Customer Sign-In"}
              </div>
              <span>|</span>
              <Link href="/forget">Forgotten password?</Link>
              <span>|</span>
              <Link href="/signup">Sign up</Link>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
