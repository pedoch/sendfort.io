export const Copy = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.2"
        d="M10.5 5.5V10.5H13.5V2.5H5.5V5.5H10.5Z"
        fill="white"
      />
      <path
        d="M10.5 10.5H13.5V2.5H5.5V5.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.5H2.5V13.5H10.5V5.5Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
