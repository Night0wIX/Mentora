"use client";

import { motion } from "motion/react";
import type { Route } from "next";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { useMotion, useMotionTransition } from "@/shared/libs/motion";
import { cn } from "@/shared/utils";

import {
  COURSE_CARD_ENTRANCE_OFFSET_Y_PX,
  COURSE_CARD_MAX_STAGGER_DELAY_S,
  COURSE_CARD_PRIORITY_COUNT,
  COURSE_CARD_STAGGER_DELAY_S,
  COURSE_CARD_TAP_SCALE,
} from "./course-card.constants";
import type { CourseCardProps } from "./course-card.types";
import { CourseCardBody } from "./course-card-body";
import { CourseCardCover } from "./course-card-cover";

const MotionLink = motion.create(Link);

const LINK_VARIANTS = {
  rest: { borderColor: "var(--border)", boxShadow: "none" },
  hover: {
    borderColor: "var(--border-strong, var(--foreground))",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  },
};

function getStaggerDelay(index: number, reduceMotion: boolean): number {
  if (reduceMotion) return 0;
  return Math.min(
    index * COURSE_CARD_STAGGER_DELAY_S,
    COURSE_CARD_MAX_STAGGER_DELAY_S,
  );
}

export const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
  const { isMobileViewport, reduceMotion } = useMotion();

  const appearTransition = useMotionTransition({
    delay: getStaggerDelay(index, reduceMotion),
    ease: "easeOut",
  });

  const interactionTransition = useMotionTransition();

  const entranceOffsetY = reduceMotion ? 0 : COURSE_CARD_ENTRANCE_OFFSET_Y_PX;

  return (
    <motion.li
      role="listitem"
      className="list-none"
      initial={{ opacity: 0, y: entranceOffsetY }}
      animate={{ opacity: 1, y: 0 }}
      transition={appearTransition}
    >
      <MotionLink
        href={ROUTES.course(course.slug) as Route}
        initial="rest"
        whileHover={isMobileViewport ? undefined : "hover"}
        whileFocus="hover"
        whileTap={
          isMobileViewport ? { scale: COURSE_CARD_TAP_SCALE } : undefined
        }
        variants={LINK_VARIANTS}
        transition={interactionTransition}
        className={cn(
          "group relative block overflow-hidden rounded-2xl border bg-card",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        <CourseCardCover
          title={course.title}
          imageUrl={course.coverImageUrl}
          priority={index < COURSE_CARD_PRIORITY_COUNT}
          transition={interactionTransition}
        />
        <CourseCardBody
          title={course.title}
          description={course.description}
          createdAt={course.createdAt}
          transition={interactionTransition}
        />
      </MotionLink>
    </motion.li>
  );
};
