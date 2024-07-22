"use client";

import clsx from "clsx";

import { Input } from "@/components/ui/input";

interface Props {
  autoFocus?: boolean;
  className?: string;
  type?: "text" | "email" | "password" | "number";
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputExt({
  autoFocus,
  className,
  type,
  id,
  name,
  placeholder,
  value,
  onChange
}: Props) {
  return (
    <Input
      autoFocus={autoFocus}
      className={clsx("h-[48px] md:h-[72px]", className)}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
