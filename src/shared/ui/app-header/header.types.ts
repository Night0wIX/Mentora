import type { ReactNode } from "react";

export interface HeaderProps {
  // Right-aligned content — auth/admin links, logout, etc
  actions: ReactNode;
}
