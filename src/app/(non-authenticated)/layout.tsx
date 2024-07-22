"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import useAuthStore from "@/zustand/Auth";
import LoadingOverlay from "@/components/_layout/LoadingOverlay";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const auth = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized && auth.user?._id) {
      router.push("/search");
    }
  }, [initialized]);

  if (!initialized) return <LoadingOverlay loading />;

  if (initialized && !auth.user?._id) return children;

  return <LoadingOverlay loading />;
}
