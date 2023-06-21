export const Tooltip = ({ children, tip }) => {
  return (
    <span className="relative group cursor-pointer">
      {children}
      <span className="absolute bottom-[80%] p-1 rounded text-xs w-max max-w-[8rem] bg-white border shadow hidden group-hover:block">
        {tip}
      </span>
    </span>
  );
};
