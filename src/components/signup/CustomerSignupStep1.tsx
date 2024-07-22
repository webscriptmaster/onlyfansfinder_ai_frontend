"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { LuChevronLeft } from "react-icons/lu";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import * as z from "zod";

import Logo from "@/components/_layout/Logo";
import ButtonExt from "@/components/_uiext/ButtonExt";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SITE_TITLE } from "@/utils/constants";

import "react-phone-input-2/lib/style.css";
import useAuthStore from "@/zustand/Auth";

const FormSchema = z.object({
  name: z.string().regex(/^\s*[A-Za-zÀ-ÖØ-öø-ÿ]+\s+[A-Za-zÀ-ÖØ-öø-ÿ]+\s*$/, {
    message: 'Full name is required like as "John Doe"'
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  phone: z.string().min(3, {
    message: "Phone number is required"
  }),
  age: z.coerce.number().gte(10, {
    message: "Age is required"
  }),
  address: z.string().min(2, {
    message: "Address is required"
  })
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function CustomerSignupStep1() {
  const router = useRouter();
  const auth = useAuthStore();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: auth.user?.name ?? "",
      email: auth.user?.email ?? "",
      phone: auth.user?.phone ?? "",
      age: auth.user?.age ?? 0,
      address: auth.user?.address ?? ""
    }
  });

  const handleGoBackClick = () => {
    if (auth.signupStage === 1) {
      router.push("/signin");
    } else {
      auth.setSignupStage(auth.signupStage - 1);
    }
  };

  const onSubmit = (values: FormSchemaType) => {
    auth.setUser(values);
    auth.setSignupStage(auth.signupStage + 1);
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
              Tell us a little bit about yourself
            </div>

            <div className="mt-[52px]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        className="h-[48px] md:h-[72px]"
                        type="text"
                        placeholder="Your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[24px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-[48px] md:h-[72px]"
                        type="text"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[24px]">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        containerClass="h-[48px] md:h-[72px] w-full"
                        inputClass="!w-full !h-[48px] md:!h-[72px]"
                        placeholder="Phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[24px]">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-[48px] md:h-[72px]"
                        type="number"
                        placeholder="Your age"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[24px]">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-[48px] md:h-[72px]"
                        placeholder="Where do you live?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-[40px]">
              <ButtonExt type="submit">Continue</ButtonExt>
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
