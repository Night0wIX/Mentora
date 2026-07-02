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

interface ResolvedImageProps {
  src: string;
  alt: string;
  priority: boolean;
  placeholder: "blur" | "empty";
  blurDataURL: string | undefined;
  onLoad: () => void;
  onError: () => void;
}

interface UseImageReturn {
  status: ImageLoadingStatus;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  shimmerVisible: boolean;
  imageProps: ResolvedImageProps | null;
}

const LOADED_URL_CACHE_MAX_SIZE = 500;
const loadedUrlCache = new Set<string>();

function rememberLoadedUrl(url: string): void {
  if (loadedUrlCache.has(url)) return;

  if (loadedUrlCache.size >= LOADED_URL_CACHE_MAX_SIZE) {
    const oldestUrl = loadedUrlCache.values().next().value;
    if (oldestUrl !== undefined) loadedUrlCache.delete(oldestUrl);
  }

  loadedUrlCache.add(url);
}

function resolveInitialStatus(url: string | null): ImageLoadingStatus {
  if (!url) return "error";
  return loadedUrlCache.has(url) ? "loaded" : "idle";
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
    setStatus(resolveInitialStatus(src));
  }

  const handleLoad = useCallback(() => {
    if (src) rememberLoadedUrl(src);
    setStatus("loaded");
  }, [src]);

  const handleError = useCallback(() => {
    setStatus("error");
  }, []);

  const imageProps = useMemo<ResolvedImageProps | null>(() => {
    if (!src || status === "error") return null;

    return {
      src,
      alt,
      priority,
      placeholder: blurDataURL ? "blur" : "empty",
      blurDataURL,
      onLoad: handleLoad,
      onError: handleError,
    };
  }, [src, alt, priority, blurDataURL, status, handleLoad, handleError]);

  return {
    status,
    isLoading: status === "idle",
    isLoaded: status === "loaded",
    isError: status === "error",
    shimmerVisible: !reduceMotion && status === "idle",
    imageProps,
  };
}
