import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  tip: string;
}

export const Tooltip = ({ children, tip }: TooltipProps) => {
  return (
    <span className="relative group cursor-pointer flex items-center">
      {children}
      <span className="absolute bottom-[100%] p-1 rounded text-xs w-max max-w-[8rem] bg-black/90 border shadow hidden group-hover:block">
        {tip}
      </span>
    </span>
  );
};
