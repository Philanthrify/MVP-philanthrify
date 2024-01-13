import React from "react";

interface InstagramProps {
  webLink: string;
}

const Instagram: React.FC<InstagramProps> = ({ webLink }) => {
  return (
    <a
      href={webLink}
      className="social-icon"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <rect
          x="1.25"
          y="1.25"
          width="17.5"
          height="17.5"
          rx="6"
          fill="url(#paint0_radial_1435_9286)"
        />
        <rect
          x="1.25"
          y="1.25"
          width="17.5"
          height="17.5"
          rx="6"
          fill="url(#paint1_radial_1435_9286)"
        />
        <rect
          x="1.25"
          y="1.25"
          width="17.5"
          height="17.5"
          rx="6"
          fill="url(#paint2_radial_1435_9286)"
        />
        <path
          d="M14.375 6.5625C14.375 7.08027 13.9553 7.5 13.4375 7.5C12.9197 7.5 12.5 7.08027 12.5 6.5625C12.5 6.04473 12.9197 5.625 13.4375 5.625C13.9553 5.625 14.375 6.04473 14.375 6.5625Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125ZM10 11.875C11.0355 11.875 11.875 11.0355 11.875 10C11.875 8.96447 11.0355 8.125 10 8.125C8.96447 8.125 8.125 8.96447 8.125 10C8.125 11.0355 8.96447 11.875 10 11.875Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.75 9.75C3.75 7.6498 3.75 6.5997 4.15873 5.79754C4.51825 5.09193 5.09193 4.51825 5.79754 4.15873C6.5997 3.75 7.6498 3.75 9.75 3.75H10.25C12.3502 3.75 13.4003 3.75 14.2025 4.15873C14.9081 4.51825 15.4817 5.09193 15.8413 5.79754C16.25 6.5997 16.25 7.6498 16.25 9.75V10.25C16.25 12.3502 16.25 13.4003 15.8413 14.2025C15.4817 14.9081 14.9081 15.4817 14.2025 15.8413C13.4003 16.25 12.3502 16.25 10.25 16.25H9.75C7.6498 16.25 6.5997 16.25 5.79754 15.8413C5.09193 15.4817 4.51825 14.9081 4.15873 14.2025C3.75 13.4003 3.75 12.3502 3.75 10.25V9.75ZM9.75 5H10.25C11.3207 5 12.0486 5.00097 12.6112 5.04694C13.1592 5.09171 13.4395 5.17287 13.635 5.27248C14.1054 5.51217 14.4878 5.89462 14.7275 6.36502C14.8271 6.56052 14.9083 6.84078 14.9531 7.3888C14.999 7.95141 15 8.67928 15 9.75V10.25C15 11.3207 14.999 12.0486 14.9531 12.6112C14.9083 13.1592 14.8271 13.4395 14.7275 13.635C14.4878 14.1054 14.1054 14.4878 13.635 14.7275C13.4395 14.8271 13.1592 14.9083 12.6112 14.9531C12.0486 14.999 11.3207 15 10.25 15H9.75C8.67928 15 7.95141 14.999 7.3888 14.9531C6.84078 14.9083 6.56052 14.8271 6.36502 14.7275C5.89462 14.4878 5.51217 14.1054 5.27248 13.635C5.17287 13.4395 5.09171 13.1592 5.04694 12.6112C5.00097 12.0486 5 11.3207 5 10.25V9.75C5 8.67928 5.00097 7.95141 5.04694 7.3888C5.09171 6.84078 5.17287 6.56052 5.27248 6.36502C5.51217 5.89462 5.89462 5.51217 6.36502 5.27248C6.56052 5.17287 6.84078 5.09171 7.3888 5.04694C7.95141 5.00097 8.67928 5 9.75 5Z"
          fill="white"
        />
        <defs>
          <radialGradient
            id="paint0_radial_1435_9286"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(7.5 14.375) rotate(-55.3758) scale(15.9498)"
          >
            <stop stop-color="#B13589" />
            <stop offset="0.79309" stop-color="#C62F94" />
            <stop offset="1" stop-color="#8A3AC8" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_1435_9286"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(6.875 19.375) rotate(-65.1363) scale(14.1214)"
          >
            <stop stop-color="#E0E8B7" />
            <stop offset="0.444662" stop-color="#FB8A2E" />
            <stop offset="0.71474" stop-color="#E2425C" />
            <stop offset="1" stop-color="#E2425C" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_1435_9286"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(0.312501 1.875) rotate(-8.1301) scale(24.3068 5.19897)"
          >
            <stop offset="0.156701" stop-color="#406ADC" />
            <stop offset="0.467799" stop-color="#6A45BE" />
            <stop offset="1" stop-color="#6A45BE" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>{" "}
    </a>
  );
};

export default Instagram;
