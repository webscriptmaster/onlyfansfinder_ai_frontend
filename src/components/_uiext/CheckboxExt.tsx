"use client";

import { CheckedState } from "@radix-ui/react-checkbox";
import { v4 as uuidv4 } from "uuid";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  checked?: boolean;
  onCheckChange?: (checked: CheckedState) => void;
}

export default function CheckboxExt({ label, checked, onCheckChange }: Props) {
  const uuid = uuidv4();

  return (
    <div className="flex items-center gap-[12px]">
      <Checkbox
        id={uuid}
        className="h-[20px] w-[20px] rounded-none data-[state=checked]:border-[#00AFF0] data-[state=checked]:bg-[#00AFF0]"
        checked={checked}
        onCheckedChange={onCheckChange}
      />
      <Label
        htmlFor={uuid}
        className="text-[16px] font-[400] text-[#303030] md:text-[18px]"
      >
        {label}
      </Label>
    </div>
  );
}
