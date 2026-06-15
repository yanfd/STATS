import { YANFD_LOGO_FULL, YANFD_MARK_FULL } from "./paths";

type YanfdLogoProps = {
  className?: string;
  markClassName?: string;
  showText?: boolean;
};

export function YanfdLogo({ className = "", markClassName = "h-16 w-auto", showText = true }: YanfdLogoProps) {
  const src = showText ? YANFD_LOGO_FULL : YANFD_MARK_FULL;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src={src}
        alt="YANFD Presents"
        draggable={false}
        className={`block object-contain ${markClassName}`}
      />
    </div>
  );
}
