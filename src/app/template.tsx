"use client";

import LoadingOverlay from "@/components/_layout/LoadingOverlay";
import useAuthStore from "@/zustand/Auth";
import useFavoriteStore from "@/zustand/Favorite";
import useSearchStore from "@/zustand/Search";

export default function RootTemplate({
  children
}: {
  children: React.ReactNode;
}) {
  const auth = useAuthStore();
  const favorite = useFavoriteStore();
  const search = useSearchStore();

  const hasHydrated =
    auth.hasHydrated && favorite.hasHydrated && search.hasHydrated;

  return (
    <>
      {!hasHydrated && <LoadingOverlay loading />}

      {hasHydrated && children}
    </>
  );
}
