import type { LoginFormValues } from "./login-form.types";

export const LOGIN_FORM_ERRORS = {
  emailRequired: "Email is required.",
  emailInvalid: "Enter a valid email address.",
  passwordRequired: "Password is required.",
  passwordMinLength: "Password must be at least 6 characters.",
} as const;

export const LOGIN_FORM_SUBMISSION_ERROR_MESSAGE =
  "Something went wrong. Please try again.";

export const LOGIN_FORM_DEFAULT_VALUES: LoginFormValues = {
  email: "",
  password: "",
};
