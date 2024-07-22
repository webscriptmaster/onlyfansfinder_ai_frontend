"use client";

import { useEffect, useState } from "react";

import { BsTagFill } from "react-icons/bs";

import { v4 as uuidv4 } from "uuid";

export interface IChip {
  uuid: string;
  label: string;
}

function Chip(props: IChip) {
  const { uuid, label } = props;

  return (
    <div
      data-uuid={uuid}
      className="flex items-center justify-center gap-[8px] rounded-[10px] bg-[#ECB35E] px-[12px] py-[4px]"
    >
      <BsTagFill className="text-[20px] text-[#444444]" />
      <span className="font-ms text-[16px] font-[400] text-[#1A1A1A]">
        {label}
      </span>
    </div>
  );
}

interface Props {
  values?: IChip[];
  onChange?: (chips: IChip[]) => void;
}

export default function ChipInputExt({ values, onChange }: Props) {
  const [chips, setChips] = useState<IChip[]>(values ?? []);

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(chips);
    }
  }, [chips]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const label = (e.target as HTMLTextAreaElement).value.trim();
      setChips((prev) => [
        ...prev,
        {
          uuid: uuidv4(),
          label
        }
      ]);
      (e.target as HTMLTextAreaElement).value = "";
    }
  };

  return (
    <div className="flex min-h-[240px] flex-col gap-[16px] rounded-[5px] border border-[#8A8A8A] p-[16px]">
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-[16px]">
          {chips.map((c) => (
            <Chip key={c.uuid} {...c} />
          ))}
        </div>
      )}

      <textarea
        className="w-full flex-1 outline-none"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
