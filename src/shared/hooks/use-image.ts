"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import { useMotion } from "@/shared/libs/motion";

type ImageLoadingStatus = "idle" | "loaded" | "error";

interface UseImageOptions {
  src: string | null;
  alt: string;
  priority?: boolean;
  blurDataURL?: string;
}

interface UseImageReturn {
  status: ImageLoadingStatus;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  shimmerVisible: boolean;
  imageProps: {
    src: string;
    alt: string;
    priority: boolean;
    placeholder: "blur" | "empty";
    blurDataURL: string | undefined;
    onLoad: () => void;
    onError: () => void;
  } | null;
}

const loadedUrlCache = new Set<string>();

function resolveInitialStatus(url: string | null): ImageLoadingStatus {
  if (!url) return "error";
  if (loadedUrlCache.has(url)) return "loaded";
  return "idle";
}

function isShimmerVisible(status: ImageLoadingStatus): boolean {
  return status === "idle";
}

export function useImage({
  src,
  alt,
  priority = false,
  blurDataURL,
}: UseImageOptions): UseImageReturn {
  const { reduceMotion } = useMotion();

  const [status, setStatus] = useState<ImageLoadingStatus>(() =>
    resolveInitialStatus(src),
  );

  const prevSrcRef = useRef(src);

  if (prevSrcRef.current !== src) {
    prevSrcRef.current = src;
    const next = resolveInitialStatus(src);
    setStatus(next);
  }

  const handleLoad = useCallback(() => {
    if (src) loadedUrlCache.add(src);
    setStatus("loaded");
  }, [src]);

  const handleError = useCallback(() => {
    setStatus("error");
  }, []);

  const imageProps = useMemo(() => {
    if (!src || status === "error") return null;

    return {
      src,
      alt,
      priority,
      placeholder: blurDataURL ? ("blur" as const) : ("empty" as const),
      blurDataURL,
      onLoad: handleLoad,
      onError: handleError,
    };
  }, [src, alt, priority, blurDataURL, status, handleLoad, handleError]);

  return {
    status,
    isLoading: status === "idle",
    isLoaded: status === "loaded",
    isError: status === "error" || !src,
    shimmerVisible: !reduceMotion && isShimmerVisible(status),
    imageProps,
  };
}
