export const Button = ({
  children,
  className,
  btnClassName,
  disableBottom,
  ...rest
}) => {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`text-sm rounded px-3 py-2 bg-primary text-white z-10 invisible whitespace-nowrap ${btnClassName}`}
      >
        {children}
      </div>
      <button
        className={`absolute text-sm rounded px-3 py-2 text-white bg-primary w-full z-[2] whitespace-nowrap ${
          !disableBottom ? "top-0 active:top-0.5" : "top-0"
        } ${btnClassName}`}
        {...rest}
      >
        {children}
      </button>
      {!disableBottom && (
        <div
          className={`absolute text-sm rounded px-3 py-2 text-white !bg-secondary top-1.5 w-full ${btnClassName}`}
        >
          <span
            aria-hidden
            className="invisible"
          >
            {children}
          </span>
        </div>
      )}
    </div>
  );
};
