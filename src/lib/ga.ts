export const GA_ID: string | undefined =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

type GtagConfig = {
  page_path?: string;
  page_title?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export function isGaEnabled(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof GA_ID === "string" &&
    GA_ID.length > 0
  );
}

export function pageview(url: string): void {
  if (!isGaEnabled()) return;
  window.gtag(
    "config",
    GA_ID as string,
    {
      page_path: url,
    } as GtagConfig
  );
}

export function event(
  action: string,
  {
    category,
    label,
    value,
  }: { category?: string; label?: string; value?: number } = {}
): void {
  if (!isGaEnabled()) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}
