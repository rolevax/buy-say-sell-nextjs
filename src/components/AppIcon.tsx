import { SvgIcon } from "@mui/material";

export default function BuySaySellIcon() {
  return (
    <SvgIcon>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth={1.5}
        stroke="currentColor"
        fill="none"
      >
        <path
          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H8l-4 4V6c0-1.1.9-2 2-2z"
          fill="none"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text x="12" y="15" fontSize="8" textAnchor="middle">
          $
        </text>
      </svg>
    </SvgIcon>
  );
}
