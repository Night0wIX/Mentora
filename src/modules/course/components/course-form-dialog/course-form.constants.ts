import type { CourseFormValues } from "./course-form.types";

export const COURSE_FORM_DEFAULT_VALUES: CourseFormValues = {
  title: "",
  description: "",
  coverImageUrl: "",
  status: "draft",
};

export const COURSE_FORM_ERRORS = {
  titleRequired: "Title is required.",
  titleMaxLength: "Title must be 120 characters or fewer.",
  descriptionMaxLength: "Description must be 2000 characters or fewer.",
  coverImageUrlInvalid: "Enter a valid URL.",
} as const;

export const COURSE_FORM_SUBMISSION_ERROR_MESSAGE =
  "Something went wrong while saving the course. Please try again.";
