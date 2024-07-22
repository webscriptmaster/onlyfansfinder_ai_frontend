"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface Props {
  type: "text" | "email" | "password";
  placeholder?: string;
  icon: React.ReactNode;

  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: (e: React.MouseEvent) => void;
}

export default function InputIconExt({
  type,
  placeholder,
  icon,
  onInputChange,
  onIconClick
}: Props) {
  return (
    <div className="relative w-full">
      <Input
        type={type}
        placeholder={placeholder}
        className="h-[48px] md:h-[72px]"
        onChange={onInputChange}
      />

      <div
        className="absolute right-[12px] top-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
        onClick={onIconClick}
      >
        {icon}
      </div>
    </div>
  );
}
