import { Metadata } from "next";

import { SITE_TITLE } from "@/utils/constants";

import Header from "@/components/_layout/Header";
import Profile from "@/components/profile/Profile";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Profile`,
  description: `${SITE_TITLE} - Profile`
};

export default function ProfilePage() {
  return (
    <main>
      <Header />
      <Profile />
    </main>
  );
}
