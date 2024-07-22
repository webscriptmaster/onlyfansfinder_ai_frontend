import { Metadata } from "next";

import { redirect } from "next/navigation";

import { SITE_TITLE } from "@/utils/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Landing`,
  description: `${SITE_TITLE} - Landing`
};

export default function HomePage() {
  redirect("/signin");

  return null;
}
