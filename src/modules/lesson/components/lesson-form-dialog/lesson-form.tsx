"use client";

import { useForm } from "@tanstack/react-form";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils";

import { createLessonAction, updateLessonAction } from "../../admin-actions";
import { LESSON_FORM_SUBMISSION_ERROR_MESSAGE } from "../../constants";
import type { Lesson } from "../../types";
import { LESSON_FORM_DEFAULT_VALUES } from "./lesson-form.constants";
import { lessonFormSchema } from "./lesson-form.schema";
import type { LessonFormMode, LessonFormValues } from "./lesson-form.types";
import { getFieldErrorMessage } from "./lesson-form.utils";

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

function getDefaultValuesForMode(mode: LessonFormMode): LessonFormValues {
  if (mode.type === "create") return LESSON_FORM_DEFAULT_VALUES;

  return { title: mode.lesson.title };
}

interface LessonFormProps {
  mode: LessonFormMode;
  onSuccess: (lesson: Lesson) => void;
  onCancel: () => void;
}

export const LessonForm = ({ mode, onSuccess, onCancel }: LessonFormProps) => {
  const formInstanceId = useId();
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");

  const lessonForm = useForm({
    defaultValues: getDefaultValuesForMode(mode),
    validators: {
      onChange: lessonFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmissionErrorMessage("");

      const result =
        mode.type === "create"
          ? await createLessonAction({
              courseId: mode.courseId,
              title: value.title,
            })
          : await updateLessonAction(mode.lesson.courseId, mode.lesson.id, {
              title: value.title,
            });

      if (!result.success) {
        setSubmissionErrorMessage(
          result.error ?? LESSON_FORM_SUBMISSION_ERROR_MESSAGE,
        );
        return;
      }

      onSuccess(result.lesson);
    },
  });

  return (
    <form
      aria-label={mode.type === "create" ? "Add lesson" : "Edit lesson"}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void lessonForm.handleSubmit();
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

      <lessonForm.Field name="title">
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
                placeholder="Lesson title"
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
      </lessonForm.Field>

      {mode.type === "edit" && (
        <p className="text-xs text-muted-foreground">
          Need to edit the content?{" "}
          <Link
            href={ROUTES.adminLesson(mode.lesson.courseId, mode.lesson.id)}
            className="font-medium underline underline-offset-2"
          >
            Open lesson page
          </Link>
        </p>
      )}

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <lessonForm.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              loading={isSubmitting}
              loadingText={mode.type === "create" ? "Adding" : "Saving"}
            >
              {mode.type === "create" ? "Add lesson" : "Save changes"}
            </Button>
          )}
        </lessonForm.Subscribe>
      </div>
    </form>
  );
};
