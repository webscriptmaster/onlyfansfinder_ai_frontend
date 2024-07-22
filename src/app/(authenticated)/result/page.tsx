import { Metadata } from "next";

import { SITE_TITLE } from "@/utils/constants";

import Header from "@/components/_layout/Header";
import Result from "@/components/result/Result";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Result`,
  description: `${SITE_TITLE} - Result`
};

export default function ResultPage() {
  return (
    <main>
      <Header />
      <Result />
    </main>
  );
}
