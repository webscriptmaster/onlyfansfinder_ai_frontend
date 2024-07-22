"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import * as z from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import LoadingOverlay from "@/components/_layout/LoadingOverlay";

import useAuthStore from "@/zustand/Auth";

import "react-phone-input-2/lib/style.css";

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

export default function PersonalCard() {
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

  const onSubmit = (values: FormSchemaType) => {
    auth.updatePersonalAction(values);
  };

  useEffect(() => {
    form.reset(auth.user ?? {});
  }, [auth.user?._id]);

  return (
    <>
      <LoadingOverlay loading={auth.loading} />

      <Card className="p-[16px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-bc">Personal Information</CardTitle>
              <CardDescription>
                Make changes to your personal information here. Click save when
                you're done.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col">
              <div className="mb-[24px]">
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

              <div className="mb-[24px]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoFocus
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

              <div className="mb-[24px]">
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

              <div className="mb-[24px]">
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

              <div className="mb-[24px]">
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
