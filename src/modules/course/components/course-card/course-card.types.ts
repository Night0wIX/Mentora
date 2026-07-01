import type { Transition } from "motion/react";

import type { Course } from "../../types";

export interface CourseCardProps {
  course: Course;
  index?: number;
}

export interface CourseCardBodyProps {
  title: string;
  description: string | null;
  createdAt: string;
  transition: Transition;
}

export interface CourseCardCoverProps {
  title: string;
  imageUrl: string | null;
  priority: boolean;
  transition: Transition;
}
