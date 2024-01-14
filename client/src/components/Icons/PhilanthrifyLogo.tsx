import React from "react";

interface PhilanthrifyLogoProps {
  width?: string;
  height: string;
}

const PhilanthrifyLogo: React.FC<PhilanthrifyLogoProps> = ({
  width,
  height,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "auto"}
      height={height}
      viewBox="0 0 41 36"
      fill="none"
    >
      <path
        d="M36.5023 20.2421L20.3222 36L4.401 20.4984L20.3222 4.3562L36.5023 20.2421Z"
        fill="#272FA0"
      />
      <path
        d="M41 11.2804C41 4.91245 36.0811 0.262689 29.8681 0.00646431C25.7259 -0.121649 22.8782 1.66587 20.3222 4.35623L36.5023 20.2422C39.35 17.6799 41 15.1296 41 11.2804Z"
        fill="#535EFF"
      />
      <path
        d="M11.3973 0.000308497C4.96339 0.000308776 0.265413 4.8687 0.00653229 11.018C-0.122909 15.1177 1.68273 17.9686 4.40099 20.4983L20.3222 4.35612C17.7334 1.53765 15.2865 0.000308329 11.3973 0.000308497Z"
        fill="#39D559"
      />
    </svg>
  );
};

export default PhilanthrifyLogo;
