import type { Metadata } from "next";

import { CenteredLayout } from "@/shared/ui/centered-layout";

import { LoginForm, LoginShowcase } from "@/modules/auth";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to access the admin panel.",
};

const LoginPage = () => {
  return (
    <>
      <LoginShowcase />

      <CenteredLayout className="lg:w-1/2 lg:flex-none">
        <div className="animate-in fade-in slide-in-from-bottom-2 flex w-full max-w-sm flex-col gap-8 duration-500 motion-reduce:animate-none">
          <div className="flex flex-col gap-2">
            <span className="bg-foreground text-background mb-2 flex size-8 items-center justify-center rounded-md text-sm font-semibold lg:hidden">
              M
            </span>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to manage courses, lessons, and learners.
            </p>
          </div>

          <LoginForm />
        </div>
      </CenteredLayout>
    </>
  );
};

export default LoginPage;
