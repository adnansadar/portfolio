"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/ga";

type AnalyticsProviderProps = {
  gaId: string;
};

export default function AnalyticsProvider({ gaId }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    pageview(url);
  }, [pathname, searchParams, gaId]);

  return null;
}
