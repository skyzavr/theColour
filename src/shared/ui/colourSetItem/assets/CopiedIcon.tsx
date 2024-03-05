export const CopiedIcon = ({ iconColour }: { iconColour: string }) => {
  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10C4 7.172 4 5.757 4.879 4.879C5.757 4 7.172 4 10 4H13C15.828 4 17.243 4 18.121 4.879C19 5.757 19 7.172 19 10V15C19 17.828 19 19.243 18.121 20.121C17.243 21 15.828 21 13 21H10C7.172 21 5.757 21 4.879 20.121C4 19.243 4 17.828 4 15V10Z"
        stroke={iconColour}
        strokeWidth="1.5"
      />
      <path
        d="M4 18C3.20435 18 2.44129 17.6839 1.87868 17.1213C1.31607 16.5587 1 15.7956 1 15V9C1 5.229 1 3.343 2.172 2.172C3.343 1 5.229 1 9 1H13C13.7956 1 14.5587 1.31607 15.1213 1.87868C15.6839 2.44129 16 3.20435 16 4"
        stroke={iconColour}
        strokeWidth="1.5"
      />
    </svg>
  );
};
