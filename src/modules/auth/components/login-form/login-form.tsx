"use client";

import { useForm } from "@tanstack/react-form";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { ROUTES } from "@/shared/config";
import { createSupabaseBrowserClient } from "@/shared/libs/supabase/client";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils";

import { GoogleIcon } from "../google-icon";
import {
  LOGIN_FORM_DEFAULT_VALUES,
  LOGIN_FORM_SUBMISSION_ERROR_MESSAGE,
} from "./login-form.constants";
import { loginFormSchema } from "./login-form.schema";
import { getFieldErrorMessage } from "./login-form.utils";

export function LoginForm() {
  const formInstanceId = useId();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");

  const loginForm = useForm({
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmissionErrorMessage("");

      const { error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      });

      if (error) {
        setSubmissionErrorMessage(
          error.message || LOGIN_FORM_SUBMISSION_ERROR_MESSAGE,
        );
        return;
      }

      router.push(ROUTES.adminCourses);
      router.refresh();
    },
  });

  const handleGoogleSignIn = async (): Promise<void> => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/callback` },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        aria-label="Sign in"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void loginForm.handleSubmit();
        }}
        className="flex flex-col gap-4"
        noValidate
      >
        <AnimatePresence initial={false}>
          {submissionErrorMessage && (
            <motion.div
              key="submission-error"
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="text-destructive bg-destructive/8 border-destructive/20 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm">
                <AlertCircle
                  className="mt-px size-3.5 shrink-0"
                  aria-hidden="true"
                />
                {submissionErrorMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <loginForm.Field name="email">
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
                  className="text-sm leading-none font-medium select-none"
                >
                  Email
                </label>
                <input
                  id={fieldId}
                  name={field.name}
                  type="email"
                  inputMode="email"
                  autoComplete="username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  required
                  placeholder="you@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={Boolean(errorMessage) || undefined}
                  aria-describedby={errorId}
                  className={cn(
                    "border-input placeholder:text-muted-foreground",
                    "flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs",
                    "outline-none transition-[color,box-shadow]",
                    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                  )}
                />
                <p
                  id={errorId}
                  aria-live="polite"
                  className="text-destructive flex min-h-4 items-center gap-1 text-xs"
                >
                  {errorMessage && (
                    <>
                      <AlertCircle
                        className="size-3 shrink-0"
                        aria-hidden="true"
                      />
                      {errorMessage}
                    </>
                  )}
                </p>
              </div>
            );
          }}
        </loginForm.Field>

        <loginForm.Field name="password">
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
                  className="text-sm leading-none font-medium select-none"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id={fieldId}
                    name={field.name}
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    required
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={Boolean(errorMessage) || undefined}
                    aria-describedby={errorId}
                    className={cn(
                      "border-input placeholder:text-muted-foreground",
                      "flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs",
                      "outline-none transition-[color,box-shadow]",
                      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                      "pr-9",
                    )}
                  />
                  <button
                    type="button"
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                    aria-pressed={isPasswordVisible}
                    aria-controls={fieldId}
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    className={cn(
                      "text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 transition-colors",
                      "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-sm",
                    )}
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <p
                  id={errorId}
                  aria-live="polite"
                  className="text-destructive flex min-h-4 items-center gap-1 text-xs"
                >
                  {errorMessage && (
                    <>
                      <AlertCircle
                        className="size-3 shrink-0"
                        aria-hidden="true"
                      />
                      {errorMessage}
                    </>
                  )}
                </p>
              </div>
            );
          }}
        </loginForm.Field>

        <loginForm.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              fullWidth
              disabled={!canSubmit}
              loading={isSubmitting}
              loadingText="Signing in"
            >
              Sign In
            </Button>
          )}
        </loginForm.Subscribe>
      </form>

      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="border-border h-px flex-1 border-t" />
        <span className="text-muted-foreground text-xs">or</span>
        <span className="border-border h-px flex-1 border-t" />
      </div>

      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={handleGoogleSignIn}
      >
        <GoogleIcon className="size-4" />
        Continue with Google
      </Button>
    </div>
  );
}
