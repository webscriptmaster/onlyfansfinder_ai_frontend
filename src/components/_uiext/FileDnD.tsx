/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */

"use client";

import { forwardRef, useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
import { LuPencil, LuUploadCloud } from "react-icons/lu";

import { Button } from "@/components/ui/button";

interface Props {
  defaultAvatar: React.ReactNode;
  name?: string;
  value?: File[];
  onChange?: Function;
}

function FileDnD({ defaultAvatar, name, value, onChange }: Props, ref: any) {
  const [files, setFiles] = useState<File[]>(value ?? []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (typeof onChange === "function") {
        onChange([...files, ...acceptedFiles].slice(-1));
      }

      setFiles((prev: File[]) => [...prev, ...acceptedFiles].slice(-1));
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": []
    },
    maxSize: 5 * 1024 * 1024,
    onDrop,
    multiple: false
  });

  return (
    <div className="" {...getRootProps()}>
      <input {...getInputProps()} />

      <div className="relative">
        {!files.length && defaultAvatar}

        {!!files.length && (
          <div className="w-full columns-1">
            {files.map((file, index) => (
              <img
                className="h-[200px] w-[200px] rounded-[50%] border border-[#00AFF0] object-cover"
                key={index}
                src={URL.createObjectURL(file)}
                alt="Creator Avatar"
              />
            ))}
          </div>
        )}

        <Button
          type="button"
          className="absolute bottom-0 right-[20px] rounded-full bg-[#00AFF0] p-2 hover:bg-[#00AFF0]/80"
        >
          <LuPencil className="h-[24px] w-[24px]" />
        </Button>
      </div>
    </div>
  );
}

export default forwardRef(FileDnD);
