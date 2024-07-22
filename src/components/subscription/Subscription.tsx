"use client";

import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ISubscription } from "@/types/interfaces";
import { Button } from "../ui/button";

interface Props extends ISubscription {
  isSelected?: boolean;
  onClick?: () => void;
}

function SubscriptionCard(props: Props) {
  const { periodMonth, description, price, totalPrice, isSelected, onClick } =
    props;

  return (
    <div
      className={clsx(
        "flex flex-1 flex-col justify-between rounded-[10px] p-[24px] shadow-[0px_41px_41px_0px_#00000017,0px_10px_22px_0px_#0000001A,0px_163px_65px_0px_#00000003,0px_255px_71px_0px_#00000000,0px_92px_55px_0px_#0000000D]",
        isSelected ? "border-[2px] border-[#00AFF0]" : "border-none"
      )}
      onClick={onClick}
    >
      <div className="font-ms mb-[16px] text-center text-[30px] font-[500] text-[#1A1A1A]">
        {periodMonth} month
      </div>

      <div className="mb-[48px] text-center text-[18px] font-[400] text-[#1A1A1A]">
        {description}
      </div>

      <div className="mb-[32px] flex flex-col gap-[8px]">
        {["More visibility", "More fans", "More earnings", "Faster growth"].map(
          (f) => (
            <div key={f} className="flex items-center gap-[12px]">
              <FaCheckCircle className="text-[20px] text-[#ECB35E]" />
              {f}
            </div>
          )
        )}
      </div>

      <div className="flex gap-[8px] text-[18px] font-[600]">
        <span className="text-[#00ABEA]">${price} / month</span>
        <span className="text-[#5C5C5C]">(Total ${totalPrice})</span>
      </div>
    </div>
  );
}

export default function Subscription() {
  const [selectedSubscription, setSelectedSubscription] = useState("");

  const subscriptions: ISubscription[] = [
    {
      _id: "1",
      periodMonth: 1,
      description: "Perfect for getting started if you don't have content yet.",
      price: 99,
      totalPrice: 99
    },
    {
      _id: "2",
      periodMonth: 3,
      description: "Ideal for those who already have content.",
      price: 79,
      totalPrice: 237
    }
  ];

  const handleSubscriptionClick = (subscriptionId: string) => () => {
    setSelectedSubscription(subscriptionId);
  };

  return (
    <section className="flex min-h-[calc(100vh-64px)] w-full flex-col overflow-x-hidden">
      <div className="flex w-full justify-center p-[32px]">
        <Card className="p-[16px]">
          <CardHeader>
            <CardTitle className="font-bc">Subscription</CardTitle>
            <CardDescription>
              Make changes to your subscription here. Click save when you're
              done.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col">
            <div className="flex w-full justify-center gap-[32px] max-sm:w-[600px]">
              {subscriptions.map((s) => (
                <SubscriptionCard
                  key={s._id}
                  {...s}
                  onClick={handleSubscriptionClick(s._id)}
                  isSelected={selectedSubscription === s._id}
                />
              ))}
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
        </Card>
      </div>
    </section>
  );
}
