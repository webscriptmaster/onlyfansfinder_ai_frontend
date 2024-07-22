"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

import { useEffect, useState } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
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
import CheckboxExt from "@/components/_uiext/CheckboxExt";
import FileDnD from "@/components/_uiext/FileDnD";
import ChipInputExt from "@/components/_uiext/ChipInputExt";

import useAuthStore from "@/zustand/Auth";
import { USER_ROLES } from "@/utils/constants";
import { toastError } from "@/lib/toast";

const FormSchema = z.object({
  avatar: z.any(),
  characteristics: z
    .array(z.any())
    .min(1, { message: "There should be at least 1 tag" })
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function FanCard() {
  const auth = useAuthStore();

  // Creator
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      avatar: null,
      characteristics: auth.user?.characteristics ?? []
    }
  });

  const onSubmit = (values: FormSchemaType) => {
    auth.updateFanAction({
      ...values,
      characteristics: values.characteristics.map((c) => c.label)
    });
  };

  // Customer
  const [tempQA, setTempQA] = useState(auth.user?.qa ?? []);

  const handleCheckChange = (question: string, option: string) => () => {
    let newQA = JSON.parse(JSON.stringify(tempQA));

    if (tempQA.findIndex((item) => item.question === question) > -1) {
      let qaItem = tempQA.find((item) => item.question === question);

      if (qaItem) {
        if (qaItem.answers?.indexOf(option) > -1) {
          const newAnswers = qaItem.answers.filter((item) => item !== option);
          qaItem = { ...qaItem, answers: newAnswers };
        } else {
          const newAnswers = [...qaItem.answers, option];
          qaItem = { ...qaItem, answers: newAnswers };
        }

        newQA = newQA.filter((item: any) => item.question !== qaItem?.question);
        newQA.push(qaItem);

        setTempQA(newQA);
      }
    } else {
      newQA.push({
        question,
        answers: [option]
      });

      setTempQA(newQA);
    }
  };

  const handleSaveClick = () => {
    if (tempQA.length !== 3) {
      toastError("You should answer whole questions");
    }

    let isAnswered = true;
    tempQA.every((qaItem) => {
      if (qaItem.answers.length === 0) {
        isAnswered = false;
        return false;
      }

      return true;
    });

    if (!isAnswered) {
      toastError("Every question should be answered");
    }

    if (isAnswered && tempQA.length === 3) {
      auth.updateFanAction({ qa: tempQA });
    }
  };

  useEffect(() => {
    setTempQA(auth.user?.qa ?? []);
  }, [auth.user?.qa]);

  return (
    <>
      <LoadingOverlay loading={auth.loading} />

      {auth.role === USER_ROLES.CUSTOMER && (
        <Card className="p-[16px]">
          <CardHeader>
            <CardTitle className="font-bc">Fan Information</CardTitle>
            <CardDescription>
              Make changes to your fan information here. Click save when you're
              done.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col">
            <div className="flex w-full flex-col gap-[36px]">
              {[
                "Question 1 (multiple selection)",
                "Question 2 (multiple selection)",
                "Question 3 (multiple selection)"
              ].map((question) => (
                <div key={question} className="flex flex-col">
                  <div className="text-[18px] font-[400] text-[#303030] md:text-[20px]">
                    {question}
                  </div>

                  <div className="mt-[20px] flex flex-col gap-[10px]">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map(
                      (opt) => (
                        <CheckboxExt
                          key={opt}
                          label={opt}
                          checked={
                            !!tempQA?.find(
                              (item) =>
                                item.question === question &&
                                item.answers.indexOf(opt) > -1
                            )
                          }
                          onCheckChange={handleCheckChange(question, opt)}
                        />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="font-ms h-[48px] bg-[#00AFF0] text-center text-[16px] font-[500] text-[#FFFFFF] hover:bg-[#1796D4] md:h-[60px] md:text-[20px]"
              type="button"
              onClick={handleSaveClick}
            >
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      )}

      {auth.role === USER_ROLES.CREATOR && (
        <Card className="p-[16px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle className="font-bc">Fan Information</CardTitle>
                <CardDescription>
                  Make changes to your fan information here. Click save when
                  you're done.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col items-center">
                <div className="mb-[24px] flex w-full flex-col items-center gap-[12px] md:w-[320px]">
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FileDnD
                          defaultAvatar={
                            <div>
                              {auth.user?.avatar ? (
                                <img
                                  className="h-[200px] w-[200px] rounded-[50%] border border-[#00AFF0]"
                                  src={
                                    auth.user?.isStatic
                                      ? `${process.env.NEXT_PUBLIC_API_SERVER}/${auth.user?.avatar}`
                                      : `${auth.user?.avatar}`
                                  }
                                  alt="Creator Avatar"
                                />
                              ) : (
                                <LuUserCircle2 className="h-[200px] w-[200px]" />
                              )}
                            </div>
                          }
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-[24px] w-full">
                  <FormField
                    control={form.control}
                    name="characteristics"
                    render={({ field }) => (
                      <FormItem>
                        <ChipInputExt
                          values={field.value?.map((c) => ({
                            uuid: uuidv4(),
                            label: c
                          }))}
                          onChange={field.onChange}
                        />
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
      )}
    </>
  );
}
