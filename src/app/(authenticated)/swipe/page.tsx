import { Metadata } from "next";

import { SITE_TITLE } from "@/utils/constants";

import Header from "@/components/_layout/Header";
import Swipe from "@/components/swipe/Swipe";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Swipe`,
  description: `${SITE_TITLE} - Swipe`
};

export default function SwipePage() {
  return (
    <main>
      <Header />
      <Swipe />
    </main>
  );
}
