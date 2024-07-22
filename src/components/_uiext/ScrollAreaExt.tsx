"use client";

import { v4 as uuidv4 } from "uuid";

import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  children: React.ReactNode;
}

export default function ScrollAreaExt({ children }: Props) {
  const uuid = uuidv4();

  return (
    <div className="flex items-center gap-[12px] w-full">
      <ScrollArea
        id={uuid}
        className=" data-[state=checked]:border-[#EFEFEF] data-[state=checked]:bg-[#EFEFEF] min-h-[200px] h-[200px] max-h-[400px] w-full"
      >
        {children}
      </ScrollArea>
    </div>
  );
}
