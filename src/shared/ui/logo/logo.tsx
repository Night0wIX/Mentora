import {
  LOGO_FILL_COLOR,
  LOGO_SIZES,
  LOGO_STROKE_COLOR,
  LOGO_SVG_STRUCTURE,
  LOGO_VIEWBOX,
} from "./logo.constants";
import type { LogoProps } from "./logo.types";

export const Logo = ({
  size = "md",
  ariaLabel,
  className,
  ref,
  ...props
}: LogoProps) => {
  const isDecorative = !ariaLabel;
  const sizeValue = LOGO_SIZES[size];

  const { background, shape, accent, centerline } = LOGO_SVG_STRUCTURE;

  return (
    <svg
      ref={ref}
      viewBox={LOGO_VIEWBOX}
      width={sizeValue}
      height={sizeValue}
      className={className}
      role={isDecorative ? undefined : "img"}
      aria-label={ariaLabel}
      aria-hidden={isDecorative || undefined}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={background.x}
        y={background.y}
        width={background.width}
        height={background.height}
        rx={background.rx}
        stroke={LOGO_STROKE_COLOR}
        strokeWidth={background.strokeWidth}
        fill={LOGO_FILL_COLOR}
      />

      <path
        d="M74 82 C92 74 112 76 128 90 C144 76 164 74 182 82 V164 C164 156 144 158 128 172 C112 158 92 156 74 164 V82Z"
        stroke={LOGO_STROKE_COLOR}
        strokeWidth={shape.strokeWidth}
        strokeLinejoin={shape.strokeLinejoin}
        fill={LOGO_FILL_COLOR}
      />

      <path
        d="M96 142V108 L128 136 L160 108 V142"
        stroke={LOGO_STROKE_COLOR}
        strokeWidth={accent.strokeWidth}
        strokeLinecap={accent.strokeLinecap}
        strokeLinejoin={accent.strokeLinejoin}
        fill={LOGO_FILL_COLOR}
      />

      <path
        d="M128 90V172"
        stroke={LOGO_STROKE_COLOR}
        strokeWidth={centerline.strokeWidth}
        strokeLinecap={centerline.strokeLinecap}
        fill={LOGO_FILL_COLOR}
      />
    </svg>
  );
};
