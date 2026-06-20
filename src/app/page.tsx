import { ThemeToggle } from "@/shared/ui/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <ThemeToggle />
      <p>Course admin panel</p>
    </main>
  );
}
