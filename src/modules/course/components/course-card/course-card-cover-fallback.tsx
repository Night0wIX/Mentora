import { BookOpen } from "lucide-react";

import { COURSE_CARD_COVER_ASPECT_RATIO } from "./course-card.constants";

interface CourseCardCoverFallbackProps {
  title: string;
}

export const CourseCardCoverFallback = ({
  title,
}: CourseCardCoverFallbackProps) => {
  return (
    <div
      role="img"
      aria-label={title}
      className="relative flex items-center justify-center bg-muted"
      style={{ aspectRatio: COURSE_CARD_COVER_ASPECT_RATIO }}
    >
      <BookOpen
        aria-hidden
        className="h-8 w-8 text-muted-foreground/40"
        strokeWidth={1.5}
      />
    </div>
  );
};
