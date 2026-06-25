import { CenteredLayout } from "@/shared/ui/centered-layout";
import { Spinner } from "@/shared/ui/spinner";

export default function Loading() {
  return (
    <CenteredLayout>
      <div
        role="status"
        aria-label="Loading page"
        className="flex flex-col items-center"
      >
        <Spinner className="mb-4 size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading</p>
      </div>
    </CenteredLayout>
  );
}
