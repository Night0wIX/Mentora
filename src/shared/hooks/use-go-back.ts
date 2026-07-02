"use client";

import { useCallback } from "react";

interface UseGoBackOptions {
  fallbackHref?: string;
  navigate?: (href: string) => void;
}

export function useGoBack({
  fallbackHref,
  navigate = (href) => window.location.assign(href),
}: UseGoBackOptions = {}): () => void {
  return useCallback(() => {
    const hasNavigableHistory = window.history.length > 1;

    if (hasNavigableHistory) {
      window.history.back();
      return;
    }

    if (fallbackHref) {
      navigate(fallbackHref);
    }
  }, [fallbackHref, navigate]);
}
