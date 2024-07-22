"use client";

import clsx from "clsx";

import { Button } from "@/components/ui/button";

interface Props {
  type?: "button" | "reset" | "submit";
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export default function ButtonExt({
  type,
  children,
  className,
  onClick
}: Props) {
  return (
    <Button
      type={type ?? "button"}
      onClick={onClick}
      className={clsx(
        "font-ms h-[48px] w-full bg-[#00AFF0] text-center text-[16px] font-[500] text-[#FFFFFF] hover:bg-[#1796D4] md:h-[60px] md:text-[20px]",
        className
      )}
    >
      {children}
    </Button>
  );
}
