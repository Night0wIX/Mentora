"use client";

import { motion, type Transition } from "motion/react";
import Image from "next/image";

import { useImage } from "@/shared/hooks";

import {
  COURSE_CARD_COVER_ASPECT_RATIO,
  COURSE_CARD_HOVER_SCALE,
  COURSE_CARD_IMAGE_QUALITY,
  COURSE_CARD_IMAGE_SIZES,
} from "./course-card.constants";
import type { CourseCardCoverProps } from "./course-card.types";
import { CourseCardCoverFallback } from "./course-card-cover-fallback";
import { CourseCardCoverLoading } from "./course-card-cover-loading";

const COVER_VARIANTS = {
  rest: { scale: 1 },
  hover: { scale: COURSE_CARD_HOVER_SCALE },
};

interface CourseCardCoverInternalProps extends CourseCardCoverProps {
  transition: Transition;
}

export const CourseCardCover = ({
  title,
  imageUrl,
  priority,
  transition,
}: CourseCardCoverInternalProps) => {
  const { isError, shimmerVisible, imageProps } = useImage({
    src: imageUrl,
    alt: title,
    priority,
  });

  if (isError || !imageProps) return <CourseCardCoverFallback title={title} />;

  return (
    <div
      className="relative overflow-hidden bg-muted"
      style={{ aspectRatio: COURSE_CARD_COVER_ASPECT_RATIO }}
    >
      {shimmerVisible && <CourseCardCoverLoading />}

      <motion.div
        variants={COVER_VARIANTS}
        transition={transition}
        className="h-full w-full"
      >
        <Image
          fill
          sizes={COURSE_CARD_IMAGE_SIZES}
          quality={COURSE_CARD_IMAGE_QUALITY}
          className="object-cover"
          {...imageProps}
        />
      </motion.div>
    </div>
  );
};
