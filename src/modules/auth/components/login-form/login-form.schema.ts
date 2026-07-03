import { z } from "zod";

import { LOGIN_FORM_ERRORS } from "./login-form.constants";
import type { LoginFormValues } from "./login-form.types";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, LOGIN_FORM_ERRORS.emailRequired)
    .pipe(z.email(LOGIN_FORM_ERRORS.emailInvalid)),
  password: z
    .string()
    .min(1, LOGIN_FORM_ERRORS.passwordRequired)
    .min(6, LOGIN_FORM_ERRORS.passwordMinLength),
}) satisfies z.ZodType<LoginFormValues>;
