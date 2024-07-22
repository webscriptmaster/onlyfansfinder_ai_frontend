import { Metadata } from "next";

import { SITE_TITLE } from "@/utils/constants";

import Header from "@/components/_layout/Header";
import Favorite from "@/components/favorite/Favorite";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Favorite`,
  description: `${SITE_TITLE} - Favorite`
};

export default function FavoritePage() {
  return (
    <main>
      <Header />
      <Favorite />
    </main>
  );
}
