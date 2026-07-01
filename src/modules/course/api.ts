import { MOCK_COURSES } from "./mocks";
import type { Course } from "./types";

const MOCK_DELAY_MS = 600;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCourses(): Promise<Course[]> {
  await delay(MOCK_DELAY_MS);
  return MOCK_COURSES;
}
