"use client";

import { v4 as uuidv4 } from "uuid";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  value: string;
  label: string;
}

export default function RadioGroupItemExt({ value, label }: Props) {
  const uuid = uuidv4();

  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={uuid} />
      <Label
        htmlFor={uuid}
        className="text-[16px] font-[400] text-[#303030] md:text-[18px]"
      >
        {label}
      </Label>
    </div>
  );
}
