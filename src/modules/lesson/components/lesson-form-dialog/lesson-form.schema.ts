import { z } from "zod";

export const lessonFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(120, "Title must be under 120 characters"),
});
