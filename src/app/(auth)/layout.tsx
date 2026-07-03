import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <main className="flex min-h-dvh flex-1">{children}</main>;
};

export default AuthLayout;
