export type LoginShowcaseModuleStatus = "completed" | "current" | "upcoming";

export interface LoginShowcaseModule {
  id: string;
  title: string;
  status: LoginShowcaseModuleStatus;
}
