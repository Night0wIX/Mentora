import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Mentora",
  description: "Course management platform",
  locale: "uk_UA",
} as const;

export const BASE_METADATA: Metadata = {
  title: { default: SITE_CONFIG.name, template: `%s | ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
};
