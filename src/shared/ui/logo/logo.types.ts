import type { Ref, SVGProps } from "react";

import type { LOGO_SIZES } from "./logo.constants";

export type LogoSize = keyof typeof LOGO_SIZES;

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: LogoSize;
  ariaLabel?: string;
  ref?: Ref<SVGSVGElement>;
}
