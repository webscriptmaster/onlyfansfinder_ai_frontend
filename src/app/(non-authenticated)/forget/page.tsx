import { Metadata } from "next";

import { redirect } from "next/navigation";

import { SITE_TITLE } from "@/utils/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Forget`,
  description: `${SITE_TITLE} - Forget`
};

export default function ForgetPage() {
  redirect("/signin");

  return <main className="bg-[#F9F8F5]" />;
}
