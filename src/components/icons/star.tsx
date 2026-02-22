import { SVGProps } from "react";

export const Star = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 0L2.44903 1.38197H3.90211L2.72654 2.23607L3.17557 3.61803L2 2.76393L0.82443 3.61803L1.27346 2.23607L0.0978869 1.38197H1.55097L2 0Z"
        fill="white"
      />
    </svg>
  );
};
