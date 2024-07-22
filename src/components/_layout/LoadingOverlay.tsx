"use client";

import { Hearts } from "react-loader-spinner";

interface Props {
  loading: boolean;
}

export default function LoadingOverlay({ loading }: Props) {
  if (!loading) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#FFFFFF]"
      style={{ zIndex: 2000 }}
    >
      <Hearts
        height="120"
        width="120"
        color="#00AFF0"
        wrapperStyle={{}}
        wrapperClass=""
        visible
      />
    </div>
  );
}
