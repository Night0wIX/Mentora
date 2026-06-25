"use client";

import { useCallback } from "react";

interface UseGoBackOptions {
  fallbackHref?: string;
}

export function useGoBack({ fallbackHref }: UseGoBackOptions = {}) {
  return useCallback(() => {
    const hasNavigableHistory = window.history.length > 1;

    if (hasNavigableHistory) {
      window.history.back();
      return;
    }

    if (fallbackHref) {
      window.location.assign(fallbackHref);
    }
  }, [fallbackHref]);
}
