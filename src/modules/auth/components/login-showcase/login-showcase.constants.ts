import type {
  LoginShowcaseModule,
  LoginShowcaseModuleStatus,
} from "./login-showcase.types";

export const LOGIN_SHOWCASE_MODULES: LoginShowcaseModule[] = [
  {
    id: "structure-course",
    title: "Structure your course",
    status: "completed",
  },
  { id: "build-lessons", title: "Build the lessons", status: "completed" },
  {
    id: "publish-to-learners",
    title: "Publish to learners",
    status: "current",
  },
  { id: "track-progress", title: "Track their progress", status: "upcoming" },
];

export const LOGIN_SHOWCASE_MODULE_STATUS_LABEL: Record<
  LoginShowcaseModuleStatus,
  string
> = {
  completed: "Completed",
  current: "In progress",
  upcoming: "Not started yet",
};
