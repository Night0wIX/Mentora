import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to access the admin panel.",
};

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Login page</h1>
    </div>
  );
}
