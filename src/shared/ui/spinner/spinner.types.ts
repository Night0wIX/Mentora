import type { VariantProps } from "class-variance-authority";
import type { SVGProps } from "react";

import type { spinnerVariants } from "./spinner.variants";

export type SpinnerSize = NonNullable<
  VariantProps<typeof spinnerVariants>["size"]
>;

export interface SpinnerProps
  extends SVGProps<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}
