export interface LoginFormValues {
  email: string;
  password: string;
}

export type LoginFormFieldErrors = Partial<
  Record<keyof LoginFormValues, string>
>;
