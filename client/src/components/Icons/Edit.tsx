import { useTheme } from "@mui/material";

const Edit = () => {
  const { palette } = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M21 18.5002L19.9999 19.5943C19.4695 20.1744 18.7501 20.5002 18.0001 20.5002C17.2501 20.5002 16.5308 20.1744 16.0004 19.5943C15.4692 19.0154 14.75 18.6903 14.0002 18.6903C13.2504 18.6903 12.5311 19.0154 12 19.5943M3 20.5002H4.67454C5.16372 20.5002 5.40832 20.5002 5.63849 20.445C5.84256 20.396 6.03765 20.3152 6.2166 20.2055C6.41843 20.0818 6.59138 19.9089 6.93729 19.563L19.5 7.00023C20.3285 6.1718 20.3285 4.82865 19.5 4.00023C18.6716 3.1718 17.3285 3.1718 16.5 4.00023L3.93726 16.563C3.59136 16.9089 3.4184 17.0818 3.29472 17.2837C3.18506 17.4626 3.10425 17.6577 3.05526 17.8618C3 18.0919 3 18.3365 3 18.8257V20.5002Z"
        stroke={palette.grey[500]}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Edit;