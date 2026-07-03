import { z } from "zod";

import { COURSE_FORM_ERRORS } from "./course-form.constants";
import type { CourseFormValues } from "./course-form.types";

export const courseFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, COURSE_FORM_ERRORS.titleRequired)
    .max(120, COURSE_FORM_ERRORS.titleMaxLength),
  description: z
    .string()
    .trim()
    .max(2000, COURSE_FORM_ERRORS.descriptionMaxLength),
  coverImageUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || z.string().url().safeParse(value).success,
      COURSE_FORM_ERRORS.coverImageUrlInvalid,
    ),
  status: z.enum(["draft", "published"]),
}) satisfies z.ZodType<CourseFormValues>;
