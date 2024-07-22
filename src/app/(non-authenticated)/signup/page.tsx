import { Metadata } from "next";

import SignUp from "@/components/signup/SignUp";

import { SITE_TITLE } from "@/utils/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Sign Up`,
  description: `${SITE_TITLE} - Sign Up`
};

export default function SignupPage() {
  return (
    <main>
      <SignUp />
    </main>
  );
}
