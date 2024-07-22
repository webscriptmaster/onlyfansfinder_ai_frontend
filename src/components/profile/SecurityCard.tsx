"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LuEye, LuEyeOff } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import LoadingOverlay from "@/components/_layout/LoadingOverlay";

import useAuthStore from "@/zustand/Auth";

const FormSchema = z
  .object({
    current: z.string().min(6, {
      message: "Current password should be at least 6 characters"
    }),
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

export default function SecurityCard() {
  const auth = useAuthStore();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      current: "",
      password: "",
      confirm: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (values: FormSchemaType) => {
    auth.changePasswordAction(values);
  };

  return (
    <>
      <LoadingOverlay loading={auth.loading} />

      <Card className="p-[16px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-bc">Security Information</CardTitle>
              <CardDescription>
                Make changes to your security information here. Click save when
                you're done.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col">
              <div className="mb-[24px]">
                <FormField
                  control={form.control}
                  name="current"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative w-full">
                        <Input
                          className="h-[48px] md:h-[72px]"
                          type={!showPassword ? "password" : "text"}
                          placeholder="Current password"
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

              <div className="mb-[24px]">
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

              <div className="mb-[24px]">
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
            </CardContent>

            <CardFooter>
              <Button
                className="font-ms h-[48px] bg-[#00AFF0] text-center text-[16px] font-[500] text-[#FFFFFF] hover:bg-[#1796D4] md:h-[60px] md:text-[20px]"
                type="submit"
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
