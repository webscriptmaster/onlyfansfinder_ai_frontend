import { Metadata } from "next";

import SignIn from "@/components/signin/SignIn";

import { SITE_TITLE } from "@/utils/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Sign In`,
  description: `${SITE_TITLE} - Sign In`
};

export default function SigninPage() {
  return (
    <main>
      <SignIn />
    </main>
  );
}
