"use client";

interface Props {
  className?: string;
}

export default function ResponsiveLogo({ className }: Props) {
  return <img className={className} src="/logo/logo.svg" alt="Logo" />;
}
