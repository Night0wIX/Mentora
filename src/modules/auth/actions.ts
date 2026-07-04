"use server";

import { redirect } from "next/navigation";

import { ROUTES } from "@/shared/config";
import { createSupabaseServerClient } from "@/shared/libs/supabase/server";

export async function signOutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect(ROUTES.login);
}
