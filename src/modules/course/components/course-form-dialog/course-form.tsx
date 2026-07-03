"use client";

import { useForm } from "@tanstack/react-form";
import { AlertCircle } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils";

import { createCourseAction, updateCourseAction } from "../../admin-actions";
import type { Course, CourseStatus } from "../../types";
import {
  COURSE_FORM_DEFAULT_VALUES,
  COURSE_FORM_SUBMISSION_ERROR_MESSAGE,
} from "./course-form.constants";
import { courseFormSchema } from "./course-form.schema";
import type { CourseFormMode, CourseFormValues } from "./course-form.types";
import { getFieldErrorMessage } from "./course-form.utils";

const TEXT_INPUT_CLASS_NAME = cn(
  "border-input placeholder:text-muted-foreground",
  "flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs",
  "outline-none transition-[color,box-shadow]",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
);

interface FieldErrorProps {
  id: string;
  message: string | undefined;
}

const FieldError = ({ id, message }: FieldErrorProps) => (
  <p
    id={id}
    aria-live="polite"
    className="flex min-h-4 items-center gap-1 text-xs text-destructive"
  >
    {message && (
      <>
        <AlertCircle className="size-3 shrink-0" aria-hidden="true" />
        {message}
      </>
    )}
  </p>
);

function getDefaultValuesForMode(mode: CourseFormMode): CourseFormValues {
  if (mode.type === "create") return COURSE_FORM_DEFAULT_VALUES;

  return {
    title: mode.course.title,
    description: mode.course.description ?? "",
    coverImageUrl: mode.course.coverImageUrl ?? "",
    status: "draft" as CourseStatus,
  };
}

interface CourseFormProps {
  mode: CourseFormMode;
  onSuccess: (course: Course) => void;
  onCancel: () => void;
}

export const CourseForm = ({ mode, onSuccess, onCancel }: CourseFormProps) => {
  const formInstanceId = useId();
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");

  const courseForm = useForm({
    defaultValues: getDefaultValuesForMode(mode),
    validators: {
      onChange: courseFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmissionErrorMessage("");

      const payload = {
        title: value.title,
        description: value.description === "" ? null : value.description,
        coverImageUrl: value.coverImageUrl === "" ? null : value.coverImageUrl,
        status: "draft" as CourseStatus,
      };

      const result =
        mode.type === "create"
          ? await createCourseAction(payload)
          : await updateCourseAction(mode.course.id, payload);

      if (!result.success) {
        setSubmissionErrorMessage(
          result.error ?? COURSE_FORM_SUBMISSION_ERROR_MESSAGE,
        );
        return;
      }

      onSuccess(result.course);
    },
  });

  return (
    <form
      aria-label={mode.type === "create" ? "Create course" : "Edit course"}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void courseForm.handleSubmit();
      }}
      className="flex flex-col gap-4"
      noValidate
    >
      {submissionErrorMessage && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/8 px-3 py-2.5 text-sm text-destructive"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          {submissionErrorMessage}
        </div>
      )}

      <courseForm.Field name="title">
        {(field) => {
          const errorMessage = getFieldErrorMessage(
            field.state.meta.errors,
            field.state.meta.isTouched,
          );
          const fieldId = `${formInstanceId}-${field.name}`;
          const errorId = `${fieldId}-error`;

          return (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={fieldId}
                className="text-sm font-medium leading-none select-none"
              >
                Title
              </label>
              <input
                id={fieldId}
                name={field.name}
                type="text"
                required
                placeholder="Course title"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={Boolean(errorMessage) || undefined}
                aria-describedby={errorId}
                className={TEXT_INPUT_CLASS_NAME}
              />
              <FieldError id={errorId} message={errorMessage} />
            </div>
          );
        }}
      </courseForm.Field>

      <courseForm.Field name="description">
        {(field) => {
          const errorMessage = getFieldErrorMessage(
            field.state.meta.errors,
            field.state.meta.isTouched,
          );
          const fieldId = `${formInstanceId}-${field.name}`;
          const errorId = `${fieldId}-error`;

          return (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={fieldId}
                className="text-sm font-medium leading-none select-none"
              >
                Description
              </label>
              <textarea
                id={fieldId}
                name={field.name}
                rows={4}
                placeholder="Short course description"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={Boolean(errorMessage) || undefined}
                aria-describedby={errorId}
                className={cn(
                  TEXT_INPUT_CLASS_NAME,
                  "h-auto min-h-20 resize-y py-2",
                )}
              />
              <FieldError id={errorId} message={errorMessage} />
            </div>
          );
        }}
      </courseForm.Field>

      <courseForm.Field name="coverImageUrl">
        {(field) => {
          const errorMessage = getFieldErrorMessage(
            field.state.meta.errors,
            field.state.meta.isTouched,
          );
          const fieldId = `${formInstanceId}-${field.name}`;
          const errorId = `${fieldId}-error`;

          return (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={fieldId}
                className="text-sm font-medium leading-none select-none"
              >
                Cover image URL
              </label>
              <input
                id={fieldId}
                name={field.name}
                type="url"
                inputMode="url"
                placeholder="https://example.com/cover.jpg"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={Boolean(errorMessage) || undefined}
                aria-describedby={errorId}
                className={TEXT_INPUT_CLASS_NAME}
              />
              <FieldError id={errorId} message={errorMessage} />
            </div>
          );
        }}
      </courseForm.Field>

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <courseForm.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              loading={isSubmitting}
              loadingText={mode.type === "create" ? "Creating" : "Saving"}
            >
              {mode.type === "create" ? "Create course" : "Save changes"}
            </Button>
          )}
        </courseForm.Subscribe>
      </div>
    </form>
  );
};
