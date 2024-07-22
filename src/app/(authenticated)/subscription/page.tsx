import { Metadata } from "next";

import { SITE_TITLE } from "@/utils/constants";

import Header from "@/components/_layout/Header";
import Subscription from "@/components/subscription/Subscription";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Subscription`,
  description: `${SITE_TITLE} - Subscription`
};

export default function SubscriptionPage() {
  return (
    <main>
      <Header />
      <Subscription />
    </main>
  );
}
